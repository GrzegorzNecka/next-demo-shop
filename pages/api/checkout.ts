import type { NextApiHandler } from 'next/types';
import { createCheckout } from 'services/stripe/checkout/create';

export type CheckoutPayload = {
    products: {
        cartId: string;
        slug: string;
        productOptionId: string;
        quantity: number;
    }[];
    cartId: string;
};

const checkoutHandler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'POST': {
            try {
                const payload: CheckoutPayload = await JSON.parse(req.body);
                //todo - tu powinienm wysłać id Koszyka
                const session = await createCheckout(payload);

                if ('rejected' in session) {
                    const { rejected } = session;

                    res.status(rejected.status).json({ message: rejected.message });
                    return;
                }

                if (!session?.url) {
                    return;
                }

                // return res.redirect(303, session?.url);

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
