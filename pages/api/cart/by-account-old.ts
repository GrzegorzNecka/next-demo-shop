import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { NextApiHandler, NextApiResponse } from 'next/types';

import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import updateItemQuantityByCartId from 'services/hygraph/cart/by-account/update-item';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import createCartItemByCartId from 'services/hygraph/cart/by-account/create-item';
import removeItemByCartId from 'services/hygraph/cart/by-account/remove-item';
import type { NextApiRequestAuth } from 'middlewares/onlyAuth';
import onlyAuth from 'middlewares/onlyAuth';

const handleCartSession = async (req: NextApiRequestAuth, res: NextApiResponse) => {
    const cartId = req.cartId;

    if (req.method === 'GET') {
        try {
            const cart = await getCartByCartId({
                id: cartId,
            });

            res.status(200).json({ cart });
            return;
        } catch (err) {
            res.status(400).json({
                message: 'Bad Request - verify that the cartId parameter exist',
                err,
            });
            return;
        }
    }

    if (req.method === 'POST') {
        //! zmień zapytania do hygraph tak żeby zwracała zdestrukturyzowane dane
        console.log('POST');
        try {
            const { productOptionId, quantity } = await JSON.parse(req.body);

            if (!productOptionId && !quantity) {
                res.status(400).json({ message: 'payload is required' });
                return;
            }

            const createCartItem = await createCartItemByCartId({
                cartId,
                quantity,
                productOptionId,
            });

            res.status(200).json({ cart: createCartItem.data?.updateCart });
            return;
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error - problem comes from hygraph CMS',
                err,
            });
            return;
        }
    }

    //--

    if (req.method === 'PUT') {
        const { itemId, updatedQuantity: quantity } = await JSON.parse(req.body);

        if (!itemId && !quantity) {
            res.status(400).json({ message: 'payload is required' });
            return;
        }

        const updateCartItem = await updateItemQuantityByCartId({
            cartId,
            itemId,
            quantity,
        });

        res.status(200).json({ cart: updateCartItem.data?.updateCart });

        return;
    }

    //--

    if (req.method === 'DELETE') {
        const { itemId, quantity, setEmpty = false } = await JSON.parse(req.body);

        if (itemId && quantity) {
            if (quantity > 1) {
                //

                const increseCartItem = await updateItemQuantityByCartId({
                    cartId,
                    itemId,
                    quantity: quantity - 1,
                });

                res.status(200).json({ cart: increseCartItem.data?.updateCart });
                return;
            }

            const removeCartItem = await removeItemByCartId({
                cartId,
                itemId,
            });

            res.status(200).json({ cart: removeCartItem.data?.updateCart });
            return;
        }

        if (setEmpty) {
            //
            const removeAllCartItems = await clearCartByCartId({ cartId });

            res.status(200).json({ cart: removeAllCartItems.data?.updateCart });
            return;
        }

        res.status(400).json({ message: 'payload is required' });
        return;
    }

    res.status(400).json({ message: 'bad request body' });
    return;
};

export default onlyAuth(handleCartSession);
