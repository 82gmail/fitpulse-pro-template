import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Dumbbell, Flame, Zap, Apple, Monitor, Users, Target, Activity } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const iconMap = [Dumbbell, Flame, Activity, Zap, Apple, Monitor, Users, Target];

export default function Services() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const s = siteData.services;

    return (
        <section id="services" className="section-padding" style={{ background: '#060606', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'radial-gradient(circle at 50% 50%, #f97316 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }} ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{s.sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {s.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{s.title.split(' ').slice(-1)}</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', fontSize: '0.95rem' }}>{s.subtitle}</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {s.items.map((svc, i) => {
                        const Icon = iconMap[i] || Dumbbell;
                        return (
                            <motion.div key={svc.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="card-hover glass-card" style={{ borderRadius: '12px', padding: '32px 28px', position: 'relative', overflow: 'hidden', border: svc.highlight ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.06)', background: svc.highlight ? 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))' : 'rgba(255,255,255,0.02)' }}>
                                {svc.highlight && (
                                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'linear-gradient(135deg, #f97316, #c2410c)', borderRadius: '20px', padding: '3px 12px', fontSize: '0.65rem', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Most Popular</div>
                                )}
                                <div style={{ width: '56px', height: '56px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    <Icon size={24} color="#f97316" />
                                </div>
                                <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.05em', color: 'white', marginBottom: '10px' }}>{svc.title}</h3>
                                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{svc.desc}</p>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #f97316, transparent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease' }} className="service-line" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <style>{`.card-hover:hover .service-line { transform: scaleX(1) !important; }`}</style>
        </section>
    );
}
