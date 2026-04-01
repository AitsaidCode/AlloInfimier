import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { WHATSAPP } from '../config';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
    const { t } = useTranslation();
    const url = getWhatsAppUrl(WHATSAPP, t);

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="WhatsApp"
            title="WhatsApp"
        >
            <FaWhatsapp size={28} />
            <span className="whatsapp-float__tooltip">WhatsApp</span>
        </a>
    );
}
