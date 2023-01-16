import type { NextApiHandler } from 'next/types';
import { createCheckout } from 'services/stripe/checkout/create';

export type CheckoutPayload = {
    slug: string;
    productOptionId: string;
    quantity: number;
}[];

const checkoutHandler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'POST': {
            try {
                const payload: CheckoutPayload = await JSON.parse(req.body);
                const session = await createCheckout(payload);

                res.status(200).json({ status: 'created', session });
                return;
            } catch (err) {
                res.status(422).json({ status: 'not_created', err });
                return;
            }
        }
        default:
            res.status(400);
            return;
    }
};

export default checkoutHandler;
