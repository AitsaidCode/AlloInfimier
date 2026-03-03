import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaPhone, FaWhatsapp, FaBandAid, FaSyringe, FaHeartbeat,
    FaUserNurse, FaAmbulance, FaStar, FaNetworkWired,
    FaBolt, FaLanguage, FaHandsHelping, FaTag, FaCheckCircle,
    FaArrowRight, FaShieldAlt, FaUserMd, FaMapMarkerAlt, FaChevronDown
} from 'react-icons/fa';
import { PHONE, WHATSAPP } from '../config';
import './Home.css';

const serviceIcons = {
    wound: <FaBandAid />,
    injections: <FaSyringe />,
    surgery: <FaHeartbeat />,
    elderly: <FaUserNurse />,
    accompany: <FaAmbulance />,
    concierge: <FaStar />,
};

const whyIcons = {
    network: <FaNetworkWired />,
    response: <FaBolt />,
    multilingual: <FaLanguage />,
    coordination: <FaHandsHelping />,
    pricing: <FaTag />,
};

export default function Home() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const serviceKeys = ['wound', 'injections', 'surgery', 'elderly', 'accompany', 'concierge'];
    const whyKeys = ['network', 'response', 'multilingual', 'coordination', 'pricing'];
    const stepKeys = ['step1', 'step2', 'step3'];
    const areaKeys = ['rabat', 'sale', 'agdal', 'hayriad', 'temara', 'skhirat'];

    const testimonials = t('testimonials.items', { returnObjects: true });
    const faqItems = t('home_faq.items', { returnObjects: true });
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <>
            <Helmet>
                <title>Allo Infirmier – Soins Infirmiers à Domicile Rabat & Salé</title>
                <meta name="description" content="Allo Infirmier coordonne des soins infirmiers professionnels à domicile à Rabat et Salé. Rapide, fiable, multilingue." />
            </Helmet>

            {/* ── HERO ─────────────────────────────────────── */}
            <section className="hero">
                <div className="hero__bg-shapes" aria-hidden>
                    <div className="hero__shape hero__shape--1" />
                    <div className="hero__shape hero__shape--2" />
                    <div className="hero__shape hero__shape--3" />
                </div>

                <div className="container hero__content">
                    <div className="hero__text animate-fadeInUp">
                        <span className="section__tag hero__badge">
                            <span className="hero__badge-dot" />
                            {t('hero.badge')}
                        </span>
                        <h1 className="hero__title">{t('hero.title')}</h1>
                        <p className="hero__subtitle">{t('hero.subtitle')}</p>

                        <div className="hero__ctas">
                            <Link to="/request" className="btn btn--white btn--lg">
                                <FaUserMd />
                                {t('hero.cta_primary')}
                            </Link>
                            <a href={`tel:${PHONE}`} className="btn btn--outline-white btn--lg">
                                <FaPhone />
                                {t('hero.cta_secondary')}
                            </a>
                        </div>

                        <div className="hero__trust">
                            <div className="hero__trust-item">
                                <FaCheckCircle className="hero__trust-icon" />
                                <span>{t('hero.trust_certified')}</span>
                            </div>
                            <div className="hero__trust-item">
                                <FaCheckCircle className="hero__trust-icon" />
                                <span>{t('hero.trust_fast')}</span>
                            </div>
                            <div className="hero__trust-item">
                                <FaCheckCircle className="hero__trust-icon" />
                                <span>{t('hero.trust_multilingual')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero__stats animate-fadeIn">
                        <div className="hero__stat-card">
                            <div className="hero__stat-num">50+</div>
                            <div className="hero__stat-label">{t('hero.stats_nurses')}</div>
                        </div>
                        <div className="hero__stat-card">
                            <div className="hero__stat-num">6</div>
                            <div className="hero__stat-label">{t('hero.stats_cities')}</div>
                        </div>
                        <div className="hero__stat-card">
                            <div className="hero__stat-num">7/7</div>
                            <div className="hero__stat-label">{t('hero.stats_support')}</div>
                        </div>
                        <div className="hero__whatsapp-card">
                            <FaWhatsapp className="hero__wa-icon" />
                            <div>
                                <div className="hero__wa-label">WhatsApp</div>
                                <div className="hero__wa-sub">{t('hero.whatsapp_response')}</div>
                            </div>
                            <a
                                href={`https://wa.me/${WHATSAPP}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero__wa-btn"
                            >
                                <FaArrowRight />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="hero__wave" aria-hidden>
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
                        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-bg)" />
                    </svg>
                </div>
            </section>

            {/* ── SERVICES ─────────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('services.tag')}</span>
                        <h2 className="section__title">{t('services.title')}</h2>
                        <p className="section__subtitle">{t('services.subtitle')}</p>
                    </div>
                    <div className="services-grid">
                        {serviceKeys.map((key) => (
                            <Link to="/services" key={key} className="service-card">
                                <div className="service-card__icon">{serviceIcons[key]}</div>
                                <h3 className="service-card__title">{t(`services.items.${key}.title`)}</h3>
                                <p className="service-card__desc">{t(`services.items.${key}.desc`)}</p>
                                <div className="service-card__link">
                                    {t('services.cta')} <FaArrowRight size={12} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY US ───────────────────────────────────── */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('why.tag')}</span>
                        <h2 className="section__title">{t('why.title')}</h2>
                        <p className="section__subtitle">{t('why.subtitle')}</p>
                    </div>
                    <div className="why-grid">
                        {whyKeys.map((key) => (
                            <div key={key} className="why-card">
                                <div className="why-card__icon">{whyIcons[key]}</div>
                                <div className="why-card__body">
                                    <h4 className="why-card__title">{t(`why.items.${key}.title`)}</h4>
                                    <p className="why-card__desc">{t(`why.items.${key}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('how.tag')}</span>
                        <h2 className="section__title">{t('how.title')}</h2>
                        <p className="section__subtitle">{t('how.subtitle')}</p>
                    </div>
                    <div className="how-steps">
                        {stepKeys.map((key, i) => (
                            <div key={key} className="how-step">
                                <div className="how-step__num">{i + 1}</div>
                                {i < stepKeys.length - 1 && <div className="how-step__connector" />}
                                <div className="how-step__card">
                                    <h3 className="how-step__title">{t(`how.steps.${key}.title`)}</h3>
                                    <p className="how-step__desc">{t(`how.steps.${key}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="how-cta">
                        <Link to="/request" className="btn btn--primary btn--lg">
                            {t('hero.cta_primary')}
                        </Link>
                        <a
                            href={`https://wa.me/${WHATSAPP}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--whatsapp btn--lg"
                        >
                            <FaWhatsapp />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* ── COVERAGE AREAS ──────────────────────────── */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('home_coverage.tag')}</span>
                        <h2 className="section__title">{t('home_coverage.title')}</h2>
                        <p className="section__subtitle">{t('home_coverage.subtitle')}</p>
                    </div>
                    <div className="coverage-grid">
                        {areaKeys.map((key) => (
                            <div key={key} className="coverage-card">
                                <div className="coverage-card__icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="coverage-card__body">
                                    <h4 className="coverage-card__name">{t(`home_coverage.areas.${key}.name`)}</h4>
                                    <p className="coverage-card__desc">{t(`home_coverage.areas.${key}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────── */}
            <section className="section testimonials">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('testimonials.tag')}</span>
                        <h2 className="section__title">{t('testimonials.title')}</h2>
                        <p className="section__subtitle">{t('testimonials.subtitle')}</p>
                    </div>
                    <div className="testimonials-grid">
                        {Array.isArray(testimonials) && testimonials.map((item, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="testimonial-card__stars">
                                    {[...Array(5)].map((_, s) => <FaStar key={s} className="star-icon" />)}
                                </div>
                                <p className="testimonial-card__text">"{item.text}"</p>
                                <div className="testimonial-card__author">
                                    <div className="testimonial-card__avatar">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="testimonial-card__name">{item.name}</div>
                                        <div className="testimonial-card__role">{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('home_faq.tag')}</span>
                        <h2 className="section__title">{t('home_faq.title')}</h2>
                        <p className="section__subtitle">{t('home_faq.subtitle')}</p>
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

            {/* ── CTA BANNER ───────────────────────────────── */}
            <section className="cta-banner">
                <div className="container">
                    <div className="cta-banner__inner">
                        <div className="cta-banner__icon"><FaShieldAlt /></div>
                        <div className="cta-banner__text">
                            <h2>{t('cta_banner.title')}</h2>
                            <p>{t('cta_banner.subtitle')}</p>
                        </div>
                        <div className="cta-banner__actions">
                            <Link to="/request" className="btn btn--white btn--lg">
                                {t('hero.cta_primary')}
                            </Link>
                            <a href={`tel:${PHONE}`} className="btn btn--outline-white btn--lg">
                                <FaPhone /> {t('hero.cta_secondary')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
