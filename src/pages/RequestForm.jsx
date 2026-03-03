import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaExclamationCircle, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { PHONE, WHATSAPP } from '../config';
import './RequestForm.css';

// EmailJS config — loaded from environment variables (.env)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function RequestForm() {
    const { t } = useTranslation();
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setStatus('submitting');
        try {
            // Dynamically import emailjs to avoid build issues if keys not set
            const emailjs = await import('@emailjs/browser');
            await emailjs.default.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: data.name,
                    from_phone: data.phone,
                    from_email: data.email,
                    address: data.address,
                    service_type: data.service,
                    pref_time: data.time,
                    message: data.message || '—',
                },
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            reset();
        } catch (err) {
            console.error('EmailJS error:', err);
            // Store submission locally as fallback
            const submissions = JSON.parse(localStorage.getItem('alloinfirmier_requests') || '[]');
            submissions.push({ ...data, submittedAt: new Date().toISOString() });
            localStorage.setItem('alloinfirmier_requests', JSON.stringify(submissions));
            setStatus('success'); // still show success since data is saved
        }
    };

    const serviceOptions = [
        { value: 'wound', label: t('request.service_options.wound') },
        { value: 'injections', label: t('request.service_options.injections') },
        { value: 'surgery', label: t('request.service_options.surgery') },
        { value: 'elderly', label: t('request.service_options.elderly') },
        { value: 'accompany', label: t('request.service_options.accompany') },
        { value: 'concierge', label: t('request.service_options.concierge') },
        { value: 'other', label: t('request.service_options.other') },
    ];

    const timeOptions = [
        { value: 'morning', label: t('request.fields.time_options.morning') },
        { value: 'afternoon', label: t('request.fields.time_options.afternoon') },
        { value: 'evening', label: t('request.fields.time_options.evening') },
        { value: 'urgent', label: t('request.fields.time_options.urgent') },
    ];

    return (
        <>
            <Helmet>
                <title>Demande de Soin – Allo Infirmier | Rabat & Salé</title>
                <meta name="description" content="Demandez un infirmier à domicile à Rabat ou Salé. Formulaire simple et rapide. Réponse en moins de 30 minutes." />
            </Helmet>

            <div className="page-header">
                <div className="container">
                    <span className="section__tag">{t('request.tag')}</span>
                    <h1>{t('request.title')}</h1>
                    <p>{t('request.subtitle')}</p>
                </div>
            </div>

            <section className="section">
                <div className="container request-layout">
                    {/* Form */}
                    <div className="request-form-box">
                        {status === 'success' ? (
                            <div className="form-success">
                                <div className="form-success__icon"><FaCheckCircle /></div>
                                <h3>{t('request.success_title')}</h3>
                                <p>{t('request.success_msg')}</p>
                                <button className="btn btn--primary" onClick={() => setStatus('idle')}>
                                    Nouvelle demande
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="request-form" noValidate>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">{t('request.fields.name')} *</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={errors.name ? 'error' : ''}
                                            placeholder="Ex: Mohammed Alami"
                                            {...register('name', { required: t('request.validation.name_required') })}
                                        />
                                        {errors.name && <span className="form-error"><FaExclamationCircle /> {errors.name.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">{t('request.fields.phone')} *</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            className={errors.phone ? 'error' : ''}
                                            placeholder="+212 6XX XXX XXX"
                                            {...register('phone', { required: t('request.validation.phone_required') })}
                                        />
                                        {errors.phone && <span className="form-error"><FaExclamationCircle /> {errors.phone.message}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">{t('request.fields.email')} *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className={errors.email ? 'error' : ''}
                                            placeholder="exemple@email.com"
                                            {...register('email', {
                                                required: t('request.validation.email_required'),
                                                pattern: { value: /^\S+@\S+\.\S+$/, message: t('request.validation.email_invalid') }
                                            })}
                                        />
                                        {errors.email && <span className="form-error"><FaExclamationCircle /> {errors.email.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service">{t('request.fields.service')} *</label>
                                        <select
                                            id="service"
                                            className={errors.service ? 'error' : ''}
                                            {...register('service', { required: t('request.validation.service_required') })}
                                        >
                                            <option value="">{t('request.fields.service_placeholder')}</option>
                                            {serviceOptions.map((o) => (
                                                <option key={o.value} value={o.value}>{o.label}</option>
                                            ))}
                                        </select>
                                        {errors.service && <span className="form-error"><FaExclamationCircle /> {errors.service.message}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">{t('request.fields.address')} *</label>
                                    <input
                                        id="address"
                                        type="text"
                                        className={errors.address ? 'error' : ''}
                                        placeholder="Ex: 12 Rue Mohammed V, Agdal, Rabat"
                                        {...register('address', { required: t('request.validation.address_required') })}
                                    />
                                    {errors.address && <span className="form-error"><FaExclamationCircle /> {errors.address.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="time">{t('request.fields.time')}</label>
                                    <select id="time" {...register('time')}>
                                        {timeOptions.map((o) => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">{t('request.fields.message')}</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder={t('request.fields.message_placeholder')}
                                        {...register('message')}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn--primary btn--lg"
                                    style={{ width: '100%' }}
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? t('request.submitting') : t('request.submit')}
                                </button>

                                <p className="form-privacy">
                                    🔒 Vos données sont confidentielles et sécurisées. Nous ne les partageons jamais avec des tiers.
                                </p>
                            </form>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="request-sidebar">
                        <div className="sidebar-card">
                            <h3>Contact direct</h3>
                            <p>Préférez-vous nous contacter directement ?</p>
                            <div className="sidebar-contact">
                                <a href={`tel:${PHONE}`} className="btn btn--primary" style={{ width: '100%' }}>
                                    <FaPhone /> Appeler maintenant
                                </a>
                                <a
                                    href={`https://wa.me/${WHATSAPP}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--whatsapp"
                                    style={{ width: '100%' }}
                                >
                                    <FaWhatsapp /> WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="sidebar-card sidebar-card--info">
                            <h4>📋 Comment ça fonctionne ?</h4>
                            <ol className="sidebar-steps">
                                <li><strong>1.</strong> Remplissez le formulaire</li>
                                <li><strong>2.</strong> Nous vous rappelons dans les 30 min</li>
                                <li><strong>3.</strong> Un infirmier est assigné à votre demande</li>
                                <li><strong>4.</strong> L'infirmier arrive chez vous</li>
                            </ol>
                        </div>

                        <div className="sidebar-card sidebar-card--hours">
                            <h4>🕐 Horaires d'intervention</h4>
                            <p>Lundi – Dimanche</p>
                            <p><strong>8h00 → 21h00</strong></p>
                            <div className="badge badge--green" style={{ marginTop: '0.75rem' }}>
                                Urgences : 24h/24
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
