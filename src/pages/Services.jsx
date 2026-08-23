import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
    FaBandAid, FaSyringe, FaHeartbeat, FaUserNurse,
    FaAmbulance, FaShieldAlt, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';
import FaqAccordion from '../components/FaqAccordion';
import './Services.css';

const serviceKeys = ['wound', 'injections', 'surgery', 'elderly', 'accompany', 'concierge'];
const serviceIcons = [FaBandAid, FaSyringe, FaHeartbeat, FaUserNurse, FaAmbulance, FaShieldAlt];
const serviceColors = ['#E3F2FD', '#FDE8E8', '#E8F5E9', '#FFF8E1', '#F3E5F5', '#E0F7FA'];

export default function Services() {
    const { t } = useTranslation();
    const faqItems = t('services_faq.items', { returnObjects: true });
    const guaranteeKeys = ['certified', 'sterile', 'followup'];

    return (
        <>
            <Helmet>
                <title>{t('meta.services_title')}</title>
                <meta name="description" content={t('meta.services_desc')} />
            </Helmet>

            {/* Header */}
            <div className="page-header">
                <div className="container">
                    <h1>
                        {t('services_section.title_start')}{' '}
                        <span className="text-accent">{t('services_section.title_accent')}</span>
                    </h1>
                    <p>{t('services_section.subtitle')}</p>
                </div>
            </div>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    <div className="services-grid">
                        {serviceKeys.map((key, i) => {
                            const Icon = serviceIcons[i];
                            return (
                                <div key={key} className="service-card card">
                                    <div className="service-card__icon" style={{ background: serviceColors[i] }}>
                                        <Icon size={28} />
                                    </div>
                                    <h3>{t(`services.items.${key}.title`)}</h3>
                                    <p>{t(`services.items.${key}.desc`)}</p>
                                    <ul className="service-card__features">
                                        {(t(`services.items.${key}.features`, { returnObjects: true }) || []).map((f, j) => (
                                            <li key={j}><FaCheckCircle /> {f}</li>
                                        ))}
                                    </ul>
                                    <Link to="/request" className="btn btn--primary btn--sm service-card__cta">
                                        {t('services.request_service')} <FaArrowRight />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Guarantee Badges */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header">
                        <span className="section__tag"><FaShieldAlt /> {t('services_guarantee.tag')}</span>
                        <h2 className="section__title">{t('services_guarantee.title')}</h2>
                        <p className="section__subtitle">{t('services_guarantee.subtitle')}</p>
                    </div>
                    <div className="grid-3">
                        {guaranteeKeys.map(key => (
                            <div key={key} className="guarantee-card card">
                                <FaCheckCircle className="guarantee-card__icon" />
                                <h3>{t(`services_guarantee.items.${key}.title`)}</h3>
                                <p>{t(`services_guarantee.items.${key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section">
                <div className="container">
                    <div className="section__header">
                        <h2 className="section__title">{t('services_faq.title')}</h2>
                        <p className="section__subtitle">{t('services_faq.subtitle')}</p>
                    </div>
                    <FaqAccordion items={faqItems} />
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-section__inner">
                        <h2>{t('home_cta.title')}</h2>
                        <p>{t('home_cta.subtitle')}</p>
                        <Link to="/request" className="btn btn--white btn--lg">
                            {t('hero.cta_primary')} <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
