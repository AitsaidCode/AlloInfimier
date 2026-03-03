import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaBandAid, FaSyringe, FaHeartbeat, FaUserNurse, FaAmbulance, FaStar,
    FaArrowRight, FaCheckCircle, FaPhone, FaWhatsapp,
    FaGraduationCap, FaShieldAlt, FaClipboardCheck, FaChevronDown
} from 'react-icons/fa';
import './Services.css';
import { PHONE, WHATSAPP } from '../config';

const servicesData = [
    {
        key: 'wound',
        icon: <FaBandAid />,
        color: '#EF4444',
        price: '300',
        features_fr: ['Pansements simples et complexes', 'Soins de plaies chroniques', 'Ulcères et escarres', 'Suivi cicatrisation post-op'],
    },
    {
        key: 'injections',
        icon: <FaSyringe />,
        color: '#8B5CF6',
        price: '200',
        features_fr: ['Injections sous-cutanées', 'Injections intramusculaires', 'Perfusions intraveineuses', 'Prise de sang à domicile'],
    },
    {
        key: 'surgery',
        icon: <FaHeartbeat />,
        color: '#10B981',
        price: '400',
        features_fr: ['Surveillance post-opératoire', 'Changements de pansements', 'Gestion de la douleur', 'Coordination avec le chirurgien'],
    },
    {
        key: 'elderly',
        icon: <FaUserNurse />,
        color: '#F59E0B',
        price: '350',
        features_fr: ['Aide à la prise de médicaments', 'Surveillance des constantes', 'Soins d\'hygiène assistés', 'Prévention des chutes'],
    },
    {
        key: 'accompany',
        icon: <FaAmbulance />,
        color: '#06B6D4',
        price: '250',
        features_fr: ['Transport vers consultations', 'Accompagnement hospitalier', 'Soutien lors d\'examens', 'Traduction médicale'],
    },
    {
        key: 'concierge',
        icon: <FaStar />,
        color: '#1A56DB',
        price: '500',
        features_fr: ['Coordination multi-spécialistes', 'Prise de RDV médicaux', 'Gestion du dossier médical', 'Suivi personnalisé 24/7'],
    },
];

const guaranteeIcons = {
    certified: <FaGraduationCap />,
    sterile: <FaShieldAlt />,
    followup: <FaClipboardCheck />,
};

export default function Services() {
    const { t } = useTranslation();
    const guaranteeKeys = ['certified', 'sterile', 'followup'];
    const faqItems = t('services_faq.items', { returnObjects: true });
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <>
            <Helmet>
                <title>Services – Allo Infirmier | Soins à Domicile Rabat &amp; Salé</title>
                <meta name="description" content="Découvrez nos services de soins infirmiers à domicile à Rabat et Salé : pansements, injections, suivi post-op, soins seniors et conciergerie médicale." />
            </Helmet>

            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <span className="section__tag">{t('services.tag')}</span>
                    <h1>{t('services.title')}</h1>
                    <p>{t('services.subtitle')}</p>
                </div>
            </div>

            {/* Services Detail */}
            <section className="section">
                <div className="container">
                    <div className="services-detail-grid">
                        {servicesData.map((svc) => (
                            <div key={svc.key} className="svc-detail-card">
                                <div className="svc-detail-card__header" style={{ '--svc-color': svc.color }}>
                                    <div className="svc-detail-card__icon">{svc.icon}</div>
                                    <div>
                                        <h3 className="svc-detail-card__title">{t(`services.items.${svc.key}.title`)}</h3>
                                        <div className="svc-detail-card__price">
                                            à partir de <strong>{svc.price} MAD</strong>
                                        </div>
                                    </div>
                                </div>
                                <p className="svc-detail-card__desc">{t(`services.items.${svc.key}.desc`)}</p>
                                <ul className="svc-detail-card__features">
                                    {svc.features_fr.map((f, i) => (
                                        <li key={i}>
                                            <FaCheckCircle className="svc-feature-icon" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/request" className="btn btn--primary" style={{ width: '100%', marginTop: 'auto' }}>
                                    Demander ce service <FaArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="section section--alt">
                <div className="container">
                    <div className="trust-bar">
                        <div className="trust-bar__item">
                            <span className="trust-bar__num">50+</span>
                            <span className="trust-bar__label">Infirmiers diplômés</span>
                        </div>
                        <div className="trust-bar__divider" />
                        <div className="trust-bar__item">
                            <span className="trust-bar__num">&lt;2h</span>
                            <span className="trust-bar__label">Temps de réponse moyen</span>
                        </div>
                        <div className="trust-bar__divider" />
                        <div className="trust-bar__item">
                            <span className="trust-bar__num">7/7</span>
                            <span className="trust-bar__label">Jours disponibles</span>
                        </div>
                        <div className="trust-bar__divider" />
                        <div className="trust-bar__item">
                            <span className="trust-bar__num">FR·EN·AR</span>
                            <span className="trust-bar__label">Langues parlées</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Guarantee */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('services_guarantee.tag')}</span>
                        <h2 className="section__title">{t('services_guarantee.title')}</h2>
                        <p className="section__subtitle">{t('services_guarantee.subtitle')}</p>
                    </div>
                    <div className="guarantee-grid">
                        {guaranteeKeys.map((key) => (
                            <div key={key} className="guarantee-card">
                                <div className="guarantee-card__icon">{guaranteeIcons[key]}</div>
                                <h3 className="guarantee-card__title">{t(`services_guarantee.items.${key}.title`)}</h3>
                                <p className="guarantee-card__desc">{t(`services_guarantee.items.${key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services FAQ */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('services_faq.tag')}</span>
                        <h2 className="section__title">{t('services_faq.title')}</h2>
                        <p className="section__subtitle">{t('services_faq.subtitle')}</p>
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

            {/* CTA */}
            <section className="section">
                <div className="container services-cta">
                    <h2>{t('cta_banner.title')}</h2>
                    <p>{t('cta_banner.subtitle')}</p>
                    <div className="services-cta__btns">
                        <Link to="/request" className="btn btn--primary btn--lg">
                            {t('hero.cta_primary')}
                        </Link>
                        <a href={`tel:${PHONE}`} className="btn btn--outline btn--lg">
                            <FaPhone /> {t('hero.cta_secondary')}
                        </a>
                        <a
                            href={`https://wa.me/${WHATSAPP}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--whatsapp btn--lg"
                        >
                            <FaWhatsapp /> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
