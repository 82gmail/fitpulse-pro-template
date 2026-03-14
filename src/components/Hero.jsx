import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Hero({ onConsultOpen }) {
    const { siteData } = useSite();
    const h = siteData.hero;

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: '#060606',
            }}
        >
            {/* BG Image */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${h.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.75) 50%, rgba(6,6,6,0.5) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.3) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, transparent, #f97316, transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 10, paddingTop: '80px', gap: '40px', flexWrap: 'wrap' }}>
                {/* Left content */}
                <div style={{ flex: '1', minWidth: '300px', maxWidth: '680px' }}>
                    <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '4px', padding: '6px 16px', marginBottom: '24px' }}>
                            <div style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '50%' }} className="animate-pulse-orange" />
                            <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.85rem', letterSpacing: '0.2em', color: '#f97316', textTransform: 'uppercase' }}>{h.badge}</span>
                        </div>

                        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '24px' }}>
                            <span style={{ display: 'block', color: 'white' }}>{h.headlineLine1}</span>
                            <span style={{ display: 'block', color: 'white' }}>{h.headlineLine2.replace('BODY.', '')}  <span className="gradient-text text-glow">{h.headlineLine2.includes('BODY') ? 'BODY.' : h.headlineLine2}</span></span>
                            <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)' }}>{h.headlineLine3}</span>
                            <span style={{ display: 'block', color: 'white' }}>{h.headlineLine4.replace('LIFE.', '')} <span className="gradient-text text-glow">{h.headlineLine4.includes('LIFE') ? 'LIFE.' : h.headlineLine4}</span></span>
                        </h1>

                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '500px' }}>{h.subtext}</p>

                        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
                            {[
                                { num: h.stat1Num, label: h.stat1Label },
                                { num: h.stat2Num, label: h.stat2Label },
                                { num: h.stat3Num, label: h.stat3Label },
                            ].map(s => (
                                <div key={s.label}>
                                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.8rem', color: '#f97316', lineHeight: 1 }}>{s.num}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button id="hero-book-btn" className="btn-primary" onClick={onConsultOpen}>
                                <Calendar size={18} />{h.ctaBook}
                            </button>
                            <a href="#contact" className="btn-outline" id="hero-contact-btn">
                                <MessageCircle size={18} />{h.ctaContact}
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Trainer portrait */}
                <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4 }} style={{ flex: '0 0 auto', position: 'relative' }}>
                    <div style={{ width: 'clamp(280px, 28vw, 420px)', height: 'clamp(380px, 40vw, 560px)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '-3px', background: 'linear-gradient(135deg, #f97316, transparent, #f97316)', borderRadius: '12px' }} className="animate-pulse-orange" />
                        <img src={h.trainerImage} alt={`${h.trainerName} – ${h.trainerCerts}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', position: 'relative', zIndex: 1, filter: 'contrast(1.05) brightness(0.95)' }} />
                        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(6,6,6,0.9)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: '6px', padding: '12px 24px', zIndex: 2, textAlign: 'center', backdropFilter: 'blur(10px)', whiteSpace: 'nowrap' }}>
                            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', color: 'white' }}>{h.trainerName}</div>
                            <div style={{ fontSize: '0.7rem', color: '#f97316', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{h.trainerCerts}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', zIndex: 10 }} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Scroll</span>
                <ChevronDown size={20} color="rgba(249,115,22,0.7)" />
            </motion.div>
        </section>
    );
}
