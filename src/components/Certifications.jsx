import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Certifications() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [lightbox, setLightbox] = useState(null);
    const { siteData } = useSite();
    const c = siteData.certifications;

    return (
        <>
            <section id="certifications" className="section-padding" style={{ background: '#0a0a0a', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{c.sectionLabel}</span>
                        <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                            {c.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{c.title.split(' ').slice(-1)}</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', fontSize: '0.95rem' }}>{c.subtitle}</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                        {c.items.map((cert, i) => (
                            <motion.div key={cert.org} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }}>
                                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', marginBottom: '20px', border: `1px solid ${cert.color}30`, height: '220px' }} onClick={() => setLightbox(cert)}>
                                    <img src={cert.img} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
                                        <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                                            <ZoomIn size={12} color={cert.color} /><span style={{ color: 'rgba(255,255,255,0.7)' }}>Click to view</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${cert.color}20`, borderLeft: `3px solid ${cert.color}`, borderRadius: '10px', padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{cert.badge}</span>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{cert.title}</div>
                                            <div style={{ fontSize: '0.78rem', color: cert.color }}>{cert.org}</div>
                                        </div>
                                        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.1em' }}>{cert.year}</span>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{cert.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {lightbox && (
                <div className="popup-overlay" onClick={() => setLightbox(null)}>
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ background: '#111', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '16px', padding: '20px', maxWidth: '700px', width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} color="white" /></button>
                        <img src={lightbox.img} alt={lightbox.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '16px' }} />
                        <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.3rem', color: 'white' }}>{lightbox.title}</h3>
                        <p style={{ color: lightbox.color, fontSize: '0.85rem' }}>{lightbox.org} • {lightbox.year}</p>
                    </motion.div>
                </div>
            )}
        </>
    );
}
