import type { NextApiHandler } from 'next/types';
import type { StripeWebhookEvents } from 'types/stripeEvents';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { finalizeCheckout } from 'services/stripe/checkout/finalize-checkout';
import { startPayment } from 'services/stripe/payment-intent/start-payment';
import { stripeClient } from 'utils/stripe-client';

/**
 *
 * docs: https://stripe.com/docs/webhooks/quickstart
 * create webhook: https://dashboard.stripe.com/test/webhooks/create
 * type of events: https://stripe.com/docs/api/events/types
 *
 *  - PaymentIntent:
 *      - payment_intent.created - Occurs when a new PaymentIntent is created.
 *      - payment_intent.succeeded - Occurs when a PaymentIntent has successfully completed payment.
 *      - payment_intent.canceled  -
 *      - payment_intent.payment_failed - Occurs when a PaymentIntent has failed the attempt to create a payment method or a payment.
 *
 *  - CheckoutSession:
 *      - checkout.session.async_payment_succeeded - Occurs when a payment intent using a delayed payment method finally succeeds.
 *      - checkout.session.async_payment_failed - Occurs when a payment intent using a delayed payment method fails.
 *      - checkout.session.completed - Occurs when a Checkout Session has been successfully completed.
 *      - checkout.session.expired - Occurs when a Checkout Session is expired.
 *
 */

export const config = {
    api: {
        bodyParser: false,
    },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler: NextApiHandler = async (req, res) => {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event: StripeWebhookEvents = req.body;

    if (!endpointSecret || !sig) {
        res.status(500).json({ message: 'missing STRIPE_ENDPOINT_SECRET_KEY' });
        return;
    }

    const stripe = await stripeClient();

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

    /**
     *
     *  Execution
     *
     */

    if (event.type === `payment_intent.created`) {
        console.log(`event - payment_intent.created `, event.data.object);
        console.log('event - payment_intent.created,', event.data.object.status);

        const start = await startPayment({
            cartId: event.data.object.metadata.cartId,
            orderId: event.data.object.metadata.orderId,
            stripePaymentIntentStatus: event.data.object.status,
        });

        /**
         *
         * @todo: wygeneruj fakturę
         * @todo: wyślij mail
         *
         */
    }

    if (event.type === `payment_intent.succeeded`) {
        console.log(`event - payment_intent.succeeded`, event.data.object);
        console.log('event - payment_intent.succeeded,', event.data.object.status);

        const finalize = await finalizeCheckout({
            orderId: event.data.object.metadata.orderId,
            stripePaymentIntentStatus: event.data.object.status,
        });

        /**
         *
         * @todo: wygeneruj list przewozowy
         * @todo: wyślij mail
         *
         */
    }

    if (event.type === `payment_intent.payment_failed`) {
        console.log(`event - payment_intent.payment_failed`, event.data.object);
        console.log(`event processed ...`);

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
         * @todo: przywróć towar na sklep
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
         * @todo: wyślij mail o możliwości ponowienia płatności
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
