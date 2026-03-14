import { createContext, useContext, useState, useEffect } from 'react';
import { defaultSiteData } from '../data';

// ─── JSONBin.io cloud sync ───────────────────────────────────────────────────
const JSONBIN_KEY_STORAGE = 'fitpulse_jsonbin_key';
const JSONBIN_BIN_STORAGE = 'fitpulse_jsonbin_bin';

// Use environment variables or fallback to user-saved local storage
const JSONBIN_DEFAULT_KEY = import.meta.env.VITE_JSONBIN_KEY || '';
const JSONBIN_DEFAULT_BIN = import.meta.env.VITE_JSONBIN_BIN_ID || '';

export const getJsonbinKey = () => localStorage.getItem(JSONBIN_KEY_STORAGE) || JSONBIN_DEFAULT_KEY;
const getJsonbinBin = () => localStorage.getItem(JSONBIN_BIN_STORAGE) || JSONBIN_DEFAULT_BIN;

export const saveJsonbinKey = (k) => localStorage.setItem(JSONBIN_KEY_STORAGE, k);
export const saveJsonbinBin = (b) => localStorage.setItem(JSONBIN_BIN_STORAGE, b);

async function cloudRead(masterKey) {
    const binId = getJsonbinBin();
    if (!masterKey || !binId) return null;
    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
            headers: { 'X-Master-Key': masterKey },
        });
        if (!res.ok) return null;
        const json = await res.json();
        const record = json.record;
        if (!record || record._init) return null;
        return record;
    } catch { return null; }
}

async function cloudWrite(masterKey, data) {
    const binId = getJsonbinBin();
    if (!masterKey || !binId) return false;
    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': masterKey,
            },
            body: JSON.stringify(data),
        });
        return res.ok;
    } catch { return false; }
}

// Legacy aliases for Admin UI compatibility
export const getFirebaseUrl = getJsonbinKey;
export const saveFirebaseUrl = saveJsonbinKey;

// ─── localStorage ────────────────────────────────────────────────────────────
const STORAGE_KEY = 'fitpulse_site_data';
const STORAGE_VERSION = 'v1.0.1-template';

function loadFromStorage() {
    try {
        const savedVersion = localStorage.getItem(STORAGE_KEY + '_version');
        if (savedVersion !== STORAGE_VERSION) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.setItem(STORAGE_KEY + '_version', STORAGE_VERSION);
            return null;
        }
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { }
    return null;
}

function saveToStorage(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(STORAGE_KEY + '_version', STORAGE_VERSION);
    } catch { }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const SiteContext = createContext(null);

export function SiteProvider({ children }) {
    const [siteData, setSiteData] = useState(() => {
        const stored = loadFromStorage();
        return stored ? deepMerge(defaultSiteData, stored) : defaultSiteData;
    });

    const [cloudStatus, setCloudStatus] = useState('idle');
    const [jsonbinKey, setJsonbinKeyState] = useState(getJsonbinKey);

    useEffect(() => {
        if (!jsonbinKey) return;
        setCloudStatus('syncing');
        cloudRead(jsonbinKey).then(cloudData => {
            if (cloudData) {
                const merged = deepMerge(defaultSiteData, cloudData);
                setSiteData(merged);
                saveToStorage(merged);
            }
            setCloudStatus('synced');
        }).catch(() => setCloudStatus('error'));
    }, [jsonbinKey]);

    const saveAll = async (newData) => {
        setSiteData(newData);
        saveToStorage(newData);
        if (jsonbinKey) {
            setCloudStatus('syncing');
            const ok = await cloudWrite(jsonbinKey, newData);
            setCloudStatus(ok ? 'synced' : 'error');
        }
    };

    const updateSection = (section, newData) => {
        setSiteData(prev => {
            const updated = { ...prev, [section]: newData };
            saveToStorage(updated);
            return updated;
        });
    };

    const resetAll = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSiteData(defaultSiteData);
        if (jsonbinKey) cloudWrite(jsonbinKey, defaultSiteData);
    };

    const setFirebaseUrl = (key) => {
        saveJsonbinKey(key.trim());
        setJsonbinKeyState(key.trim());
    };

    return (
        <SiteContext.Provider value={{
            siteData, updateSection, saveAll, resetAll,
            cloudStatus,
            firebaseUrl: jsonbinKey,
            setFirebaseUrl,
        }}>
            {children}
        </SiteContext.Provider>
    );
}

export function useSite() {
    const ctx = useContext(SiteContext);
    if (!ctx) throw new Error('useSite must be inside SiteProvider');
    return ctx;
}

function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}
