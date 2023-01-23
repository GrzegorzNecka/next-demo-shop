import type { NextApiHandler } from 'next/types';
import Stripe from 'stripe';
import { buffer } from 'micro';
import type { StripeWebhookEvents } from 'types/stripeEvents';

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripeWebhook: NextApiHandler = async (req, res) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        res.status(500).json({ message: 'no stripe secret key' });
        return;
    }
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
        res.status(500).json({ message: 'no endpoint stripe secret key' });
        return;
    }

    console.log(req.headers);
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    console.log('stripeKey', stripeKey);
    console.log('sig', sig);
    console.log('StripeEndpointWebhookSecret', endpointSecret);

    if (!stripeKey || !endpointSecret || !sig) {
        res.status(500).json({ message: 'Missing STRIPE_SECRET_KEY!' });
        return;
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });
    // const event = req.body as StripeWebhookEvents;

    try {
        const event = stripe.webhooks.constructEvent(
            buf,
            sig,
            endpointSecret,
        ) as StripeWebhookEvents;
        console.log('🚀 ~ file: stripe.ts:38 ~ conststripeWebhook:NextApiHandler= ~ event', event);

        switch (event.type) {
            case 'checkout.session.completed':
                console.log('heckout.session.completed -status', event.type);
                // @todo zaktualizuj zamówienie w GraphCms
                return;
            case 'checkout.session.async_payment_failed':
                console.log(
                    'checkout.session.async_payment_failed status',
                    event.data.object.status,
                );
                // @todo zaktualizuj zamówienie w GraphCms
                return;
            case 'checkout.session.async_payment_succeeded':
                console.log(
                    'checkout.session.async_payment_succeeded status',
                    event.data.object.status,
                );
                // @todo zaktualizuj zamówienie w GraphCms
                return;
        }

        res.json({ received: true });
    } catch (err) {
        let message = 'stripe webhook error';
        if (err instanceof Error) {
            message = err.message;
        }

        res.status(400).send(`Webhook Error: ${message}`);
    }
};

export default stripeWebhook;
