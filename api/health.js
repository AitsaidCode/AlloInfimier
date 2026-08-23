import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Ping Supabase to keep the free-tier database active (prevents inactivity pause)
        const { error } = await supabase
            .from('bookings')
            .select('id')
            .limit(1);

        if (error) {
            return res.status(500).json({
                status: 'error',
                database: 'disconnected',
                message: error.message,
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(200).json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            error: err.message,
            timestamp: new Date().toISOString(),
        });
    }
}
