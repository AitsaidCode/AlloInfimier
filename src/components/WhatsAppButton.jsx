import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { WHATSAPP } from '../config';
import './WhatsAppButton.css';
const getMessage = (lang) => {
    if (lang === 'ar') return 'مرحبا، أريد الاستفسار عن خدمات Allo Infirmier';
    if (lang === 'en') return 'Hello, I would like to inquire about Allo Infirmier services';
    return 'Bonjour, je souhaite me renseigner sur les services Allo Infirmier';
};

export default function WhatsAppButton() {
    const { i18n } = useTranslation();
    const msg = encodeURIComponent(getMessage(i18n.language));
    const url = `https://wa.me/${WHATSAPP}?text=${msg}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="WhatsApp"
            title="Contactez-nous sur WhatsApp"
        >
            <FaWhatsapp size={28} />
            <span className="whatsapp-float__tooltip">WhatsApp</span>
        </a>
    );
}
