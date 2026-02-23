import Razorpay from 'razorpay';

export default async function handler(req, res) {
    // CORS Handling for local and production compatibility
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || "rzp_live_Wh4xEHePkQXqRO",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "555SgeR7nJYsI76SZ200lN8W",
        });

        const { amount, currency = "INR", receipt = `receipt_order_${Date.now()}` } = req.body;

        const options = {
            amount: amount * 100, // paise 
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);
        console.log(`[Vercel API] Created Razorpay Order: ${order.id}`);

        return res.status(200).json(order);
    } catch (error) {
        console.error("[Vercel API] Razorpay Order Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
