import type { NextApiHandler } from 'next/types';
import getCookieCartId from 'services/cookies/get-cookie-cart-id';

import updateCartItemByCookieId from 'services/hygraph/cart/by-cookie/update-item';
import type { CartItem } from 'context/types';
import getCartItemsByCookieId from 'services/hygraph/cart/by-cookie/get-all';

const handleCartSession: NextApiHandler = async (req, res) => {
    //--

    if (req.method === 'GET') {
        const cookieCartId = await getCookieCartId(req, res);

        const cartItems = await getCartItemsByCookieId(cookieCartId as string);

        res.status(200).json({
            cartItems,
        });

        return;
    }

    //--

    if (req.method === 'PUT') {
        type Payload = { id: string; product: CartItem };
        const { id, product }: Payload = await JSON.parse(req.body);

        if (!id && typeof id !== 'string') {
            res.status(400).json({ message: 'bad request body' });
            return;
        }

        const cartItems = await updateCartItemByCookieId(id, product);

        if (!cartItems) {
            res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(200).json({
            cartItems,
        });
        return;
    }

    res.status(400).json({ message: 'bad request method' });
    return;
};

export default handleCartSession;
