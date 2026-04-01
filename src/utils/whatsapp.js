/**
 * Shared WhatsApp message helper.
 * Used by WhatsAppButton, Contact page, and anywhere else a pre-filled
 * WhatsApp message is needed.
 */
export function getWhatsAppMessage(t) {
    return t('whatsapp_message');
}

export function getWhatsAppUrl(whatsappNumber, t) {
    const msg = encodeURIComponent(getWhatsAppMessage(t));
    return `https://wa.me/${whatsappNumber}?text=${msg}`;
}
