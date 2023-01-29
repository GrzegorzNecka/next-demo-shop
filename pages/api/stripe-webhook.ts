import type { NextApiHandler } from 'next/types';
import type { StripeWebhookEvents } from 'types/stripeEvents';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateOrderPaymentStatusMutation,
    UpdateOrderPaymentStatusMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateOrderPaymentStatusDocument } from 'graphQL/generated/graphql';
import { updateOrderPaymentStatus } from 'services/hygraph/order/update-order-payment-status';

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
    } catch (err) {
        let message = 'stripe webhook error';
        if (err instanceof Error) {
            message = err.message;
        }
        res.status(400).send(`Webhook Error: ${message}`);
        return;
    }

    if (event.type === `payment_intent.succeeded`) {
        console.log(`event - payment_intent.succeeded`, event.data.object);
        console.log(`event processed ...`);

        const updatePaymentStatus = await updateOrderPaymentStatus({
            orderId: event.data.object.metadata.orderId,
            stripePaymentIntentStatus: event.data.object.status,
        });

        //todo 1 - zmieniam status orderu
        //todo 2 - generuję fakturę
        //todo 3 - wysyłam maila
    }

    if (event.type === `checkout.session.completed`) {
        console.log(`event - checkout.session.completed`, event.data.object);
    }

    if (event.type === `checkout.session.async_payment_failed`) {
        console.log(`checkout.session.async_payment_failed`, event.data.object);
    }

    // else  console.log(`Unhandled event type ${event.type}.`);

    res.status(200).json({ received: true });
    return;
};

export default checkoutHandler;
