import type { NextApiHandler } from 'next';
import type { StripeWebhookEvents } from 'types/stripeEvents';
// https://7142-176-111-121-143.ngrok.iongrok
// ngrok http 3000

const signingSecret = `whsec_34d50c687371f7d7dba4023a90fe5a8d2997d2587bce1d8b8759a1765d472fde`;

export const stripeTestWebhook: NextApiHandler = (req, res) => {
    // todod - verify signing secret

    const event = req.body as StripeWebhookEvents;

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            event.data.object.id;

            console.log('event.data.object', event.data.object);

            // zaktualizuj zamówienie w graphcms
            return;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }

    res.status(204).end();
};

export default stripeTestWebhook;
