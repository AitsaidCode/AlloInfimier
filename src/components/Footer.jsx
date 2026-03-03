import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { PHONE, WHATSAPP, EMAIL } from '../config';
import './Footer.css';

export default function Footer() {
    const { t } = useTranslation();

    const services = [
        { label: t('services.items.wound.title'), path: '/services' },
        { label: t('services.items.injections.title'), path: '/services' },
        { label: t('services.items.surgery.title'), path: '/services' },
        { label: t('services.items.elderly.title'), path: '/services' },
        { label: t('services.items.accompany.title'), path: '/services' },
        { label: t('services.items.concierge.title'), path: '/services' },
    ];

    return (
        <footer className="footer">
            <div className="container footer__grid">
                {/* Brand */}
                <div className="footer__brand">
                    <div className="footer__logo">
                        <img
                            src="/images/Logo.jpg"
                            alt="Allo Infirmier"
                            className="footer__logo-img"
                        />
                    </div>
                    <p className="footer__desc">{t('footer.description')}</p>
                    <div className="footer__socials">
                        <a href={`tel:${PHONE}`} className="footer__social-btn" title="Téléphone">
                            <FaPhone />
                        </a>
                        <a
                            href={`https://wa.me/${WHATSAPP}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-btn footer__social-btn--wa"
                            title="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>
                        <a href={`mailto:${EMAIL}`} className="footer__social-btn" title="Email">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>

                {/* Services */}
                <div className="footer__col">
                    <h4 className="footer__col-title">{t('footer.services_title')}</h4>
                    <ul className="footer__list">
                        {services.map((s, i) => (
                            <li key={i}>
                                <Link to={s.path} className="footer__link">{s.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer__col">
                    <h4 className="footer__col-title">{t('footer.contact_title')}</h4>
                    <ul className="footer__list footer__contact-list">
                        <li>
                            <FaPhone className="footer__icon" />
                            <a href={`tel:${PHONE}`} className="footer__link">{PHONE}</a>
                        </li>
                        <li>
                            <FaWhatsapp className="footer__icon footer__icon--wa" />
                            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="footer__link">
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <FaEnvelope className="footer__icon" />
                            <a href={`mailto:${EMAIL}`} className="footer__link">{EMAIL}</a>
                        </li>
                        <li>
                            <FaMapMarkerAlt className="footer__icon" />
                            <span className="footer__link">{t('footer.areas')}</span>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="footer__col">
                    <h4 className="footer__col-title">{t('footer.legal_title')}</h4>
                    <ul className="footer__list">
                        <li><Link to="/about" className="footer__link">{t('footer.legal')}</Link></li>
                        <li><Link to="/about" className="footer__link">{t('footer.privacy')}</Link></li>
                        <li>
                            <Link to="/request" className="btn btn--primary btn--sm">
                                {t('nav.request')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
                    <p className="footer__bottom-tag">
                        Rabat · Salé · Morocco
                    </p>
                </div>
            </div>
        </footer>
    );
}
