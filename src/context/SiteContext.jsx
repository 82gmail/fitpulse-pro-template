import { createContext, useContext, useState, useEffect } from 'react';

// ─── Default site data (Neutralized for Template) ────────────────────────────
export const defaultSiteData = {
    // Hero
    hero: {
        badge: 'Certified Professional Coach',
        headlineLine1: 'TRANSFORM',
        headlineLine2: 'YOUR BODY.',
        headlineLine3: 'ELEVATE',
        headlineLine4: 'YOUR LIFE.',
        subtext: "Elite coaching with a science-backed approach to fat loss, muscle gain & peak performance. Join our community of transformed athletes.",
        stat1Num: '500+',
        stat1Label: 'Success Stories',
        stat2Num: '10+',
        stat2Label: 'Years Experience',
        stat3Num: '5',
        stat3Label: 'Gold Certifications',
        ctaBook: 'Book Free Consult',
        ctaContact: 'Get in Touch',
        trainerImage: '/images/hero-trainer-placeholder.jpg',
        bgImage: '/images/gym-hero-bg-placeholder.jpg',
        trainerName: 'FITPULSE PRO',
        trainerCerts: 'NSCA • NASM • ACE Certified',
    },

    // About
    about: {
        sectionLabel: 'Our Story',
        titleLine1: 'THE SCIENCE BEHIND',
        titleLine2: 'THE TRANSFORMATION',
        bio1: "Welcome to FitPulse Pro — where elite fitness meets personalized methodology. We are dedicated to helping high-performers unlock their true physical potential.",
        bio2: "With training protocols backed by international fitness science institutions, we bring world-class methodology to every session, whether online or in-person.",
        bio3: "Whether you're a complete beginner or a seasoned athlete, our individualized approach considers your bio-mechanics, lifestyle, and goals to craft a program that delivers lasting change.",
        skills: ['Strength & Conditioning', 'Metabolic Conditioning', 'Nutrition Strategy', 'Postural Correction', 'Functional Training', 'Injury Prevention', 'HIIT Programming', 'Body Recomposition'],
        whyItems: [
            'Science-backed training philosophy',
            '100% customized programming',
            'Progressive performance tracking',
            'Comprehensive nutrition guidance',
            'Dedicated 24/7 support',
            'Results-driven methodology',
        ],
        certs: [
            { icon: '🏆', title: 'Master Trainer Certification', org: 'National Academy of Sports Medicine', color: '#f97316' },
            { icon: '✅', title: 'Strength Specialist', org: 'NSCA Certified', color: '#22c55e' },
            { icon: '🌍', title: 'International Coach', org: 'Global Fitness Alliance', color: '#3b82f6' },
        ],
    },

    // Services
    services: {
        sectionLabel: 'Expertise',
        title: 'ELITE SERVICES',
        subtitle: "Every program is engineered specifically for your body — no generic templates, only results.",
        items: [
            { title: 'Signature 1-on-1', desc: 'The ultimate bespoke training experience. Full personal attention, custom programming, and 24/7 guidance.', highlight: true },
            { title: 'Hypertrophy Lab', desc: 'Precision muscle-building protocols designed to maximize growth while ensuring structural integrity.', highlight: false },
            { title: 'The Lean Protocol', desc: 'Advanced fat loss strategies combining metabolic training with optimized nutritional periodization.', highlight: false },
            { title: 'Performance Pro', desc: 'Athletic-grade training for speed, agility, and explosive power. Train like a pro athlete.', highlight: false },
            { title: 'Precision Nutrition', desc: 'Data-driven meal planning and macronutrient manipulation tailored to your specific metabolic rate.', highlight: false },
            { title: 'Vanguard Online', desc: 'World-class coaching delivered globally. Weekly video reviews, deep-dive check-ins, and app-based tracking.', highlight: false },
            { title: 'Small Group Elite', desc: 'Semi-private sessions (3–5 people) that bridge the gap between group energy and personal attention.', highlight: false },
            { title: 'Recovery & Mobility', desc: 'Dedicated corrective exercise and mobility flows designed to keep you injury-free and performing at your peak.', highlight: false },
        ],
    },

    // Transformations
    transformations: {
        sectionLabel: 'The Proof',
        title: 'CLIENT RESULTS',
        subtitle: "Real humans. Real effort. Real transformations. This is what's possible when you trust the process.",
        items: [
            { img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop', name: 'James R.', result: '15kg Fat Loss', duration: '12 Weeks', type: 'Phase 1' },
            { img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop', name: 'Sarah L.', result: 'Strength Gain', duration: '16 Weeks', type: 'Toning' },
            { img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2efe61?w=500&auto=format&fit=crop', name: 'Michael K.', result: 'Muscle Growth', duration: '24 Weeks', type: 'Hypertrophy' },
            { img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop', name: 'Emma T.', result: 'Post-Injury Return', duration: '20 Weeks', type: 'Recovery' },
        ],
    },

    // Packages
    packages: {
        sectionLabel: 'Elevate',
        title: 'INVEST IN YOURSELF',
        subtitle: "Premium coaching plans designed for long-term health and peak physical performance.",
        items: [
            { id: 'strategy', name: 'Strategy Call', tagline: 'Start Your RoadMap', price: '$49', per: 'one-time', popular: false, features: ['1-Hour Goal Setting Call', 'Bio-Mechanical Review', 'Nutrition Audit', 'Program Roadmap', 'Q&A Session'] },
            { id: 'standard', name: 'Core Coaching', tagline: 'The Foundation', price: '$299', per: 'per month', popular: false, features: ['3 Hybrid Sessions Weekly', 'Custom Workout App Access', 'Nutrition Baseline', 'Bi-Weekly Check-ins', 'Email Support'] },
            { id: 'elite', name: 'Elite Performance', tagline: 'Maximum Results', price: '$599', per: 'per month', popular: true, features: ['Unlimited Coaching Access', 'Bespoke Program Design', 'DNA-Based Nutrition Plan', 'Weekly Video Analysis', 'Priority WhatsApp Support', 'Supplement Optimization', 'Premium App Access'] },
            { id: 'online-pro', name: 'Vanguard Online', tagline: 'Train Anywhere', price: '$199', per: 'per month', popular: false, features: ['Fully Remote Programming', 'Form Correction via Video', 'Daily Macro Tracking', 'Private Discord Access', 'Monthly Progress Reviews'] },
        ],
    },

    // Certifications
    certifications: {
        sectionLabel: 'Authority',
        title: 'GLOBAL ACCREDITATION',
        subtitle: "Mastering the science of human performance through elite-level education.",
        items: [
            { img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop', title: 'Performance Specialist', org: 'National Academy of Sports Medicine', year: '2023', desc: "Advanced specialization in athletic performance enhancement and movement efficiency.", badge: '🏆', color: '#f97316' },
            { img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop', title: 'Nutrition Coach L2', org: 'Precision Nutrition', year: '2022', desc: "Master-level certification in sustainable habit-based nutrition and metabolic periodization.", badge: '🍎', color: '#3b82f6' },
        ],
    },

    // Testimonials
    testimonials: {
        sectionLabel: 'Success Stories',
        title: 'CLIENT VOICES',
        stat1: '500+', stat1Label: 'Transformations',
        stat2: '5.0★', stat2Label: 'Client Rating',
        stat3: '96%', stat3Label: 'Retention Rate',
        items: [
            { name: 'David Henderson', role: 'CEO, Horizon Tech', review: "The most efficient training system I've ever experienced. Data-driven, professional, and results were visible within the first month. FitPulse Pro is the gold standard.", stars: 5, result: 'Muscle Up', initials: 'DH', color: '#f97316' },
            { name: 'Jessica Chen', role: 'Professional Athlete', review: "My performance ceiling was shattered once we started the specialized strength protocols. The level of detail in the video analysis is unmatched.", stars: 5, result: 'PR Smashed', initials: 'JC', color: '#ec4899' },
        ],
    },

    // Contact
    contact: {
        sectionLabel: "Connect",
        title: 'START YOUR ASCENT',
        tagline: 'Ready for the Pro Level?',
        desc: "Book a high-level strategy session and let's engineer your path to a superior version of yourself.",
        phone: '+1 (555) 000-0000',
        phoneHref: 'tel:+15550000000',
        whatsapp: 'https://wa.me/15550000000?text=Hi!%20I%27m%20ready%20to%20start%20my%20transformation.',
        whatsappNumber: '15550000000',
        location: 'Global Online / Elite Studio, New York, NY',
        email: 'hello@fitpulsepro.com',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzAwLjAiTiA3M8KwNTQnMDAuMCJX!5e0!3m2!1sen!2sus!4v1700000000000',
    },

    // Gallery
    gallery: {
        sectionLabel: 'Inside the Lab',
        title: 'TRAINING INSIGHTS',
        subtitle: "A glimpse into the high-performance environment where results are forged.",
        videos: [
            { id: 1, title: 'Hypertrophy Masterclass', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 2, title: 'The Lean Protocol Series', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ],
    },

    // Photo Gallery
    photoGallery: {
        sectionLabel: 'Facility',
        title: 'PHOTO INSIGHTS',
        subtitle: 'Precision equipment. Elite atmosphere. High-performance results.',
        photos: [
            { id: 1, url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop', caption: 'Elite Performance' },
            { id: 2, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop', caption: 'Metric Tracking' },
            { id: 3, url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop', caption: 'Premium Facility' },
        ],
    },

    // Footer / Social
    footer: {
        bio: "FitPulse Pro is a premier fitness coaching service specializing in high-performance transformations through science-backed training and nutrition.",
        instagram: 'https://instagram.com/fitpulsepro',
        youtube: 'https://youtube.com/fitpulsepro',
        facebook: 'https://facebook.com/fitpulsepro',
        phone: '+1 (555) 000-0000',
        location: 'Global Headquarters, NY',
        email: 'hello@fitpulsepro.com',
    },
};

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
const STORAGE_VERSION = 'v1.0.0-template';

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
