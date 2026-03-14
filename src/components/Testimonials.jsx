import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function StarRating({ count }) {
    return (
        <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} color={i < count ? '#f59e0b' : '#374151'} fill={i < count ? '#f59e0b' : 'none'} />
            ))}
        </div>
    );
}

export default function Testimonials() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const t = siteData.testimonials;

    return (
        <section id="testimonials" className="section-padding" style={{ background: '#060606', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{t.sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {t.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.title.split(' ').slice(-1)}</span>
                    </h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {t.items.map((item, i) => (
                        <motion.div key={item.name} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="card-hover glass-card" style={{ borderRadius: '16px', padding: '28px', border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.12 }}><Quote size={48} color={item.color} /></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${item.color}20`, border: `2px solid ${item.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', color: item.color, flexShrink: 0 }}>{item.initials}</div>
                                <div>
                                    <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{item.role}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', background: `${item.color}20`, border: `1px solid ${item.color}40`, borderRadius: '20px', padding: '3px 10px', fontSize: '0.65rem', color: item.color, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, flexShrink: 0 }}>{item.result}</div>
                            </div>
                            <StarRating count={item.stars} />
                            <p style={{ marginTop: '14px', fontSize: '0.87rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic' }}>"{item.review}"</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }} style={{ marginTop: '64px', display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', textAlign: 'center' }}>
                    {[
                        { val: t.stat1, label: t.stat1Label },
                        { val: t.stat2, label: t.stat2Label },
                        { val: t.stat3, label: t.stat3Label },
                    ].map(s => (
                        <div key={s.label}>
                            <div className="stat-number">{s.val}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
