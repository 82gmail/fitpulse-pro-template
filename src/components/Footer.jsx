import { Instagram, Youtube, Facebook, Phone, MapPin, Mail } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Footer() {
    const year = new Date().getFullYear();
    const { siteData } = useSite();
    const f = siteData.footer;

    return (
        <footer style={{ background: '#060606', borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 40px' }}>
                <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <div style={{ flex: '2', minWidth: '240px' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.2rem', color: '#f97316', letterSpacing: '0.05em' }}>{siteData.hero.trainerName.split(' ')[0]}</span>
                            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.2rem', color: 'white', letterSpacing: '0.05em', marginLeft: '8px' }}>{siteData.hero.trainerName.split(' ')[1] || 'COACHing'}</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '350px', marginBottom: '24px' }}>{f.bio}</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[
                                { Icon: Instagram, href: f.instagram, label: 'Instagram', color: '#e1306c' },
                                { Icon: Youtube, href: f.youtube, label: 'YouTube', color: '#ff0000' },
                                { Icon: Facebook, href: f.facebook, label: 'Facebook', color: '#1877f2' },
                            ].map(({ Icon, href, label, color }) => (
                                <a key={label} href={href} id={`footer-${label.toLowerCase()}`} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', textDecoration: 'none' }} onMouseOver={e => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.borderColor = `${color}60`; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                                    <Icon size={18} color="rgba(255,255,255,0.7)" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: '1', minWidth: '160px' }}>
                        <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>Navigation</h4>
                        {[['#about', 'About'], ['#services', 'Services'], ['#transformations', 'Transformations'], ['#packages', 'Packages'], ['#certifications', 'Certifications'], ['#testimonials', 'Reviews'], ['#contact', 'Contact']].map(([href, label]) => (
                            <a key={label} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s ease' }} onMouseOver={e => e.currentTarget.style.color = '#f97316'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{label}</a>
                        ))}
                    </div>

                    <div style={{ flex: '1', minWidth: '160px' }}>
                        <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>Services</h4>
                        {siteData.services.items.slice(0, 6).map(s => (
                            <a key={s.title} href="#services" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s ease' }} onMouseOver={e => e.currentTarget.style.color = '#f97316'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{s.title}</a>
                        ))}
                    </div>

                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>Contact</h4>
                        {[{ Icon: Phone, text: f.phone }, { Icon: MapPin, text: f.location }, { Icon: Mail, text: f.email }].map(({ Icon, text }) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                <Icon size={14} color="#f97316" />
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>{text}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {siteData.certifications.items.map(c => (
                                <span key={c.org} style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#f97316', fontSize: '0.65rem', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '3px' }}>{c.org}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', maxWidth: '1280px', margin: '0 auto' }}>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>© {year} {siteData.hero.trainerName}. All rights reserved.</p>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>{f.location} • <span style={{ color: 'rgba(249,115,22,0.5)' }}>{siteData.hero.badge}</span></p>
            </div>
        </footer>
    );
}
