import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite, defaultSiteData } from '../context/SiteContext';
import {
    LayoutDashboard, Image, Type, Package, Award, Star, Phone,
    LogOut, Save, RotateCcw, ChevronRight, Plus, Trash2, Upload,
    Eye, Settings, Users, Zap, CheckCircle, AlertCircle, X,
    Home, Edit3, Instagram, Youtube, Facebook, DollarSign, Camera
} from 'lucide-react';

// ─── Reusable field components ──────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', rows, placeholder }) {
    const s = {
        label: { display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: '"Barlow Condensed", sans-serif' },
        input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '9px 12px', color: 'white', fontSize: '0.88rem', outline: 'none', fontFamily: '"Inter", sans-serif', transition: 'border-color 0.2s', resize: rows ? 'vertical' : undefined },
    };
    return (
        <div style={{ marginBottom: '14px' }}>
            <label style={s.label}>{label}</label>
            {rows ? (
                <textarea style={s.input} value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
            ) : (
                <input type={type} style={s.input} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
            )}
        </div>
    );
}


// ─── ImgBB API key – stored in localStorage so it persists ─────────────────
const IMGBB_KEY_STORAGE = 'pratik_imgbb_key';
const DEFAULT_IMGBB_KEY = 'f38bbda47a6afc9ced9076cd6bbf2140';
const getImgbbKey = () => localStorage.getItem(IMGBB_KEY_STORAGE) || DEFAULT_IMGBB_KEY;
const setImgbbKey = (k) => localStorage.setItem(IMGBB_KEY_STORAGE, k);
const isLocalhost = () => window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

