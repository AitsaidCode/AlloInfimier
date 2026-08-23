import { Resend } from 'resend';
import { supabase } from './_lib/supabase.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Simple in-memory rate limiter ─────────────────────────
const rateMap = new Map();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;         // max 5 requests per IP per minute

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateMap.get(ip);
    if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
        rateMap.set(ip, { start: now, count: 1 });
        return false;
    }
    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) return true;
    return false;
}

// ── HTML-escape helper (XSS prevention in emails) ────────
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ── Allowed origins ───────────────────────────────────────
const ALLOWED_ORIGINS = [
    'https://alloinfimier.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
];

function getAllowedOrigin(req) {
    const origin = req.headers?.origin || '';
    if (ALLOWED_ORIGINS.includes(origin)) return origin;
    return ALLOWED_ORIGINS[0]; // default to production
}

export default async function handler(req, res) {
    const origin = getAllowedOrigin(req);
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
        || req.socket?.remoteAddress
        || 'unknown';
    if (isRateLimited(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    try {
        const { name, phone, email, service, address, pref_time, message } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !service || !address) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['name', 'phone', 'email', 'service', 'address'],
            });
        }

        // Validate phone format (Moroccan numbers)
        const phoneClean = phone.replace(/[\s\-().]/g, '');
        if (!/^(\+?212|0)[5-7]\d{8}$/.test(phoneClean)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('bookings')
            .insert([
                {
                    name: name.trim(),
                    phone: phoneClean,
                    email: email.trim().toLowerCase(),
                    service,
                    address: address.trim(),
                    pref_time: pref_time || 'morning',
                    message: message?.trim() || null,
                },
            ])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Failed to save booking', details: error.message });
        }

        // Send email notification via Resend (non-blocking)
        const safeName = escapeHtml(name);
        const safePhone = escapeHtml(phone);
        const safeEmail = escapeHtml(email);
        const safeService = escapeHtml(service);
        const safeAddress = escapeHtml(address);
        const safePrefTime = escapeHtml(pref_time || 'morning');
        const safeMessage = escapeHtml(message) || '—';

        try {
            await resend.emails.send({
                from: 'Allo Infirmier <onboarding@resend.dev>',
                to: process.env.NOTIFICATION_EMAIL || 'aitsaid.hicham.98@gmail.com',
                subject: `Nouvelle demande: ${safeService} — ${safeName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #0F2460, #1A56DB); padding: 24px; border-radius: 12px 12px 0 0;">
                            <h2 style="color: #fff; margin: 0;">🏥 Nouvelle demande de soin</h2>
                        </div>
                        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Nom</td><td style="padding: 8px 0; color: #111827;">${safeName}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Téléphone</td><td style="padding: 8px 0; color: #111827;"><a href="tel:${safePhone}" style="color: #1A56DB;">${safePhone}</a></td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${safeEmail}" style="color: #1A56DB;">${safeEmail}</a></td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Service</td><td style="padding: 8px 0; color: #111827;">${safeService}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Adresse</td><td style="padding: 8px 0; color: #111827;">${safeAddress}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Moment</td><td style="padding: 8px 0; color: #111827;">${safePrefTime}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Message</td><td style="padding: 8px 0; color: #111827;">${safeMessage}</td></tr>
                            </table>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                                Allo Infirmier — Coordination de soins à domicile
                            </p>
                        </div>
                    </div>
                `,
            });
        } catch (emailErr) {
            console.error('Resend email error:', emailErr);
            // Non-blocking — booking is already saved in Supabase
        }

        return res.status(201).json({ success: true, booking: data[0] });
    } catch (err) {
        console.error('API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
