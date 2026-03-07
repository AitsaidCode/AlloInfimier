import { Resend } from 'resend';
import { supabase } from './_lib/supabase.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
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

        // Insert into Supabase
        const { data, error } = await supabase
            .from('bookings')
            .insert([
                {
                    name,
                    phone,
                    email,
                    service,
                    address,
                    pref_time: pref_time || 'morning',
                    message: message || null,
                },
            ])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Failed to save booking', details: error.message });
        }

        // Send email notification via Resend (non-blocking)
        try {
            await resend.emails.send({
                from: 'Allo Infirmier <onboarding@resend.dev>',
                to: process.env.NOTIFICATION_EMAIL || 'contact@alloinfirmier.com',
                subject: `Nouvelle demande: ${service} — ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #0F2460, #1A56DB); padding: 24px; border-radius: 12px 12px 0 0;">
                            <h2 style="color: #fff; margin: 0;">🏥 Nouvelle demande de soin</h2>
                        </div>
                        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Nom</td><td style="padding: 8px 0; color: #111827;">${name}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Téléphone</td><td style="padding: 8px 0; color: #111827;"><a href="tel:${phone}" style="color: #1A56DB;">${phone}</a></td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #1A56DB;">${email}</a></td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Service</td><td style="padding: 8px 0; color: #111827;">${service}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Adresse</td><td style="padding: 8px 0; color: #111827;">${address}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Moment</td><td style="padding: 8px 0; color: #111827;">${pref_time || 'morning'}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Message</td><td style="padding: 8px 0; color: #111827;">${message || '—'}</td></tr>
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
