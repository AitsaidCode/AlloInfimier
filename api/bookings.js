import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
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

        return res.status(201).json({ success: true, booking: data[0] });
    } catch (err) {
        console.error('API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
