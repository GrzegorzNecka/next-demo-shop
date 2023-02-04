import type { NextApiHandler } from 'next/types';
import { createCheckout } from 'services/stripe/checkout/create-checkout';
import type { StripeCreateCheckout } from 'validations/stripe-checkout-create-schema';

const createCheckoutHandler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'POST': {
            try {
                const payload: StripeCreateCheckout = await JSON.parse(req.body);
                const session = await createCheckout(payload);

                if (!session?.url) {
                    return;
                }

                return res.status(201).json({ status: 'created', session });
                // res.status(200).json({ status: 'created', session });
            } catch (err) {
                return res.status(422).json({ status: 'not_created', err });
            }
        }
        default:
            return res.status(400);
    }
};

export default createCheckoutHandler;
