import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSite } from '../context/SiteContext';

export default function Transformations() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const t = siteData.transformations;

    return (
        <section id="transformations" className="section-padding" style={{ background: '#0a0a0a', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{t.sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {t.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.title.split(' ').slice(-1)}</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '540px', margin: '16px auto 0', fontSize: '0.95rem' }}>{t.subtitle}</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {t.items.map((item, i) => (
                        <motion.div key={`${item.name}-${i}`} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="transformation-card" style={{ height: '340px', borderRadius: '12px' }}>
                            <img src={item.img} alt={`${item.name} transformation`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="transformation-overlay">
                                <div>
                                    <span style={{ background: 'rgba(249,115,22,0.9)', color: 'white', fontSize: '0.7rem', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '3px', display: 'inline-block', marginBottom: '8px' }}>{item.type}</span>
                                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#f97316' }}>{item.result}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{item.name} • {item.duration}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} style={{ textAlign: 'center', marginTop: '56px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px', fontSize: '1rem' }}>Ready to write your own transformation story?</p>
                    <a href="#packages" className="btn-primary">View Training Packages</a>
                </motion.div>
            </div>
        </section>
    );
}
