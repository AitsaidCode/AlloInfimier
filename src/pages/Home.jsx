import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaPhone, FaWhatsapp, FaBandAid, FaSyringe, FaHeartbeat,
    FaUserNurse, FaAmbulance, FaStar, FaCheckCircle,
    FaArrowRight, FaShieldAlt, FaClock, FaMapMarkerAlt,
    FaChevronLeft, FaChevronRight, FaQuoteLeft
} from 'react-icons/fa';
import { useState, useRef } from 'react';
import FaqAccordion from '../components/FaqAccordion';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { PHONE, WHATSAPP } from '../config';
import './Home.css';

const serviceIcons = [FaBandAid, FaSyringe, FaHeartbeat, FaUserNurse, FaAmbulance, FaShieldAlt];
const serviceImages = [
    '/images/service-wound.png',
    '/images/service-injection.png',
    '/images/service-postop.png',
];

export default function Home() {
    const { t } = useTranslation();
    const waUrl = getWhatsAppUrl(WHATSAPP, t);
    const services = t('services_grid.items', { returnObjects: true });
    const testimonials = t('testimonials.items', { returnObjects: true });
    const faqItems = t('home_faq.items', { returnObjects: true });
    const areaKeys = ['rabat', 'agdal', 'sale', 'hayriad', 'temara', 'skhirat'];
    const carouselRef = useRef(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const scrollCarousel = (dir) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
        }
    };

    const carePathways = [
        { key: 'elderly', icon: FaUserNurse, color: '#E8F5E9' },
        { key: 'postop', icon: FaHeartbeat, color: '#FDE8E8' },
        { key: 'chronic', icon: FaShieldAlt, color: '#FFF3E0' },
        { key: 'hospital', icon: FaAmbulance, color: '#E3F2FD' },
    ];

    return (
        <>
            <Helmet>
                <title>{t('meta.home_title')}</title>
                <meta name="description" content={t('meta.home_desc')} />
            </Helmet>

            {/* ── HERO ─────────────────────────────────── */}
            <section className="hero">
                <div className="hero__watermark" aria-hidden="true">
                    <svg viewBox="0 0 300 300" fill="none">
                        <path d="M150 30 C70 30 30 100 30 150 C30 220 90 270 150 270 C210 270 270 220 270 150 C270 100 230 30 150 30Z" stroke="currentColor" strokeWidth="8" opacity="0.06" />
                        <circle cx="150" cy="120" r="30" stroke="currentColor" strokeWidth="6" opacity="0.04" />
                    </svg>
                </div>
                <div className="container hero__grid">
                    <div className="hero__content animate-fadeInUp">
                        <h1 className="hero__title">{t('hero.title')}</h1>
                        <p className="hero__subtitle">{t('hero.subtitle')}</p>

                        <div className="hero__option-cards">
                            <Link to="/request" className="option-card">
                                <div className="option-card__icon"><FaClock /></div>
                                <div>
                                    <strong>24/7</strong>
                                    <span>{t('hero.option_continuous')}</span>
                                </div>
                                <FaArrowRight className="option-card__arrow" />
                            </Link>
                            <Link to="/request" className="option-card option-card--accent">
                                <span className="option-card__badge">{t('hero.option_new')}</span>
                                <div className="option-card__icon"><FaClock /></div>
                                <div>
                                    <strong>+ 1h</strong>
                                    <span>{t('hero.option_punctual')}</span>
                                </div>
                                <FaArrowRight className="option-card__arrow" />
                            </Link>
                        </div>
                    </div>
                    <div className="hero__image animate-fadeIn">
                        <img src="/images/hero-nurse.png" alt={t('hero.title')} />
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ────────────────────────────── */}
            <section className="stats-bar">
                <div className="container">
                    <div className="stats-bar__grid">
                        <div className="stat-item">
                            <span className="stat-item__num">50+</span>
                            <span className="stat-item__label">{t('about.stats_nurses')}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-item__num">1500+</span>
                            <span className="stat-item__label">{t('home_stats.families')}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-item__num">6</span>
                            <span className="stat-item__label">{t('about.stats_cities')}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-item__num">24/7</span>
                            <span className="stat-item__label">{t('home_stats.available')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CARE PATHWAYS ────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <h2>
                            {t('care_pathways.title_start')}{' '}
                            <span className="text-accent">{t('care_pathways.title_accent')}</span>
                        </h2>
                        <p className="section__subtitle">{t('care_pathways.subtitle')}</p>
                    </div>
                    <div className="pathways-carousel" ref={carouselRef}>
                        {carePathways.map(({ key, icon: Icon, color }) => (
                            <div key={key} className="pathway-card" style={{ '--pw-bg': color }}>
                                <div className="pathway-card__img-wrap">
                                    <Icon size={48} />
                                </div>
                                <h3>{t(`care_pathways.${key}.title`)}</h3>
                                <p>{t(`care_pathways.${key}.desc`)}</p>
                                <Link to="/services" className="pathway-card__link">
                                    {t('care_pathways.discover')} <FaArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="pathways-nav">
                        <button onClick={() => scrollCarousel(-1)} aria-label="Previous"><FaChevronLeft /></button>
                        <button onClick={() => scrollCarousel(1)} aria-label="Next"><FaChevronRight /></button>
                    </div>
                </div>
            </section>

            {/* ── CALLBACK FORM ────────────────────────── */}
            <section className="callback-section">
                <div className="container">
                    <div className="callback__inner">
                        <h2>{t('callback.title')}</h2>
                        <p>{t('callback.subtitle')}</p>
                        <div className="callback__actions">
                            <Link to="/request" className="btn btn--white btn--lg">
                                {t('hero.cta_primary')} <FaArrowRight />
                            </Link>
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline-white btn--lg">
                                <FaWhatsapp /> {t('callback.whatsapp')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ─────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <h2>
                            {t('services_section.title_start')}{' '}
                            <span className="text-accent">{t('services_section.title_accent')}</span>
                        </h2>
                        <p className="section__subtitle">{t('services_section.subtitle')}</p>
                    </div>
                    <div className="grid-3">
                        {Array.isArray(services) && services.slice(0, 3).map((svc, i) => {
                            const Icon = serviceIcons[i] || FaCheckCircle;
                            return (
                                <div key={i} className="card card--img">
                                    <img src={serviceImages[i]} alt={svc.title} />
                                    <div className="card__body">
                                        <h3>{svc.title}</h3>
                                        <p>{svc.desc}</p>
                                        <Link to="/services" className="card__link">
                                            {t('care_pathways.discover')} <FaArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────── */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section__header">
                        <h2>
                            {t('testimonials.title_start')}{' '}
                            <span className="text-accent">{t('testimonials.title_accent')}</span>
                        </h2>
                    </div>
                    <div className="testimonials__carousel">
                        {Array.isArray(testimonials) && testimonials.map((item, i) => (
                            <div
                                key={i}
                                className={`testimonial-card${activeTestimonial === i ? ' testimonial-card--active' : ''}`}
                            >
                                <FaQuoteLeft className="testimonial-card__quote" />
                                <p>{item.text}</p>
                                <div className="testimonial-card__author">
                                    <div className="testimonial-card__stars">
                                        {[...Array(5)].map((_, j) => <FaStar key={j} />)}
                                    </div>
                                    <strong>{item.name}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="testimonials__dots">
                        {Array.isArray(testimonials) && testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`dot${activeTestimonial === i ? ' dot--active' : ''}`}
                                onClick={() => setActiveTestimonial(i)}
                                aria-label={`Testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COVERAGE ─────────────────────────────── */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaMapMarkerAlt /> {t('home_coverage.tag')}</span>
                        <h2 className="section__title">{t('home_coverage.title')}</h2>
                        <p className="section__subtitle">{t('home_coverage.subtitle')}</p>
                    </div>
                    <div className="grid-3">
                        {areaKeys.map(key => (
                            <div key={key} className="area-card">
                                <FaMapMarkerAlt className="area-card__icon" />
                                <h4>{t(`home_coverage.areas.${key}.name`)}</h4>
                                <p>{t(`home_coverage.areas.${key}.detail`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <h2 className="section__title">{t('home_faq.title')}</h2>
                        <p className="section__subtitle">{t('home_faq.subtitle')}</p>
                    </div>
                    <FaqAccordion items={faqItems} />
                </div>
            </section>

            {/* ── BOTTOM CTA ───────────────────────────── */}
            <section className="bottom-cta">
                <div className="container">
                    <div className="bottom-cta__inner">
                        <h2>{t('home_cta.title')}</h2>
                        <p>{t('home_cta.subtitle')}</p>
                        <div className="bottom-cta__actions">
                            <Link to="/request" className="btn btn--white btn--lg">
                                {t('hero.cta_primary')} <FaArrowRight />
                            </Link>
                            <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="btn btn--outline-white btn--lg">
                                <FaPhone /> {t('hero.cta_secondary')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
