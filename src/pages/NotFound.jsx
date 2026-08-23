import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FaHome, FaPhone, FaStethoscope, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { PHONE } from '../config';
import './NotFound.css';

const suggestionLinks = [
    { key: 'home', to: '/', icon: <FaHome /> },
    { key: 'services', to: '/services', icon: <FaStethoscope /> },
    { key: 'contact', to: '/contact', icon: <FaEnvelope /> },
    { key: 'request', to: '/request', icon: <FaPhone /> },
];

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('meta.notfound_title')}</title>
            </Helmet>
            <section className="notfound">
            <div className="notfound__content animate-fadeInUp">
                <div className="notfound__code">404</div>
                <div className="notfound__divider" />
                <h1 className="notfound__title">{t('notFound.title')}</h1>
                <p className="notfound__message">{t('notFound.message')}</p>
                <div className="notfound__actions">
                    <Link to="/" className="btn btn--primary">
                        <FaHome /> {t('notFound.back')}
                    </Link>
                    <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="btn btn--outline">
                        <FaPhone /> {t('hero.cta_secondary')}
                    </a>
                </div>

                <div className="notfound__suggestions">
                    <h3 className="notfound__suggestions-title">{t('notFound.suggestions_title')}</h3>
                    <div className="notfound__suggestions-grid">
                        {suggestionLinks.map((s) => (
                            <Link key={s.key} to={s.to} className="notfound__suggest-card">
                                <div className="notfound__suggest-icon">{s.icon}</div>
                                <div className="notfound__suggest-body">
                                    <div className="notfound__suggest-name">{t(`notFound.suggestions.${s.key}.title`)}</div>
                                    <div className="notfound__suggest-desc">{t(`notFound.suggestions.${s.key}.desc`)}</div>
                                </div>
                                <FaArrowRight className="notfound__suggest-arrow" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            </section>
        </>
    );
}
