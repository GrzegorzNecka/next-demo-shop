import type { NextApiHandler } from 'next/types';
import type { StripeWebhookEvents } from 'types/stripeEvents';
import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripeKey = process.env.STRIPE_SECRET_KEY;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// const endpointSecret = 'whsec_34d50c687371f7d7dba4023a90fe5a8d2997d2587bce1d8b8759a1765d472fde';

const checkoutHandler: NextApiHandler = async (req, res) => {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event = req.body;

    if (!stripeKey || !endpointSecret || !sig) {
        res.status(500).json({ message: 'missing STRIPE_SECRET_KEY' });
        return;
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret) as StripeWebhookEvents;

        // https://stripe.com/docs/webhooks/quickstart
    } catch (err) {
        let message = 'stripe webhook error';
        if (err instanceof Error) {
            message = err.message;
        }
        res.status(400).send(`Webhook Error: ${message}`);
        return;
    }

    switch (event.type) {
        case `payment_intent.succeeded`:
            console.log(`event - payment_intent.succeeded`, event.data.object);
            console.log(`event processed ...`);
            break;
        // case 'checkout.session.completed':
        //     //todo 1 - zmieniam status orderu
        //     //todo 2 - generuję fakturę
        //     //todo 3 - wysyłam maila

        //     console.log('heckout.session.completed -status', event.data.object);
        //     console.log('🚀payment_intent', event.data.object.payment_intent);

        //     console.log('🚀event.data.object.id', event.data.object.id); // checkout.sessions.id
        //     console.log('🚀event.data.object.id', event.data.object.object); // ===  'checkout.session'

        //     break;
        // case 'checkout.session.async_payment_failed':
        //     console.log('checkout.session.async_payment_failed status', event.data.object.status);

        //     break;
        // case 'checkout.session.async_payment_succeeded':
        //     console.log('checkout.session.async_payment_succeeded status', event.data.object);
        //     // todo - jeśli status jest succeded to wtedy - zmieniamy status na graph cms ...
        //     // await finalice(cartId)
        //     // webhook zawsze musi działąć nie może się psuć -
        //     // @todo zaktualizuj zamówienie w GraphCms
        //     break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }

    res.status(200).json({ received: true });
    return;
};

export default checkoutHandler;
