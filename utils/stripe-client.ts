import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

export async function stripeClient() {
    if (!stripeKey) {
        throw new Error('missing stripe secret key');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    return stripe;
}
