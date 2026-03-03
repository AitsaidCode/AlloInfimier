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

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        setMenuOpen(false);
    };

    const langs = [
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
        { code: 'ar', label: 'AR' },
    ];

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/services', label: t('nav.services') },
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                {/* Logo */}
                <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
                    <img
                        src="/images/Logo.jpg"
                        alt="Allo Infirmier"
                        className="navbar__logo-img"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="navbar__links">
                    {navLinks.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="navbar__actions">
                    <div className="navbar__lang-switcher">
                        {langs.map(({ code, label }) => (
                            <button
                                key={code}
                                className={`lang-btn ${i18n.language === code ? 'lang-btn--active' : ''}`}
                                onClick={() => changeLang(code)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <ThemeToggle />
                    <a href={`tel:${PHONE}`} className="btn btn--primary btn--sm navbar__cta">
                        <FaPhone size={12} />
                        {t('hero.cta_secondary')}
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="navbar__mobile-menu">
                    {navLinks.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {label}
                        </NavLink>
                    ))}
                    <Link
                        to="/request"
                        className="btn btn--primary"
                        onClick={() => setMenuOpen(false)}
                    >
                        {t('nav.request')}
                    </Link>
                    <div className="navbar__mobile-bottom">
                        <div className="navbar__mobile-langs">
                            {langs.map(({ code, label }) => (
                                <button
                                    key={code}
                                    className={`lang-btn ${i18n.language === code ? 'lang-btn--active' : ''}`}
                                    onClick={() => changeLang(code)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </header>
    );
}
