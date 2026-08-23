import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaArrowRight, FaCheckCircle, FaGraduationCap,
    FaHospital, FaBookOpen, FaAward, FaHandHoldingHeart,
    FaShieldAlt, FaClock, FaUsers, FaStar
} from 'react-icons/fa';
import './About.css';

export default function About() {
    const { t } = useTranslation();
    const milestones = t('about_milestones.items', { returnObjects: true });
    const credentials = t('founder.credentials', { returnObjects: true });
    const valueKeys = ['trust', 'professionalism', 'reactivity', 'safety'];
    const valueIcons = [FaHandHoldingHeart, FaStar, FaClock, FaShieldAlt];

    return (
        <>
            <Helmet>
                <title>{t('meta.about_title')}</title>
                <meta name="description" content={t('meta.about_desc')} />
            </Helmet>

            {/* Hero */}
            <section className="about-hero">
                <div className="container about-hero__grid">
                    <div className="about-hero__content animate-fadeInUp">
                        <h1>{t('about.title')}</h1>
                        <p>{t('about.mission_text')}</p>
                        <Link to="/request" className="btn btn--primary btn--lg">
                            {t('hero.cta_primary')} <FaArrowRight />
                        </Link>
                    </div>
                    <div className="about-hero__image animate-fadeIn">
                        <img src="/images/team-photo.png" alt={t('about.title')} />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaUsers /> {t('about.values_tag')}</span>
                        <h2 className="section__title">{t('about.values_title')}</h2>
                    </div>
                    <div className="grid-2 grid-2--lg">
                        {valueKeys.map((key, i) => {
                            const Icon = valueIcons[i];
                            return (
                                <div key={key} className="value-card card">
                                    <Icon className="value-card__icon" />
                                    <h3>{t(`about.values.${key}`)}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Vision + Network */}
            <section className="section section--alt">
                <div className="container">
                    <div className="about-split">
                        <div className="about-split__item card">
                            <h3>{t('about.vision_title')}</h3>
                            <p>{t('about.vision_text')}</p>
                        </div>
                        <div className="about-split__item card">
                            <h3>{t('about.network_title')}</h3>
                            <p>{t('about.network_text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Milestones */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaAward /> {t('about_milestones.tag')}</span>
                        <h2 className="section__title">{t('about_milestones.title')}</h2>
                        <p className="section__subtitle">{t('about_milestones.subtitle')}</p>
                    </div>
                    <div className="timeline">
                        {Array.isArray(milestones) && milestones.map((item, i) => (
                            <div key={i} className="timeline__item">
                                <span className="timeline__year">{item.year}</span>
                                <div className="timeline__content">
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaGraduationCap /> {t('founder.section_tag')}</span>
                        <h2 className="section__title">{t('founder.title')}</h2>
                    </div>
                    <div className="founder-card card">
                        <p className="founder-card__bio">{t('founder.bio')}</p>
                        <div className="founder-card__credentials">
                            {Array.isArray(credentials) && credentials.map((c, i) => {
                                const icons = [FaGraduationCap, FaHospital, FaBookOpen, FaAward];
                                const Icon = icons[i] || FaCheckCircle;
                                return (
                                    <div key={i} className="credential">
                                        <Icon className="credential__icon" />
                                        <div>
                                            <span className="credential__year">{c.year}</span>
                                            <strong>{c.title}</strong>
                                            <span className="credential__sub">{c.sub}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-section__inner">
                        <h2>{t('about_cta.title')}</h2>
                        <p>{t('about_cta.subtitle')}</p>
                        <Link to="/request" className="btn btn--white btn--lg">
                            {t('hero.cta_primary')} <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
