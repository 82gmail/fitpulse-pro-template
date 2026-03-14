import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSite } from '../context/SiteContext';

export default function PhotoGallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const { sectionLabel, title, subtitle, photos } = siteData.photoGallery;

    return (
        <section id="photos" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{title.split(' ').slice(-1)}</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '540px', margin: '16px auto 0', fontSize: '0.95rem' }}>{subtitle}</p>
                </motion.div>

                <div className="photo-grid">
                    {photos.map((photo, idx) => (
                        <motion.div
                            key={photo.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="photo-card"
                        >
                            <img src={photo.url} alt={photo.caption} loading="lazy" />
                            {photo.caption && (
                                <div className="photo-overlay">
                                    <span>{photo.caption}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }} />
        </section>
    );
}
