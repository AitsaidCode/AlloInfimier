import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaWhatsapp, FaEnvelope, FaInstagram, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { PHONE, WHATSAPP, EMAIL } from '../config';
import './Footer.css';

export default function Footer() {
    const { t } = useTranslation();
    const waUrl = getWhatsAppUrl(WHATSAPP, t);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__col footer__col--brand">
                        <Link to="/" className="footer__logo">
                            <img src="/images/Logo.jpg" alt="Allo Infirmier" />
                            <span>Allo Infirmier</span>
                        </Link>
                        <p className="footer__desc">
                            {t('footer.description')}
                        </p>
                        <div className="footer__socials">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer__col">
                        <h4 className="footer__heading">{t('nav.services')}</h4>
                        <ul className="footer__links">
                            <li><Link to="/services">{t('services.items.wound.title')}</Link></li>
                            <li><Link to="/services">{t('services.items.injections.title')}</Link></li>
                            <li><Link to="/services">{t('services.items.surgery.title')}</Link></li>
                            <li><Link to="/services">{t('services.items.elderly.title')}</Link></li>
                            <li><Link to="/services">{t('services.items.accompany.title')}</Link></li>
                        </ul>
                    </div>

                    {/* About */}
                    <div className="footer__col">
                        <h4 className="footer__heading">{t('nav.about')}</h4>
                        <ul className="footer__links">
                            <li><Link to="/about">{t('footer.who')}</Link></li>
                            <li><Link to="/request">{t('nav.request')}</Link></li>
                            <li><Link to="/contact">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4 className="footer__heading">{t('footer.contact_title')}</h4>
                        <ul className="footer__contact">
                            <li>
                                <FaPhone />
                                <a href={`tel:${PHONE}`}>{PHONE}</a>
                            </li>
                            <li>
                                <FaWhatsapp />
                                <a href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            </li>
                            <li>
                                <FaEnvelope />
                                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                            </li>
                            <li>
                                <FaMapMarkerAlt />
                                <span>{t('footer.address')}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} Allo Infirmier. {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
}