function ImageUpload({ label, currentSrc, onUpload }) {
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [imgbbKey, setImgbbKeyState] = useState(getImgbbKey);
    const [showKeyInput, setShowKeyInput] = useState(false);

    const saveKey = (k) => {
        setImgbbKey(k);
        setImgbbKeyState(k);
    };

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            if (isLocalhost()) {
                // ── Local dev: save directly to public/images/ via Vite plugin ──
                const formData = new FormData();
                formData.append('file', file);
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                if (!res.ok) throw new Error(`Server error (${res.status})`);
                const json = await res.json();
                if (!json.ok) throw new Error(json.error || 'Upload error');
                onUpload(json.path);
            } else {
                // ── Production (Netlify): upload to ImgBB free CDN ──
                const key = getImgbbKey();
                if (!key) {
                    setError('');
                    setShowKeyInput(true);
                    setUploading(false);
                    return;
                }
                const formData = new FormData();
                formData.append('image', file);
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
                    method: 'POST',
                    body: formData,
                });
                if (!res.ok) throw new Error(`ImgBB error (${res.status})`);
                const json = await res.json();
                if (!json.success) throw new Error(json.error?.message || 'ImgBB upload failed');
                // Use the display URL (direct image link)
                onUpload(json.data.display_url);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const onLocalhost = isLocalhost();

    return (
        <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: '"Barlow Condensed", sans-serif' }}>{label}</div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: '100px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {currentSrc
                        ? <img src={currentSrc} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                        : <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>No image</span>
                    }
                </div>
                <div style={{ flex: 1 }}>
                    <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                    <button
                        onClick={() => inputRef.current.click()}
                        disabled={uploading}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: uploading ? 'rgba(255,255,255,0.05)' : 'rgba(249,115,22,0.15)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '6px', padding: '8px 14px', color: uploading ? 'rgba(255,255,255,0.3)' : '#f97316', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '0.82rem', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', width: '100%', justifyContent: 'center', marginBottom: '6px', transition: 'all 0.2s' }}
                    >
                        <Upload size={14} />
                        {uploading ? 'Uploading...' : 'Upload New Image'}
                    </button>

                    {/* ImgBB key input — shown on Netlify if key not set */}
                    {showKeyInput && !onLocalhost && (
                        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
                            <p style={{ fontSize: '0.7rem', color: '#f97316', marginBottom: '6px' }}>
                                🔑 Enter your free <a href="https://api.imgbb.com/" target="_blank" rel="noreferrer" style={{ color: '#f97316' }}>ImgBB API key</a> to enable uploads on Netlify:
                            </p>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <input
                                    type="text"
                                    placeholder="Paste ImgBB API key..."
                                    defaultValue={imgbbKey}
                                    onChange={e => saveKey(e.target.value)}
                                    style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', padding: '6px 10px', color: 'white', fontSize: '0.78rem', outline: 'none', fontFamily: '"Inter", sans-serif' }}
                                />
                                <button onClick={() => { setShowKeyInput(false); inputRef.current.click(); }} style={{ background: '#f97316', border: 'none', borderRadius: '5px', padding: '6px 10px', cursor: 'pointer', color: 'white', fontSize: '0.78rem', fontWeight: 600 }}>Save & Upload</button>
                            </div>
                            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Free at imgbb.com → API → Get API Key. Saved permanently in this browser.</p>
                        </div>
                    )}

                    {error
                        ? <p style={{ fontSize: '0.7rem', color: '#ef4444', textAlign: 'center' }}>⚠ {error}</p>
                        : <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                            {onLocalhost ? '💾 Saved to server (localhost)' : `☁ Uploaded to ImgBB CDN${imgbbKey ? ' ✓' : ' – key needed'}`}
                        </p>
                    }
                    {!onLocalhost && (
                        <p
                            onClick={() => setShowKeyInput(v => !v)}
                            style={{ fontSize: '0.65rem', color: 'rgba(249,115,22,0.5)', textAlign: 'center', cursor: 'pointer', marginTop: '2px' }}
                        >
                            {imgbbKey ? '🔑 ImgBB key saved · click to change' : '🔑 Set ImgBB API key'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}


function SectionCard({ title, children }) {
    const [open, setOpen] = useState(true);
    return (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
            <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
                <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{title}</span>
                <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}><ChevronRight size={16} color="rgba(255,255,255,0.4)" /></motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div style={{ padding: '0 18px 18px' }}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TagList({ items, onChange, placeholder = 'Add item...' }) {
    const [newItem, setNewItem] = useState('');
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                {items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '4px', padding: '4px 10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                        {item}
                        <button onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,100,100,0.7)', padding: 0, display: 'flex' }}><X size={12} /></button>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newItem.trim()) { onChange([...items, newItem.trim()]); setNewItem(''); e.preventDefault(); } }} placeholder={placeholder} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '7px 10px', color: 'white', fontSize: '0.82rem', outline: 'none', fontFamily: '"Inter", sans-serif' }} />
                <button onClick={() => { if (newItem.trim()) { onChange([...items, newItem.trim()]); setNewItem(''); } }} style={{ background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: '6px', padding: '7px 12px', cursor: 'pointer', color: '#f97316', display: 'flex' }}><Plus size={14} /></button>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>Press Enter or + to add</p>
        </div>
    );
}

// ═══ PANEL COMPONENTS ═══════════════════════════════════════════════════════

function HeroPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    return (
        <>
            <SectionCard title="Background & Trainer Image">
                <ImageUpload label="Gym Background Image" currentSrc={data.bgImage} onUpload={set('bgImage')} />
                <ImageUpload label="Trainer Portrait Image" currentSrc={data.trainerImage} onUpload={set('trainerImage')} />
                <Field label="Trainer Name (nameplate)" value={data.trainerName} onChange={set('trainerName')} />
                <Field label="Trainer Certifications (nameplate)" value={data.trainerCerts} onChange={set('trainerCerts')} />
            </SectionCard>
            <SectionCard title="Badge & Headline">
                <Field label="Top Badge Text" value={data.badge} onChange={set('badge')} />
                <Field label="Headline Line 1" value={data.headlineLine1} onChange={set('headlineLine1')} placeholder="TRANSFORM" />
                <Field label="Headline Line 2" value={data.headlineLine2} onChange={set('headlineLine2')} placeholder="YOUR BODY." />
                <Field label="Headline Line 3" value={data.headlineLine3} onChange={set('headlineLine3')} placeholder="TRANSFORM" />
                <Field label="Headline Line 4" value={data.headlineLine4} onChange={set('headlineLine4')} placeholder="YOUR LIFE." />
                <Field label="Subtext / Tagline" value={data.subtext} onChange={set('subtext')} rows={3} />
            </SectionCard>
            <SectionCard title="Stats">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <Field label="Stat 1 Number" value={data.stat1Num} onChange={set('stat1Num')} />
                    <Field label="Stat 1 Label" value={data.stat1Label} onChange={set('stat1Label')} />
                    <Field label="Stat 2 Number" value={data.stat2Num} onChange={set('stat2Num')} />
                    <Field label="Stat 2 Label" value={data.stat2Label} onChange={set('stat2Label')} />
                    <Field label="Stat 3 Number" value={data.stat3Num} onChange={set('stat3Num')} />
                    <Field label="Stat 3 Label" value={data.stat3Label} onChange={set('stat3Label')} />
                </div>
            </SectionCard>
            <SectionCard title="CTA Buttons">
                <Field label="Book Button Text" value={data.ctaBook} onChange={set('ctaBook')} />
                <Field label="Contact Button Text" value={data.ctaContact} onChange={set('ctaContact')} />
            </SectionCard>
        </>
    );
}

function AboutPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    return (
        <>
            <SectionCard title="Section Labels">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title Line 1" value={data.titleLine1} onChange={set('titleLine1')} />
                <Field label="Title Line 2 (orange)" value={data.titleLine2} onChange={set('titleLine2')} />
            </SectionCard>
            <SectionCard title="Bio Paragraphs">
                <Field label="Paragraph 1" value={data.bio1} onChange={set('bio1')} rows={3} />
                <Field label="Paragraph 2" value={data.bio2} onChange={set('bio2')} rows={3} />
                <Field label="Paragraph 3" value={data.bio3} onChange={set('bio3')} rows={3} />
            </SectionCard>
            <SectionCard title="Skill Tags">
                <TagList items={data.skills} onChange={set('skills')} placeholder="Add skill..." />
            </SectionCard>
            <SectionCard title="Why Choose Me – List">
                <TagList items={data.whyItems} onChange={set('whyItems')} placeholder="Add reason..." />
            </SectionCard>
        </>
    );
}

function ServicesPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updateItem = (i, key, val) => {
        const items = [...data.items];
        items[i] = { ...items[i], [key]: val };
        onChange({ ...data, items });
    };
    const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
    const addItem = () => onChange({ ...data, items: [...data.items, { title: 'New Service', desc: 'Service description here.', highlight: false }] });

    return (
        <>
            <SectionCard title="Section Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Section Title" value={data.title} onChange={set('title')} />
                <Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} />
            </SectionCard>
            {data.items.map((svc, i) => (
                <SectionCard key={i} title={`Service ${i + 1}: ${svc.title}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                            <input type="checkbox" checked={svc.highlight} onChange={e => updateItem(i, 'highlight', e.target.checked)} />
                            Show "Most Popular" badge
                        </label>
                        {data.items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}><Trash2 size={12} />Remove</button>}
                    </div>
                    <Field label="Service Title" value={svc.title} onChange={v => updateItem(i, 'title', v)} />
                    <Field label="Description" value={svc.desc} onChange={v => updateItem(i, 'desc', v)} rows={3} />
                </SectionCard>
            ))}
            <button onClick={addItem} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add Service
            </button>
        </>
    );
}

function TransformationsPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updateItem = (i, key, val) => {
        const items = [...data.items];
        items[i] = { ...items[i], [key]: val };
        onChange({ ...data, items });
    };
    const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
    const addItem = () => onChange({ ...data, items: [...data.items, { img: '/images/transformation_1.png', name: 'Client Name', result: 'Result', duration: '3 Months', type: 'Fat Loss' }] });

    return (
        <>
            <SectionCard title="Section Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title" value={data.title} onChange={set('title')} />
                <Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} />
            </SectionCard>
            {data.items.map((item, i) => (
                <SectionCard key={i} title={`Card ${i + 1}: ${item.name}`}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        {data.items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}><Trash2 size={12} />Remove</button>}
                    </div>
                    <ImageUpload label="Transformation Image" currentSrc={item.img} onUpload={v => updateItem(i, 'img', v)} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <Field label="Client Name" value={item.name} onChange={v => updateItem(i, 'name', v)} />
                        <Field label="Result" value={item.result} onChange={v => updateItem(i, 'result', v)} />
                        <Field label="Duration" value={item.duration} onChange={v => updateItem(i, 'duration', v)} />
                        <Field label="Type (tag)" value={item.type} onChange={v => updateItem(i, 'type', v)} />
                    </div>
                </SectionCard>
            ))}
            <button onClick={addItem} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add Transformation
            </button>
        </>
    );
}

function PackagesPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updateItem = (i, key, val) => {
        const items = [...data.items];
        items[i] = { ...items[i], [key]: val };
        onChange({ ...data, items });
    };
    const updateFeature = (pi, fi, val) => {
        const items = [...data.items];
        const features = [...items[pi].features];
        features[fi] = val;
        items[pi] = { ...items[pi], features };
        onChange({ ...data, items });
    };
    const removeFeature = (pi, fi) => {
        const items = [...data.items];
        items[pi] = { ...items[pi], features: items[pi].features.filter((_, j) => j !== fi) };
        onChange({ ...data, items });
    };
    const addFeature = (pi) => {
        const items = [...data.items];
        items[pi] = { ...items[pi], features: [...items[pi].features, 'New feature'] };
        onChange({ ...data, items });
    };
    const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
    const addItem = () => onChange({ ...data, items: [...data.items, { id: `plan-${Date.now()}`, name: 'New Plan', tagline: 'Plan Tagline', price: '₹0', per: 'per month', popular: false, features: ['Feature 1', 'Feature 2'] }] });

    return (
        <>
            <SectionCard title="Section Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title" value={data.title} onChange={set('title')} />
                <Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} />
            </SectionCard>
            {data.items.map((pkg, i) => (
                <SectionCard key={pkg.id} title={`${pkg.name} – ${pkg.price}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                            <input type="checkbox" checked={pkg.popular} onChange={e => updateItem(i, 'popular', e.target.checked)} />
                            Mark as "Most Popular"
                        </label>
                        {data.items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}><Trash2 size={12} />Remove</button>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <Field label="Plan Name" value={pkg.name} onChange={v => updateItem(i, 'name', v)} />
                        <Field label="Tagline" value={pkg.tagline} onChange={v => updateItem(i, 'tagline', v)} />
                        <Field label="Price" value={pkg.price} onChange={v => updateItem(i, 'price', v)} />
                        <Field label="Per (e.g. per month)" value={pkg.per} onChange={v => updateItem(i, 'per', v)} />
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: '"Barlow Condensed",sans-serif' }}>Features</div>
                        {pkg.features.map((f, fi) => (
                            <div key={fi} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                                <input value={f} onChange={e => updateFeature(i, fi, e.target.value)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px', padding: '6px 10px', color: 'white', fontSize: '0.82rem', outline: 'none', fontFamily: '"Inter",sans-serif' }} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                <button onClick={() => removeFeature(i, fi)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '5px', padding: '6px 8px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><X size={12} /></button>
                            </div>
                        ))}
                        <button onClick={() => addFeature(i)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px dashed rgba(249,115,22,0.3)', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', color: '#f97316', fontSize: '0.75rem', marginTop: '4px' }}><Plus size={12} />Add Feature</button>
                    </div>
                </SectionCard>
            ))}
            <button onClick={addItem} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add Package
            </button>
        </>
    );
}

function CertificationsPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updateItem = (i, key, val) => {
        const items = [...data.items];
        items[i] = { ...items[i], [key]: val };
        onChange({ ...data, items });
    };
    const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
    const addItem = () => onChange({ ...data, items: [...data.items, { img: '/images/cert_k11.png', title: 'New Certificate', org: 'Organization', year: '2024', desc: 'Certificate description.', badge: '🏅', color: '#f97316' }] });

    return (
        <>
            <SectionCard title="Section Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title" value={data.title} onChange={set('title')} />
                <Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} />
            </SectionCard>
            {data.items.map((cert, i) => (
                <SectionCard key={i} title={`Cert ${i + 1}: ${cert.org}`}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        {data.items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}><Trash2 size={12} />Remove</button>}
                    </div>
                    <ImageUpload label="Certificate Image" currentSrc={cert.img} onUpload={v => updateItem(i, 'img', v)} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <Field label="Title" value={cert.title} onChange={v => updateItem(i, 'title', v)} />
                        <Field label="Organization" value={cert.org} onChange={v => updateItem(i, 'org', v)} />
                        <Field label="Year" value={cert.year} onChange={v => updateItem(i, 'year', v)} />
                        <Field label="Badge Emoji" value={cert.badge} onChange={v => updateItem(i, 'badge', v)} />
                    </div>
                    <Field label="Description" value={cert.desc} onChange={v => updateItem(i, 'desc', v)} rows={2} />
                </SectionCard>
            ))}
            <button onClick={addItem} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add Certificate
            </button>
        </>
    );
}

function TestimonialsPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updateItem = (i, key, val) => {
        const items = [...data.items];
        items[i] = { ...items[i], [key]: val };
        onChange({ ...data, items });
    };
    const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
    const addItem = () => onChange({ ...data, items: [...data.items, { name: 'Client Name', role: 'Role, City', review: 'Amazing results!', stars: 5, result: 'Result', initials: 'CN', color: '#f97316' }] });

    return (
        <>
            <SectionCard title="Section Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title" value={data.title} onChange={set('title')} />
            </SectionCard>
            <SectionCard title="Summary Stats">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <Field label="Stat 1 Value" value={data.stat1} onChange={set('stat1')} />
                    <Field label="Stat 1 Label" value={data.stat1Label} onChange={set('stat1Label')} />
                    <Field label="Stat 2 Value" value={data.stat2} onChange={set('stat2')} />
                    <Field label="Stat 2 Label" value={data.stat2Label} onChange={set('stat2Label')} />
                    <Field label="Stat 3 Value" value={data.stat3} onChange={set('stat3')} />
                    <Field label="Stat 3 Label" value={data.stat3Label} onChange={set('stat3Label')} />
                </div>
            </SectionCard>
            {data.items.map((item, i) => (
                <SectionCard key={i} title={`Review: ${item.name}`}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        {data.items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}><Trash2 size={12} />Remove</button>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <Field label="Name" value={item.name} onChange={v => updateItem(i, 'name', v)} />
                        <Field label="Initials (2 letters)" value={item.initials} onChange={v => updateItem(i, 'initials', v)} />
                        <Field label="Role / City" value={item.role} onChange={v => updateItem(i, 'role', v)} />
                        <Field label="Result Badge" value={item.result} onChange={v => updateItem(i, 'result', v)} />
                        <Field label="Stars (1–5)" type="number" value={item.stars} onChange={v => updateItem(i, 'stars', Math.min(5, Math.max(1, parseInt(v) || 5)))} />
                    </div>
                    <Field label="Review Text" value={item.review} onChange={v => updateItem(i, 'review', v)} rows={3} />
                </SectionCard>
            ))}
            <button onClick={addItem} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add Testimonial
            </button>
        </>
    );
}

function GalleryPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updateVideo = (i, key, val) => {
        const newList = [...data.videos];

        // Auto-convert standard YouTube links to embed links instantly
        if (key === 'url' && val) {
            try {
                let videoId = '';
                if (val.includes('youtu.be/')) {
                    videoId = val.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
                } else if (val.includes('youtube.com/watch')) {
                    videoId = new URL(val).searchParams.get('v');
                } else if (val.includes('youtube.com/shorts/')) {
                    videoId = val.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('&')[0];
                }

                if (videoId) {
                    val = `https://www.youtube.com/embed/${videoId}`;
                }
            } catch (e) { console.error("URL parse error", e); }
        }

        newList[i] = { ...newList[i], [key]: val };
        set('videos')(newList);
    };
    const addVideo = () => {
        set('videos')([...data.videos, { id: Date.now(), title: 'New Video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }]);
    };
    const removeVideo = (i) => {
        set('videos')(data.videos.filter((_, idx) => idx !== i));
    };

    return (
        <>
            <SectionCard title="Gallery Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title" value={data.title} onChange={set('title')} />
                <Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} />
            </SectionCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', marginTop: '32px' }}>
                <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.2rem', color: '#f97316', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manage Videos</h3>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{data.videos.length} Videos</span>
            </div>
            {data.videos.map((video, i) => (
                <SectionCard key={video.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(249,115,22,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', fontSize: '0.8rem', fontWeight: 'bold' }}>{i + 1}</div>
                            <span style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>{video.title || 'Untitled Video'}</span>
                        </div>
                        <button onClick={() => removeVideo(i)} style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#ef4444', opacity: 0.6 }} title="Delete Video"><Trash2 size={16} /></button>
                    </div>
                    <Field label="Video Title" value={video.title} onChange={v => updateVideo(i, 'title', v)} />
                    <Field label="YouTube Embed URL" value={video.url} onChange={v => updateVideo(i, 'url', v)} placeholder="https://www.youtube.com/embed/..." />
                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '-8px', marginBottom: '12px' }}>
                        Note: You can paste a standard YouTube link and it will auto-convert.
                    </p>

                    {/* Vertical Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', color: 'white', display: 'block' }}>Vertical Format (Shorts)</span>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>Displays video in 9:16 ratio</span>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                            <input
                                type="checkbox"
                                checked={!!video.isVertical}
                                onChange={e => updateVideo(i, 'isVertical', e.target.checked)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: video.isVertical ? '#f97316' : 'rgba(255,255,255,0.2)',
                                transition: '.3s', borderRadius: '34px'
                            }}>
                                <span style={{
                                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '3px', bottom: '3px',
                                    backgroundColor: 'white', transition: '.3s', borderRadius: '50%',
                                    transform: video.isVertical ? 'translateX(18px)' : 'translateX(0)'
                                }} />
                            </span>
                        </label>
                    </div>
                </SectionCard>
            ))}
            <button onClick={addVideo} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add New Video
            </button>
        </>
    );
}

function PhotoGalleryPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    const updatePhoto = (i, key, val) => {
        const newList = [...data.photos];
        newList[i] = { ...newList[i], [key]: val };
        set('photos')(newList);
    };
    const addPhoto = () => {
        set('photos')([...data.photos, { id: Date.now(), url: '', caption: 'New Photo' }]);
    };
    const removePhoto = (i) => {
        set('photos')(data.photos.filter((_, idx) => idx !== i));
    };

    return (
        <>
            <SectionCard title="Photo Gallery Header">
                <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
                <Field label="Title" value={data.title} onChange={set('title')} />
                <Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} />
            </SectionCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', marginTop: '32px' }}>
                <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.2rem', color: '#f97316', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manage Photos</h3>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{data.photos.length} Photos</span>
            </div>
            {data.photos.map((photo, i) => (
                <SectionCard key={photo.id || i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(249,115,22,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', fontSize: '0.8rem', fontWeight: 'bold' }}>{i + 1}</div>
                            <span style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>{photo.caption || 'Untitled Photo'}</span>
                        </div>
                        <button onClick={() => removePhoto(i)} style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#ef4444', opacity: 0.6 }} title="Delete Photo"><Trash2 size={16} /></button>
                    </div>
                    <ImageUpload label="Photo Image" value={photo.url} onChange={v => updatePhoto(i, 'url', v)} placeholder="https://..." />
                    <Field label="Caption" value={photo.caption} onChange={v => updatePhoto(i, 'caption', v)} />
                </SectionCard>
            ))}
            <button onClick={addPhoto} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(249,115,22,0.1)', border: '1px dashed rgba(249,115,22,0.4)', borderRadius: '8px', padding: '12px', cursor: 'pointer', color: '#f97316', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Plus size={16} />Add New Photo
            </button>
        </>
    );
}

function ContactPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    return (
        <SectionCard title="Contact Details">
            <Field label="Section Label" value={data.sectionLabel} onChange={set('sectionLabel')} />
            <Field label="Title" value={data.title} onChange={set('title')} />
            <Field label="Tagline" value={data.tagline} onChange={set('tagline')} />
            <Field label="Description" value={data.desc} onChange={set('desc')} rows={2} />
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '14px 0' }} />
            <Field label="Phone Number (display)" value={data.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" />
            <Field label="Phone href (tel: link)" value={data.phoneHref} onChange={set('phoneHref')} placeholder="tel:+91XXXXXXXXXX" />
            <Field label="WhatsApp URL" value={data.whatsapp} onChange={set('whatsapp')} placeholder="https://wa.me/91XXXXXXXXXX..." />
            <Field label="Location" value={data.location} onChange={set('location')} />
            <Field label="Email" value={data.email} onChange={set('email')} type="email" />
        </SectionCard>
    );
}

function FooterPanel({ data, onChange }) {
    const set = (key) => (val) => onChange({ ...data, [key]: val });
    return (
        <>
            <SectionCard title="Footer Bio">
                <Field label="Bio Text" value={data.bio} onChange={set('bio')} rows={3} />
            </SectionCard>
            <SectionCard title="Social Media Links">
                <Field label="Instagram URL" value={data.instagram} onChange={set('instagram')} placeholder="https://instagram.com/..." />
                <Field label="YouTube URL" value={data.youtube} onChange={set('youtube')} placeholder="https://youtube.com/@..." />
                <Field label="Facebook URL" value={data.facebook} onChange={set('facebook')} placeholder="https://facebook.com/..." />
            </SectionCard>
            <SectionCard title="Footer Contact Info">
                <Field label="Phone" value={data.phone} onChange={set('phone')} />
                <Field label="Location" value={data.location} onChange={set('location')} />
                <Field label="Email" value={data.email} onChange={set('email')} type="email" />
            </SectionCard>
        </>
    );
}

// ═══ MAIN ADMIN PAGE ════════════════════════════════════════════════════════

const ADMIN_PASSWORD = 'admin@fitpulse';

const navItems = [
    { id: 'hero', label: 'Hero', icon: Home },
    { id: 'about', label: 'About', icon: Edit3 },
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'transformations', label: 'Results', icon: Image },
    { id: 'gallery', label: 'Videos', icon: Youtube },
    { id: 'photoGallery', label: 'Photos', icon: Camera },
    { id: 'packages', label: 'Packages', icon: DollarSign },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'footer', label: 'Footer', icon: Settings },
];

export default function AdminPage() {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
    const [pw, setPw] = useState('');
    const [pwError, setPwError] = useState('');
    const [activeSection, setActiveSection] = useState('hero');
    const [saved, setSaved] = useState(false);
    const [resetConfirm, setResetConfirm] = useState(false);
    const { siteData, updateSection, saveAll, resetAll, cloudStatus, firebaseUrl, setFirebaseUrl } = useSite();

    // Local draft state (unsaved changes)
    const [draft, setDraft] = useState(siteData);
    const [showCloud, setShowCloud] = useState(false);
    const [fbInput, setFbInput] = useState(firebaseUrl);

    const handleLogin = () => {
        if (pw === ADMIN_PASSWORD) {
            setAuthed(true);
            sessionStorage.setItem('admin_auth', '1');
        } else {
            setPwError('Incorrect password. Try: admin@fitpulse');
        }
    };

    const handleSave = async () => {
        // saveAll writes to localStorage + Firebase simultaneously
        await saveAll(draft);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleReset = () => {
        resetAll();
        setDraft(defaultSiteData);
        setResetConfirm(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        setAuthed(false);
    };

    const updateDraftSection = (section) => (val) => {
        setDraft(prev => ({ ...prev, [section]: val }));
    };

    if (!authed) {
        return (
            <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#111', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '16px', padding: '48px 40px', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Settings size={28} color="#f97316" />
                    </div>
                    <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.2rem', color: 'white', marginBottom: '4px' }}>DASHBOARD</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '32px' }}>{siteData.hero.trainerName} – Site Manager</p>

                    <div style={{ marginBottom: '16px' }}>
                        <input
                            id="admin-password"
                            type="password"
                            placeholder="Enter admin password..."
                            value={pw}
                            onChange={e => { setPw(e.target.value); setPwError(''); }}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${pwError ? '#ef4444' : 'rgba(255,255,255,0.15)'}`, borderRadius: '8px', padding: '13px 16px', color: 'white', fontSize: '1rem', outline: 'none', textAlign: 'center', letterSpacing: '0.1em', fontFamily: '"Inter",sans-serif' }}
                            onFocus={e => e.target.style.borderColor = '#f97316'}
                            onBlur={e => e.target.style.borderColor = pwError ? '#ef4444' : 'rgba(255,255,255,0.15)'}
                        />
                        {pwError && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '6px' }}>{pwError}</p>}
                    </div>
                    <button id="admin-login-btn" onClick={handleLogin} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>
                        Enter Admin Panel
                    </button>
                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', marginTop: '16px' }}>
                        Default password: <code style={{ color: '#f97316' }}>admin@fitpulse</code>
                    </p>

                    <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                        <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', textDecoration: 'none' }}>← Back to Website</a>
                    </div>
                </motion.div>
            </div>
        );
    }

    const renderPanel = () => {
        const d = draft[activeSection];
        const set = updateDraftSection(activeSection);
        switch (activeSection) {
            case 'hero': return <HeroPanel data={d} onChange={set} />;
            case 'about': return <AboutPanel data={d} onChange={set} />;
            case 'services': return <ServicesPanel data={d} onChange={set} />;
            case 'transformations': return <TransformationsPanel data={d} onChange={set} />;
            case 'gallery': return <GalleryPanel data={d} onChange={set} />;
            case 'photoGallery': return <PhotoGalleryPanel data={d} onChange={set} />;
            case 'packages': return <PackagesPanel data={d} onChange={set} />;
            case 'certifications': return <CertificationsPanel data={d} onChange={set} />;
            case 'testimonials': return <TestimonialsPanel data={d} onChange={set} />;
            case 'contact': return <ContactPanel data={d} onChange={set} />;
            case 'footer': return <FooterPanel data={d} onChange={set} />;
            default: return null;
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
            {/* Sidebar */}
            <aside style={{ width: '220px', background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
                {/* Logo */}
                <div style={{ padding: '20px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', color: '#f97316' }}>{siteData.hero.trainerName.split(' ')[0]}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Management Console</div>
                    {/* Cloud sync status dot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: cloudStatus === 'synced' ? '#22c55e' : cloudStatus === 'error' ? '#ef4444' : cloudStatus === 'syncing' ? '#f59e0b' : '#555', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>
                            {cloudStatus === 'synced' ? 'Cloud synced ✓' : cloudStatus === 'error' ? 'Cloud error' : cloudStatus === 'syncing' ? 'Syncing…' : firebaseUrl ? 'Not synced' : 'No cloud DB'}
                        </span>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const active = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                id={`admin-nav-${item.id}`}
                                onClick={() => setActiveSection(item.id)}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '4px', background: active ? 'rgba(249,115,22,0.15)' : 'transparent', color: active ? '#f97316' : 'rgba(255,255,255,0.5)', transition: 'all 0.2s', fontSize: '0.85rem', fontWeight: active ? 600 : 400, textAlign: 'left' }}
                                onMouseOver={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; } }}
                                onMouseOut={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; } }}
                            >
                                <Icon size={16} />
                                {item.label}
                                {active && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Firebase cloud setup */}
                    <button onClick={() => setShowCloud(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', borderRadius: '8px', border: `1px solid ${firebaseUrl ? 'rgba(34,197,94,0.3)' : 'rgba(249,115,22,0.3)'}`, background: firebaseUrl ? 'rgba(34,197,94,0.05)' : 'rgba(249,115,22,0.05)', cursor: 'pointer', color: firebaseUrl ? '#22c55e' : '#f97316', fontSize: '0.78rem', textAlign: 'left', width: '100%' }}>
                        ☁ {firebaseUrl ? 'Cloud DB Connected ✓' : '⚠ Connect Cloud DB'}
                    </button>
                    <AnimatePresence>
                        {showCloud && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', marginBottom: '4px' }}>
                                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', lineHeight: 1.5 }}>
                                        Paste your <b style={{ color: 'white' }}>JSONBin Master Key</b> to sync across ALL browsers:
                                    </p>
                                    <input
                                        value={fbInput}
                                        onChange={e => setFbInput(e.target.value)}
                                        placeholder="$2a$10$... (JSONBin Master Key)"
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '5px', padding: '6px 8px', color: 'white', fontSize: '0.68rem', outline: 'none', fontFamily: '"Inter",sans-serif', marginBottom: '6px' }}
                                    />
                                    <button onClick={() => { setFirebaseUrl(fbInput); setShowCloud(false); }} style={{ width: '100%', background: '#f97316', border: 'none', borderRadius: '5px', padding: '6px', cursor: 'pointer', color: 'white', fontSize: '0.72rem', fontWeight: 600 }}>Save & Connect</button>
                                    <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', marginTop: '5px' }}>
                                        Get free key: jsonbin.io → Sign in with Google → API Keys → Copy Master Key
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                        <Eye size={14} />Preview Site
                    </a>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', borderRadius: '8px', border: 'none', background: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textAlign: 'left', width: '100%' }}>
                        <LogOut size={14} />Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Top Bar */}
                <header style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                    <div>
                        <h1 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>
                            {navItems.find(n => n.id === activeSection)?.label} Editor
                        </h1>
                        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>Changes are saved to your browser until you reset</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <AnimatePresence>
                            {saved && (
                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e', fontSize: '0.82rem' }}>
                                    <CheckCircle size={14} />Saved!
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button onClick={() => setResetConfirm(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', color: '#ef4444', fontSize: '0.82rem' }}>
                            <RotateCcw size={14} />Reset All
                        </button>
                        <button id="admin-save-btn" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #f97316, #c2410c)', border: 'none', borderRadius: '6px', padding: '9px 18px', cursor: 'pointer', color: 'white', fontWeight: 600, fontSize: '0.88rem', fontFamily: '"Barlow Condensed",sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            <Save size={14} />Save Changes
                        </button>
                    </div>
                </header>

                {/* Editor Area */}
                <main style={{ flex: 1, padding: '28px', maxWidth: '800px', width: '100%' }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                            {renderPanel()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Reset confirm dialog */}
            <AnimatePresence>
                {resetConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '20px' }}>
                        <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} style={{ background: '#111', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '14px', padding: '36px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
                            <AlertCircle size={40} color="#ef4444" style={{ margin: '0 auto 16px' }} />
                            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: 'white', marginBottom: '10px' }}>RESET ALL CONTENT?</h2>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: '24px', lineHeight: 1.6 }}>This will restore ALL website content to the default values. Your uploaded images and customizations will be lost.</p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button onClick={() => setResetConfirm(false)} style={{ padding: '10px 22px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', cursor: 'pointer', color: 'white', fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem' }}>Cancel</button>
                                <button id="reset-confirm-btn" onClick={handleReset} style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #ef4444, #b91c1c)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'white', fontWeight: 600, fontFamily: '"Barlow Condensed",sans-serif', fontSize: '0.9rem' }}>Yes, Reset Everything</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
