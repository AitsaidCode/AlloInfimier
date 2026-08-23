import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaMapMarkerAlt, FaArrowRight
} from 'react-icons/fa';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { PHONE, WHATSAPP, EMAIL } from '../config';
import FaqAccordion from '../components/FaqAccordion';
import './Contact.css';

export default function Contact() {
    const { t } = useTranslation();
    const waUrl = getWhatsAppUrl(WHATSAPP, t);
    const faqItems = t('contact_faq.items', { returnObjects: true });
    const areaKeys = ['rabat', 'agdal', 'sale', 'hayriad', 'temara', 'skhirat'];

    return (
        <>
            <Helmet>
                <title>{t('meta.contact_title')}</title>
                <meta name="description" content={t('meta.contact_desc')} />
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <h1>{t('contact.title')}</h1>
                    <p>{t('contact.subtitle')}</p>
                </div>
            </div>

            {/* Contact Cards */}
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="contact-tile">
                            <div className="contact-tile__icon contact-tile__icon--phone"><FaPhone /></div>
                            <h3>{t('contact.phone_label')}</h3>
                            <p>{PHONE}</p>
                            <span className="contact-tile__sub">{t('contact.phone_sub')}</span>
                        </a>

                        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="contact-tile">
                            <div className="contact-tile__icon contact-tile__icon--wa"><FaWhatsapp /></div>
                            <h3>{t('contact.whatsapp_label')}</h3>
                            <p>WhatsApp</p>
                            <span className="contact-tile__sub">{t('contact.whatsapp_sub')}</span>
                        </a>

                        <a href={`mailto:${EMAIL}`} className="contact-tile">
                            <div className="contact-tile__icon contact-tile__icon--email"><FaEnvelope /></div>
                            <h3>{t('contact.email_label')}</h3>
                            <p>{EMAIL}</p>
                            <span className="contact-tile__sub">{t('contact.email_sub')}</span>
                        </a>

                        <div className="contact-tile">
                            <div className="contact-tile__icon contact-tile__icon--hours"><FaClock /></div>
                            <h3>{t('contact.hours_label')}</h3>
                            <p>{t('contact.hours')}</p>
                            <span className="contact-tile__sub">{t('contact.hours_sub')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaMapMarkerAlt /> {t('contact.map_title')}</span>
                        <h2 className="section__title">{t('contact.address_label')}</h2>
                        <p className="section__subtitle">{t('contact.address')}</p>
                    </div>
                    <div className="map-wrapper">
                        <iframe
                            title="Allo Infirmier Rabat"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53080.14035075867!2d-6.8854!3d33.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b871f50c5c1%3A0x7ac946ed7408076b!2sRabat!5e0!3m2!1sfr!2sma!4v1"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Service Areas */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaMapMarkerAlt /> {t('contact_areas.tag')}</span>
                        <h2 className="section__title">{t('contact_areas.title')}</h2>
                    </div>
                    <div className="grid-3">
                        {areaKeys.map(key => (
                            <div key={key} className="area-card card">
                                <FaMapMarkerAlt className="area-card__icon" />
                                <h4>{t(`contact_areas.items.${key}.name`)}</h4>
                                <p>{t(`contact_areas.items.${key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <h2 className="section__title">{t('contact_faq.title')}</h2>
                        <p className="section__subtitle">{t('contact_faq.subtitle')}</p>
                    </div>
                    <FaqAccordion items={faqItems} />
                </div>
            </section>
        </>
    );
}
