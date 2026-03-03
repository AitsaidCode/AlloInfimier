import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import { PHONE, WHATSAPP, EMAIL } from '../config';
import './Contact.css';

export default function Contact() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const areaKeys = ['rabat', 'agdal', 'sale', 'hayriad', 'temara', 'skhirat'];
    const faqItems = t('contact_faq.items', { returnObjects: true });
    const [openFaq, setOpenFaq] = useState(null);

    const waMessage = lang === 'ar'
        ? 'مرحبا، أريد الاستفسار عن خدمات Allo Infirmier'
        : lang === 'en'
            ? 'Hello, I would like to inquire about Allo Infirmier services'
            : 'Bonjour, je souhaite me renseigner sur les services Allo Infirmier';

    return (
        <>
            <Helmet>
                <title>Contact – Allo Infirmier | Rabat &amp; Salé</title>
                <meta name="description" content="Contactez Allo Infirmier par téléphone, WhatsApp ou email. Service disponible à Rabat et Salé, 7j/7." />
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <span className="section__tag">{t('contact.tag')}</span>
                    <h1>{t('contact.title')}</h1>
                    <p>{t('contact.subtitle')}</p>
                </div>
            </div>

            <section className="section">
                <div className="container contact-layout">
                    {/* Contact Cards */}
                    <div className="contact-cards">
                        {/* Phone */}
                        <a href={`tel:${PHONE}`} className="contact-card contact-card--phone">
                            <div className="contact-card__icon"><FaPhone /></div>
                            <div className="contact-card__body">
                                <div className="contact-card__label">{t('contact.phone_label')}</div>
                                <div className="contact-card__value">{PHONE}</div>
                                <div className="contact-card__sub">Appuyez pour appeler</div>
                            </div>
                            <div className="contact-card__arrow">→</div>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card contact-card--whatsapp"
                        >
                            <div className="contact-card__icon"><FaWhatsapp /></div>
                            <div className="contact-card__body">
                                <div className="contact-card__label">{t('contact.whatsapp_label')}</div>
                                <div className="contact-card__value">WhatsApp</div>
                                <div className="contact-card__sub">Réponse en moins de 15 min</div>
                            </div>
                            <div className="contact-card__arrow">→</div>
                        </a>

                        {/* Email */}
                        <a href={`mailto:${EMAIL}`} className="contact-card contact-card--email">
                            <div className="contact-card__icon"><FaEnvelope /></div>
                            <div className="contact-card__body">
                                <div className="contact-card__label">{t('contact.email_label')}</div>
                                <div className="contact-card__value">{EMAIL}</div>
                                <div className="contact-card__sub">Réponse sous 2h</div>
                            </div>
                            <div className="contact-card__arrow">→</div>
                        </a>

                        {/* Hours */}
                        <div className="contact-card contact-card--hours">
                            <div className="contact-card__icon"><FaClock /></div>
                            <div className="contact-card__body">
                                <div className="contact-card__label">{t('contact.hours_label')}</div>
                                <div className="contact-card__value">{t('contact.hours')}</div>
                                <div className="contact-card__sub">Urgences 24h/24</div>
                            </div>
                        </div>

                        {/* Area */}
                        <div className="contact-card contact-card--area">
                            <div className="contact-card__icon"><FaMapMarkerAlt /></div>
                            <div className="contact-card__body">
                                <div className="contact-card__label">{t('contact.address_label')}</div>
                                <div className="contact-card__value">{t('contact.address')}</div>
                                <div className="contact-card__sub">Rabat · Salé · Agdal · Hay Riad · Témara</div>
                            </div>
                        </div>
                    </div>

                    {/* Map + CTA */}
                    <div className="contact-right">
                        {/* Map */}
                        <div className="contact-map">
                            <h3 className="contact-map__title">{t('contact.map_title')}</h3>
                            <div className="map-frame">
                                <iframe
                                    title="Allo Infirmier – Rabat"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53765.37839148737!2d-6.871236!3d33.98813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b871f50c5c1%3A0x89c9b3dfefa38f07!2sRabat!5e0!3m2!1sfr!2sma!4v1700000000000"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="contact-cta-box">
                            <h3>{t('cta_banner.title')}</h3>
                            <p>{t('cta_banner.subtitle')}</p>
                            <div className="contact-cta-btns">
                                <a href={`tel:${PHONE}`} className="btn btn--primary btn--lg">
                                    <FaPhone /> {t('contact.cta_call')}
                                </a>
                                <a
                                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--whatsapp btn--lg"
                                >
                                    <FaWhatsapp /> {t('contact.cta_whatsapp')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Areas Detail */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('contact_areas.tag')}</span>
                        <h2 className="section__title">{t('contact_areas.title')}</h2>
                        <p className="section__subtitle">{t('contact_areas.subtitle')}</p>
                    </div>
                    <div className="areas-detail-grid">
                        {areaKeys.map((key) => (
                            <div key={key} className="area-detail-card">
                                <div className="area-detail-card__icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <h4 className="area-detail-card__name">{t(`contact_areas.items.${key}.name`)}</h4>
                                <p className="area-detail-card__desc">{t(`contact_areas.items.${key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact FAQ */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('contact_faq.tag')}</span>
                        <h2 className="section__title">{t('contact_faq.title')}</h2>
                        <p className="section__subtitle">{t('contact_faq.subtitle')}</p>
                    </div>
                    <div className="faq-list">
                        {Array.isArray(faqItems) && faqItems.map((item, i) => (
                            <div
                                key={i}
                                className={`faq-item${openFaq === i ? ' faq-item--open' : ''}`}
                            >
                                <button
                                    className="faq-item__question"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                >
                                    <span>{item.q}</span>
                                    <FaChevronDown className="faq-item__chevron" />
                                </button>
                                <div className="faq-item__answer">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
