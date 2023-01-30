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
import { finalizeCheckout } from 'services/stripe/checkout/finalize-checkout';

/**
 *
 * docs: https://stripe.com/docs/webhooks/quickstart
 * create webhook: https://dashboard.stripe.com/test/webhooks/create
 *
 */

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripeKey = process.env.STRIPE_SECRET_KEY;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler: NextApiHandler = async (req, res) => {
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

        const finalize = finalizeCheckout({
            cartId: event.data.object.metadata.cartId,
            orderId: event.data.object.metadata.orderId,
            stripePaymentIntentStatus: event.data.object.status,
        });

        /**
         *
         * @todo: zmień status order
         * @todo: wygeneruj fakturę
         * @todo: wyślij mail
         *
         */
    }

    if (event.type === `checkout.session.async_payment_succeeded`) {
        /**
         *
         * @todo: zmień status order
         * @todo: wyślij mail
         *
         */
        console.log(`checkout.session.async_payment_succeeded`, event.data.object);
    }

    if (event.type === `checkout.session.async_payment_failed`) {
        /**
         *
         * @todo: zmień status order
         * @todo: wyślij mail
         *
         */
        console.log(`checkout.session.async_payment_failed`, event.data.object);
    }

    if (event.type === `checkout.session.completed`) {
        /**
         *
         * @todo: zmień status order
         * @todo: wyślij mail
         *
         */
        console.log(`event - checkout.session.completed`, event.data.object);
    }

    if (event.type === `checkout.session.async_payment_failed`) {
        /**
         *
         * @todo: zmień status order
         * @todo: wyślij mail
         *
         */
        console.log(`checkout.session.async_payment_failed`, event.data.object);
    }

    /**
     *
     * @todo: ze statusów zrób tuple i jeśli żaden waunek
     *        nie będzie spełniony => console.log(`Unhandled event type ${event.type}.`)
     *
     */

    res.status(200).json({ received: true });
    return;
};

export default webhookHandler;
