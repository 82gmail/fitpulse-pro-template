import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Gift, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function ConsultationPopup({ isOpen, onClose }) {
    const { siteData } = useSite();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', phone: '', goal: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const goalLabels = {
            'fat-loss': 'Fat Loss',
            'muscle-gain': 'Muscle Gain',
            'strength': 'Strength Training',
            'toning': 'Body Toning',
            'online': 'Online Coaching',
            'other': 'Other',
        };

        const msg = [
            `🏋️ *Free Consultation Request*`,
            ``,
            `👤 *Name:* ${form.name}`,
            `📞 *WhatsApp:* ${form.phone}`,
            `🎯 *Goal:* ${goalLabels[form.goal] || form.goal}`,
            ``,
            `_Sent from your portfolio website_`,
        ].join('\n');

        const whatsappUrl = `https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        window.open(whatsappUrl, '_blank');

        setStep(2);
    };

    const handleClose = () => {
        setStep(1);
        setForm({ name: '', phone: '', goal: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                            background: '#111',
                            border: '1px solid rgba(249,115,22,0.3)',
                            borderRadius: '20px',
                            padding: '40px',
                            maxWidth: '480px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Decorative glow */}
                        <div style={{
                            position: 'absolute', top: '-60px', right: '-60px',
                            width: '200px', height: '200px',
                            background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
                        }} />

                        <button
                            id="popup-close-btn"
                            onClick={handleClose}
                            style={{
                                position: 'absolute', top: '16px', right: '16px',
                                background: 'rgba(255,255,255,0.08)', border: 'none',
                                borderRadius: '50%', width: '36px', height: '36px',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.2s',
                            }}
                        >
                            <X size={18} color="white" />
                        </button>

                        {step === 1 ? (
                            <>
                                {/* Header */}
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)',
                                    borderRadius: '4px', padding: '5px 14px', marginBottom: '20px',
                                }}>
                                    <Gift size={14} color="#f97316" />
                                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.78rem', letterSpacing: '0.2em', color: '#f97316', textTransform: 'uppercase' }}>
                                        100% Free • No Obligations
                                    </span>
                                </div>

                                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.2rem', lineHeight: 1, marginBottom: '8px' }}>
                                    BOOK YOUR FREE <span className="gradient-text">CONSULTATION</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '28px', lineHeight: 1.6 }}>
                                    Get a personalized 30-minute strategy session with {siteData.hero.trainerName} — absolutely free. Let's map out your transformation.
                                </p>

                                <form id="popup-form" onSubmit={handleSubmit}>
                                    {[
                                        { id: 'popup-name', label: 'Full Name', type: 'text', placeholder: 'Your full name', key: 'name' },
                                        { id: 'popup-phone', label: 'WhatsApp Number', type: 'tel', placeholder: '+91 XXXXX XXXXX', key: 'phone' },
                                    ].map(field => (
                                        <div key={field.id} style={{ marginBottom: '14px' }}>
                                            <label htmlFor={field.id} style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {field.label}
                                            </label>
                                            <input
                                                id={field.id}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={form[field.key]}
                                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                                required
                                                style={{
                                                    width: '100%', background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.12)',
                                                    borderRadius: '8px', padding: '12px 14px',
                                                    color: 'white', fontSize: '0.9rem', outline: 'none',
                                                    fontFamily: '"Inter", sans-serif', transition: 'border-color 0.2s',
                                                }}
                                                onFocus={e => e.target.style.borderColor = '#f97316'}
                                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                            />
                                        </div>
                                    ))}

                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor="popup-goal" style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            Primary Goal
                                        </label>
                                        <select
                                            id="popup-goal"
                                            value={form.goal}
                                            onChange={e => setForm({ ...form, goal: e.target.value })}
                                            required
                                            style={{
                                                width: '100%', background: '#1a1a1a',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: '8px', padding: '12px 14px',
                                                color: form.goal ? 'white' : 'rgba(255,255,255,0.3)',
                                                fontSize: '0.9rem', outline: 'none', cursor: 'pointer',
                                                fontFamily: '"Inter", sans-serif', transition: 'border-color 0.2s',
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#f97316'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                        >
                                            <option value="" disabled>Choose your goal...</option>
                                            <option value="fat-loss">Fat Loss</option>
                                            <option value="muscle-gain">Muscle Gain</option>
                                            <option value="strength">Strength Training</option>
                                            <option value="toning">Body Toning</option>
                                            <option value="online">Online Coaching</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <button type="submit" id="popup-submit-btn" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem' }}>
                                        Claim Free Consultation 🔥
                                    </button>
                                </form>

                                <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '14px' }}>
                                    Your info is 100% private. No spam, ever.
                                </p>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    style={{
                                        width: '80px', height: '80px',
                                        background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 24px',
                                    }}
                                >
                                    <CheckCircle size={40} color="#22c55e" />
                                </motion.div>
                                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', marginBottom: '12px' }}>
                                    YOU'RE ALL SET! 🎉
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '8px' }}>
                                    Hey <strong style={{ color: 'white' }}>{form.name}</strong>, your free consultation is confirmed!
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '28px' }}>
                                    {siteData.hero.trainerName} will reach out to you on <strong style={{ color: '#25d366' }}>{form.phone}</strong> within 24 hours to schedule your session. Get ready to transform! 💪
                                </p>
                                <button className="btn-primary" onClick={handleClose} style={{ margin: '0 auto' }}>
                                    Close
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
