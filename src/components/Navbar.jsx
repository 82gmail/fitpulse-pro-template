import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#transformations', label: 'Results' },
    { href: '#photos', label: 'Gallery' },
    { href: '#packages', label: 'Packages' },
    { href: '#certifications', label: 'Certs' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onConsultOpen }) {
    const { siteData } = useSite();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 900,
                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                    background: scrolled ? 'rgba(6,6,6,0.97)' : 'transparent',
                    boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.8)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(249,115,22,0.15)' : 'none',
                }}
            >
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
                    {/* Logo */}
                    <a href="#hero" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.7rem', color: '#f97316', letterSpacing: '0.05em' }}>{siteData.hero.trainerName}</span>
                        <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{siteData.hero.badge}</span>
                    </a>

                    {/* Desktop Nav */}
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden-mobile">
                        {navLinks.map(l => (
                            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
                        ))}
                        <button id="nav-consult-btn" className="btn-primary" onClick={onConsultOpen} style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
                            Book Free Consult
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'none' }}
                        className="show-mobile"
                    >
                        {mobileOpen ? <X size={28} color="#f97316" /> : <Menu size={28} color="white" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 850,
                            background: 'rgba(6,6,6,0.98)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '28px',
                        }}
                    >
                        {navLinks.map(l => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="nav-link"
                                style={{ fontSize: '1.8rem' }}
                                onClick={() => setMobileOpen(false)}
                            >{l.label}</a>
                        ))}
                        <button
                            className="btn-primary"
                            onClick={() => { setMobileOpen(false); onConsultOpen(); }}
                            style={{ marginTop: '16px', fontSize: '1.1rem' }}
                        >
                            Book Free Consult
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
        </>
    );
}
