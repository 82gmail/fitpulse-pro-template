import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Packages() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const p = siteData.packages;

    return (
        <section id="packages" className="section-padding" style={{ background: '#060606', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{p.sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {p.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{p.title.split(' ').slice(-1)}</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', fontSize: '0.95rem' }}>{p.subtitle}</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
                    {p.items.map((pkg, i) => (
                        <motion.div key={pkg.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="card-hover" style={{ background: pkg.popular ? 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(249,115,22,0.06))' : 'rgba(255,255,255,0.03)', border: `1px solid ${pkg.popular ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '16px', padding: '32px 28px', position: 'relative', overflow: 'hidden', ...(pkg.popular ? { transform: 'scale(1.02)' } : {}) }}>
                            {pkg.popular && (
                                <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #f97316, #c2410c)', padding: '6px 24px', borderRadius: '0 0 12px 12px', fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Star size={12} fill="white" />Most Popular
                                </div>
                            )}
                            <div style={{ marginTop: pkg.popular ? '16px' : '0' }}>
                                <div style={{ marginBottom: '4px' }}><span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f97316' }}>{pkg.tagline}</span></div>
                                <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '20px', letterSpacing: '0.03em' }}>{pkg.name}</h3>
                                <div style={{ marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                    <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: pkg.popular ? '#f97316' : 'white', lineHeight: 1 }}>{pkg.price}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginLeft: '6px' }}>{pkg.per}</span>
                                </div>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                                    {pkg.features.map(f => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: pkg.popular ? '#ffffff' : '#9ca3af' }}>
                                            <Check size={14} color={pkg.popular ? '#f97316' : '#22c55e'} style={{ flexShrink: 0 }} />{f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#contact" className={pkg.popular ? 'btn-primary' : 'btn-outline'} id={`pkg-${pkg.id}-btn`} style={{ display: 'block', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                                    {pkg.popular ? 'Get Started Now' : 'Choose Plan'}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
                    * All prices are inclusive of training. Contact for custom enterprise or corporate plans.
                </motion.p>
            </div>
        </section>
    );
}
