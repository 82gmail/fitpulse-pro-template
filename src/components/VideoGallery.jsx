import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { Play } from 'lucide-react';

export default function VideoGallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { siteData } = useSite();
    const { sectionLabel, title, subtitle, videos } = siteData.gallery;

    return (
        <section id="gallery" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.25em', color: '#f97316', textTransform: 'uppercase' }}>{sectionLabel}</span>
                    <h2 className="section-title section-title-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1, marginTop: '8px' }}>
                        {title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{title.split(' ').slice(-1)}</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '540px', margin: '16px auto 0', fontSize: '0.95rem' }}>{subtitle}</p>
                </motion.div>

                <div className="video-grid">
                    {videos.map((video, idx) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`video-card ${video.isVertical ? 'vertical-card' : ''}`}
                        >
                            <div
                                className={`video-wrapper ${video.isVertical ? 'vertical' : ''}`}
                                style={{
                                    /* Fallback sizing guarantees the video shows even if CSS aspect-ratio fails */
                                    paddingTop: video.isVertical ? '177.77%' : '56.25%',
                                    aspectRatio: video.isVertical ? '9 / 16' : '16 / 9'
                                }}
                            >
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    style={{ width: '100%', height: '100%', borderRadius: '12px', position: 'absolute', top: 0, left: 0 }}
                                ></iframe>
                                <div className="video-overlay">
                                    <div className="video-play-icon">
                                        <Play fill="white" size={24} />
                                    </div>
                                    <h3 className="video-card-title">{video.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }} />
        </section>
    );
}
