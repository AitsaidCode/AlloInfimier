import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { PHONE } from '../config';
import './Navbar.css';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        setMenuOpen(false);
    };

    const links = [
        { to: '/', label: t('nav.home') },
        { to: '/services', label: t('nav.services') },
        { to: '/about', label: t('nav.about') },
        { to: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
                    <img src="/images/Logo.jpg" alt="Allo Infirmier" />
                    <span className="navbar__brand">Allo Infirmier</span>
                </Link>

                <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}>
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `navbar__link${isActive ? ' navbar__link--active' : ''}`
                            }
                            onClick={() => setMenuOpen(false)}
                            end={to === '/'}
                        >
                            {label}
                        </NavLink>
                    ))}

                    {/* Mobile-only extras */}
                    <div className="navbar__mobile-extras">
                        <Link
                            to="/request"
                            className="btn btn--primary btn--lg"
                            onClick={() => setMenuOpen(false)}
                        >
                            {t('nav.request')}
                        </Link>
                        <div className="navbar__lang-row">
                            {['fr', 'en', 'ar'].map(lng => (
                                <button
                                    key={lng}
                                    className={`navbar__lang-btn${i18n.language === lng ? ' navbar__lang-btn--active' : ''}`}
                                    onClick={() => changeLang(lng)}
                                >
                                    {lng.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="navbar__actions">
                    <div className="navbar__lang-group">
                        {['fr', 'en', 'ar'].map(lng => (
                            <button
                                key={lng}
                                className={`navbar__lang-btn${i18n.language === lng ? ' navbar__lang-btn--active' : ''}`}
                                onClick={() => changeLang(lng)}
                            >
                                {lng.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <ThemeToggle />
                    <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="btn btn--navy navbar__cta">
                        <FaPhone /> {t('nav.call')}
                    </a>
                </div>

                <button
                    className="navbar__toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
        </header>
    );
}
