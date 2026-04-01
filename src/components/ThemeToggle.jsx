import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const { t } = useTranslation();
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return saved ? saved === 'dark' : prefersDark;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark]);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    const label = dark ? t('theme.to_light') : t('theme.to_dark');

    return (
        <button
            className={`theme-toggle ${dark ? 'theme-toggle--dark' : ''}`}
            onClick={toggle}
            aria-label={label}
            title={label}
        >
            <span className="theme-toggle__icon">
                {dark ? <FaSun /> : <FaMoon />}
            </span>
        </button>
    );
}
