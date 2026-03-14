import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const a = siteData.about;

    return (
        <section id="about" className="section-padding" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Left: Bio */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{a.sectionLabel}</span>
                        </div>
                        <h2 className="section-title" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginBottom: '28px' }}>
                            {a.titleLine1} <br /><span className="gradient-text">{a.titleLine2}</span>
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '32px' }}>
                            <p>{a.bio1}</p>
                            <p>{a.bio2}</p>
                            <p>{a.bio3}</p>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
                            {a.skills.map(s => (
                                <span key={s} style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', color: 'rgba(255,255,255,0.8)', borderRadius: '4px', padding: '5px 14px', fontSize: '0.8rem', fontFamily: '"Barlow Condensed",sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s}</span>
                            ))}
                        </div>
                        <a href="#contact" className="btn-primary"><Star size={16} />Start Your Journey</a>
                    </motion.div>

                    {/* Right: Certs + Why */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ flex: '0 0 auto', width: 'clamp(280px, 35%, 400px)' }}>
                        <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>Certifications & Credentials</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                            {a.certs.map((c, i) => (
                                <motion.div key={c.org} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.color}30`, borderLeft: `3px solid ${c.color}`, borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white', marginBottom: '2px' }}>{c.title}</div>
                                        <div style={{ fontSize: '0.78rem', color: c.color }}>{c.org}</div>
                                    </div>
                                    <CheckCircle size={16} color={c.color} style={{ marginLeft: 'auto', flexShrink: 0 }} />
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', padding: '28px' }}>
                            <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', color: '#f97316', marginBottom: '20px', letterSpacing: '0.05em' }}>WHY CHOOSE ME?</h4>
                            {a.whyItems.map(item => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <CheckCircle size={14} color="#f97316" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
