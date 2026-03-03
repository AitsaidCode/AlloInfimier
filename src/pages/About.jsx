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

const credentials = [
    {
        icon: <FaGraduationCap />,
        year: '2019',
        title_fr: 'Licence en Professions Infirmières et Techniques de Santé',
        title_en: 'Bachelor\'s in Nursing Professions and Health Techniques',
        title_ar: 'إجازة في مهن التمريض وتقنيات الصحة',
        sub_fr: 'ISPITS, Rabat',
        sub_en: 'ISPITS, Rabat',
        sub_ar: 'المعهد العالي للمهن التمريضية، الرباط',
    },
    {
        icon: <FaHospital />,
        year: '2020 – Présent',
        title_fr: 'Infirmier de Bloc Opératoire Central',
        title_en: 'Central Operating Room Nurse',
        title_ar: 'ممرض غرفة العمليات المركزية',
        sub_fr: 'Hôpital Ibn Sina, Rabat',
        sub_en: 'Ibn Sina Hospital, Rabat',
        sub_ar: 'مستشفى ابن سينا، الرباط',
    },
    {
        icon: <FaGraduationCap />,
        year: '2023',
        title_fr: 'Licence en Sciences de l\'Éducation',
        title_en: 'Bachelor\'s in Education Sciences',
        title_ar: 'إجازة في علوم التربية',
        sub_fr: 'Université de Lille 3, France',
        sub_en: 'University of Lille 3, France',
        sub_ar: 'جامعة ليل 3، فرنسا',
    },
    {
        icon: <FaUniversity />,
        year: '2025',
        title_fr: 'Master en Santé Publique & Informatique Biomédicale',
        title_en: 'MSc Public Health & Biomedical Informatics',
        title_ar: 'ماجستير في الصحة العامة والمعلوماتية الطبية الحيوية',
        sub_fr: 'Université Sorbonne, Paris',
        sub_en: 'Sorbonne University, Paris',
        sub_ar: 'جامعة السوربون، باريس',
    },
];

export default function About() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const milestones = t('about_milestones.items', { returnObjects: true });

    const getLang = (obj, field) => {
        return obj[`${field}_${lang}`] || obj[`${field}_fr`] || '';
    };

    return (
        <>
            <Helmet>
                <title>À propos – Allo Infirmier | Coordination de Soins à Domicile</title>
                <meta name="description" content="Découvrez Allo Infirmier, agence de coordination de soins infirmiers à domicile à Rabat et Salé. Notre mission, notre vision et nos valeurs." />
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
                                    alt={lang === 'ar' ? 'المؤسس' : 'Fondateur'}
                                    className="founder-photo"
                                    onError={(e) => { e.target.src = '/images/founder.svg'; }}
                                />
                                <div className="founder-photo-badge">
                                    <FaStethoscope />
                                    <span>{lang === 'ar' ? 'مؤسس' : lang === 'en' ? 'Founder' : 'Fondateur'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="founder-info">
                            <span className="section__tag">
                                {lang === 'ar' ? 'مؤسسنا' : lang === 'en' ? 'Our Founder' : 'Notre fondateur'}
                            </span>
                            <h2 className="founder-name">
                                {lang === 'ar' ? 'مؤسس Allo Infirmier' : lang === 'en' ? 'Founder of Allo Infirmier' : 'Fondateur d\'Allo Infirmier'}
                            </h2>
                            <p className="founder-bio">
                                {lang === 'ar'
                                    ? 'متخصص في التمريض ذو خبرة سريرية متقدمة في غرفة العمليات، وتكوين أكاديمي عالي المستوى في الصحة العامة والمعلوماتية الطبية الحيوية. يجمع بين الخبرة الميدانية في أكبر مستشفيات المغرب والمعرفة الدولية لتقديم خدمات تنسيق صحية متميزة.'
                                    : lang === 'en'
                                        ? 'A seasoned nursing professional with advanced clinical expertise in the operating room and a distinguished academic background in public health and biomedical informatics. Combining hands-on experience at Morocco\'s leading hospital with international academic excellence to deliver premier healthcare coordination services.'
                                        : 'Professionnel infirmier chevronné doté d\'une expertise clinique avancée en bloc opératoire et d\'un parcours académique distingué en santé publique et informatique biomédicale. Il conjugue une expérience terrain au sein du plus grand hôpital du Maroc et un savoir international pour fournir des services de coordination de soins d\'excellence.'}
                            </p>

                            <div className="founder-credentials">
                                {credentials.map((c, i) => (
                                    <div key={i} className="credential-item">
                                        <div className="credential-icon">{c.icon}</div>
                                        <div className="credential-body">
                                            <div className="credential-year">{c.year}</div>
                                            <div className="credential-title">{getLang(c, 'title')}</div>
                                            {c.sub_fr && (
                                                <div className="credential-sub">{getLang(c, 'sub')}</div>
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
                        <span className="section__tag">Nos valeurs</span>
                        <h2>Ce qui nous guide</h2>
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
                            <span className="section__tag">Notre réseau</span>
                            <h2>{t('about.network_title')}</h2>
                            <p>{t('about.network_text')}</p>

                            <div className="about-stats-row">
                                <div className="about-stat">
                                    <div className="about-stat__num">50+</div>
                                    <div className="about-stat__label">Infirmiers</div>
                                </div>
                                <div className="about-stat">
                                    <div className="about-stat__num">6</div>
                                    <div className="about-stat__label">Villes</div>
                                </div>
                                <div className="about-stat">
                                    <div className="about-stat__num">3</div>
                                    <div className="about-stat__label">Langues</div>
                                </div>
                            </div>
                        </div>
                        <div className="about-network-visual">
                            <div className="network-center">
                                <FaUsers />
                                <span>Allo Infirmier</span>
                            </div>
                            {['Rabat', 'Salé', 'Agdal', 'Hay Riad', 'Témara', 'Skhirat'].map((city, i) => (
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
                                <span className="badge badge--blue"><FaAward /> Infirmiers diplômés d'État</span>
                                <span className="badge badge--green"><FaShieldAlt /> Matériel stérile</span>
                                <span className="badge badge--blue"><FaGlobe /> Service multilingue</span>
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
