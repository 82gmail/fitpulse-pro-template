import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [form, setForm] = useState({ name: '', phone: '', email: '', goal: '', message: '' });
    const [sent, setSent] = useState(false);
    const { siteData } = useSite();
    const c = siteData.contact;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Build a WhatsApp message with all the enquiry details
        const goalLabels = {
            'fat-loss': 'Fat Loss',
            'muscle-gain': 'Muscle Gain',
            'strength': 'Strength & Conditioning',
            'toning': 'Body Toning',
            'nutrition': 'Nutrition Guidance',
            'online': 'Online Coaching',
            'other': 'Other',
        };

        const msg = [
            `🏋️ *New Training Enquiry*`,
            ``,
            `👤 *Name:* ${form.name}`,
            `📞 *Phone:* ${form.phone}`,
            form.email ? `📧 *Email:* ${form.email}` : null,
            `🎯 *Goal:* ${goalLabels[form.goal] || form.goal}`,
            form.message ? `📝 *Message:* ${form.message}` : null,
            ``,
            `_Sent from your portfolio website_`,
        ].filter(Boolean).join('\n');

        const whatsappUrl = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        window.open(whatsappUrl, '_blank');

        setSent(true);
        setTimeout(() => setSent(false), 5000);
        setForm({ name: '', phone: '', email: '', goal: '', message: '' });
    };

    return (
        <section id="contact" className="section-padding" style={{ background: '#0a0a0a', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{c.sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {c.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{c.title.split(' ').slice(-1)}</span>
                    </h2>
                </motion.div>

                <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} style={{ flex: '1', minWidth: '280px' }}>
                        <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.4rem', color: 'white', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>{c.tagline}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '36px', fontSize: '0.95rem', lineHeight: 1.7 }}>{c.desc}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                            <a href={c.phoneHref} id="contact-call-btn" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', padding: '18px 22px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(249,115,22,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(249,115,22,0.1)'}>
                                <div style={{ width: '44px', height: '44px', background: 'rgba(249,115,22,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Phone size={20} color="#f97316" /></div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Call Now</div>
                                    <div style={{ color: 'white', fontWeight: 600 }}>{c.phone}</div>
                                </div>
                            </a>

                            <a href={c.whatsapp} id="contact-whatsapp-btn" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: '12px', padding: '18px 22px', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(37,211,102,0.15)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(37,211,102,0.08)'}>
                                <div style={{ width: '44px', height: '44px', background: 'rgba(37,211,102,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MessageCircle size={20} color="#25d366" /></div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>WhatsApp</div>
                                    <div style={{ color: 'white', fontWeight: 600 }}>Message on WhatsApp</div>
                                </div>
                            </a>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '18px 22px' }}>
                                <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={20} color="#9ca3af" /></div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</div>
                                    <div style={{ color: 'white', fontWeight: 600 }}>{c.location}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', height: '220px' }}>
                            <iframe src={c.mapUrl} width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ flex: '1', minWidth: '280px' }}>
                        <form id="booking-form" onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px' }}>
                            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.3rem', color: 'white', marginBottom: '24px', fontWeight: 700 }}>Book Free Consultation</h3>
                            {[{ id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', key: 'name' }, { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX', key: 'phone' }, { id: 'email', label: 'Email (optional)', type: 'email', placeholder: 'your@email.com', key: 'email' }].map(field => (
                                <div key={field.id} style={{ marginBottom: '16px' }}>
                                    <label htmlFor={field.id} style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{field.label}</label>
                                    <input id={field.id} type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} required={field.key !== 'email'} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: '"Inter", sans-serif' }} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                                </div>
                            ))}
                            <div style={{ marginBottom: '16px' }}>
                                <label htmlFor="goal-select" style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Primary Goal</label>
                                <select id="goal-select" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} required style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px 16px', color: form.goal ? 'white' : 'rgba(255,255,255,0.3)', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', cursor: 'pointer', fontFamily: '"Inter", sans-serif' }} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}>
                                    <option value="" disabled>Select your goal...</option>
                                    <option value="fat-loss">Fat Loss</option>
                                    <option value="muscle-gain">Muscle Gain</option>
                                    <option value="strength">Strength & Conditioning</option>
                                    <option value="toning">Body Toning</option>
                                    <option value="nutrition">Nutrition Guidance</option>
                                    <option value="online">Online Coaching</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label htmlFor="message" style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Additional Info</label>
                                <textarea id="message" placeholder="Tell me about your fitness background, schedule availability, or any specific requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '0.9rem', resize: 'vertical', outline: 'none', transition: 'border-color 0.2s', fontFamily: '"Inter", sans-serif' }} onFocus={e => e.target.style.borderColor = '#f97316'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                            </div>
                            <button type="submit" id="form-submit-btn" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>
                                {sent ? <><CheckCircle size={18} /> Sent Successfully!</> : <><Send size={18} /> Book Free Session</>}
                            </button>
                            {sent && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', color: '#22c55e', fontSize: '0.85rem', marginTop: '12px' }}>✅ WhatsApp opened with your details! Send the message to {siteData.hero.trainerName} to confirm your session.</motion.p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
