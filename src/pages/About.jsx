import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaHandshake, FaEye, FaUsers, FaShieldAlt,
    FaAward, FaClock, FaGlobe, FaHeart,
    FaGraduationCap, FaHospital, FaUniversity, FaStethoscope,
    FaPhone, FaRocket
} from 'react-icons/fa';
import { PHONE } from '../config';
import './About.css';

const values = [
    { icon: <FaHandshake />, key: 'trust', color: '#1A56DB' },
    { icon: <FaAward />, key: 'professionalism', color: '#8B5CF6' },
    { icon: <FaClock />, key: 'reactivity', color: '#06B6D4' },
    { icon: <FaShieldAlt />, key: 'safety', color: '#10B981' },
];

const credentialIcons = [
    <FaGraduationCap />,
    <FaHospital />,
    <FaGraduationCap />,
    <FaUniversity />,
];

export default function About() {
    const { t } = useTranslation();
    const milestones = t('about_milestones.items', { returnObjects: true });
    const credentials = t('founder.credentials', { returnObjects: true });
    const coverageCities = t('home_coverage.areas', { returnObjects: true });
    const cityNames = coverageCities ? Object.values(coverageCities).map(c => c.name) : ['Rabat', 'Salé', 'Agdal', 'Hay Riad', 'Témara', 'Skhirat'];

    return (
        <>
            <Helmet>
                <title>{t('meta.about_title')}</title>
                <meta name="description" content={t('meta.about_desc')} />
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <span className="section__tag">{t('about.tag')}</span>
                    <h1>{t('about.title')}</h1>
                    <p>{t('about.subtitle')}</p>
                </div>
            </div>

            {/* Founder Profile */}
            <section className="section founder-section">
                <div className="container">
                    <div className="founder-grid">
                        <div className="founder-photo-col">
                            <div className="founder-photo-wrapper">
                                <img
                                    src="/images/founder.jpg"
                                    alt={t('founder.alt')}
                                    className="founder-photo"
                                    onError={(e) => { e.target.src = '/images/founder.svg'; }}
                                />
                                <div className="founder-photo-badge">
                                    <FaStethoscope />
                                    <span>{t('founder.badge')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="founder-info">
                            <span className="section__tag">
                                {t('founder.section_tag')}
                            </span>
                            <h2 className="founder-name">
                                {t('founder.title')}
                            </h2>
                            <p className="founder-bio">
                                {t('founder.bio')}
                            </p>

                            <div className="founder-credentials">
                                {Array.isArray(credentials) && credentials.map((c, i) => (
                                    <div key={i} className="credential-item">
                                        <div className="credential-icon">{credentialIcons[i] || <FaGraduationCap />}</div>
                                        <div className="credential-body">
                                            <div className="credential-year">{c.year}</div>
                                            <div className="credential-title">{c.title}</div>
                                            {c.sub && (
                                                <div className="credential-sub">{c.sub}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section">
                <div className="container">
                    <div className="about-mv-grid">
                        <div className="about-mv-card about-mv-card--mission">
                            <div className="about-mv-card__icon"><FaHeart /></div>
                            <h2>{t('about.mission_title')}</h2>
                            <p>{t('about.mission_text')}</p>
                        </div>
                        <div className="about-mv-card about-mv-card--vision">
                            <div className="about-mv-card__icon"><FaEye /></div>
                            <h2>{t('about.vision_title')}</h2>
                            <p>{t('about.vision_text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('about.values_tag')}</span>
                        <h2>{t('about.values_title')}</h2>
                    </div>
                    <div className="values-grid">
                        {values.map(({ icon, key, color }) => (
                            <div key={key} className="value-card" style={{ '--val-color': color }}>
                                <div className="value-card__icon">{icon}</div>
                                <h3>{t(`about.values.${key}`)}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Network */}
            <section className="section">
                <div className="container">
                    <div className="about-detail-grid">
                        <div className="about-detail-text">
                            <span className="section__tag">{t('about.network_tag')}</span>
                            <h2>{t('about.network_title')}</h2>
                            <p>{t('about.network_text')}</p>

                            <div className="about-stats-row">
                                <div className="about-stat">
                                    <div className="about-stat__num">50+</div>
                                    <div className="about-stat__label">{t('about.stats_nurses')}</div>
                                </div>
                                <div className="about-stat">
                                    <div className="about-stat__num">6</div>
                                    <div className="about-stat__label">{t('about.stats_cities')}</div>
                                </div>
                                <div className="about-stat">
                                    <div className="about-stat__num">3</div>
                                    <div className="about-stat__label">{t('about.stats_languages')}</div>
                                </div>
                            </div>
                        </div>
                        <div className="about-network-visual">
                            <div className="network-center">
                                <FaUsers />
                                <span>Allo Infirmier</span>
                            </div>
                            {cityNames.map((city, i) => (
                                <div
                                    key={city}
                                    className="network-city"
                                    style={{ '--i': i, '--total': 6 }}
                                >
                                    {city}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality */}
            <section className="section section--alt">
                <div className="container">
                    <div className="about-quality">
                        <div className="about-quality__icon"><FaShieldAlt /></div>
                        <div>
                            <h2>{t('about.quality_title')}</h2>
                            <p>{t('about.quality_text')}</p>
                            <div className="quality-badges">
                                <span className="badge badge--blue"><FaAward /> {t('about.quality_badge_certified')}</span>
                                <span className="badge badge--green"><FaShieldAlt /> {t('about.quality_badge_sterile')}</span>
                                <span className="badge badge--blue"><FaGlobe /> {t('about.quality_badge_multilingual')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Milestones */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag">{t('about_milestones.tag')}</span>
                        <h2 className="section__title">{t('about_milestones.title')}</h2>
                        <p className="section__subtitle">{t('about_milestones.subtitle')}</p>
                    </div>
                    <div className="milestones-timeline">
                        {Array.isArray(milestones) && milestones.map((m, i) => (
                            <div key={i} className="milestone-item">
                                <div className="milestone-item__marker">
                                    <div className="milestone-item__dot" />
                                    {i < milestones.length - 1 && <div className="milestone-item__line" />}
                                </div>
                                <div className="milestone-item__card">
                                    <span className="milestone-item__year">{m.year}</span>
                                    <h3 className="milestone-item__title">{m.title}</h3>
                                    <p className="milestone-item__desc">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About CTA */}
            <section className="about-cta-banner">
                <div className="container">
                    <div className="about-cta-banner__inner">
                        <div className="about-cta-banner__icon"><FaRocket /></div>
                        <h2>{t('about_cta.title')}</h2>
                        <p>{t('about_cta.subtitle')}</p>
                        <div className="about-cta-banner__actions">
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
