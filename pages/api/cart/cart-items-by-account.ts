import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { NextApiHandler } from 'next/types';

import { clearCartItemsMutation } from 'services/hygraph/cart-by-account/remove-all';
import { updateItemQuantityByCartIdMutation } from 'services/hygraph/cart-by-account/update-item';
import { getCartItemsByCartIdQuery } from 'services/hygraph/cart-by-account/get-all';
import { addItemOptionToCartByCartIdMutation } from 'services/hygraph/cart-by-account/create-item';
import { removeItemFromCartByCartIdMutation } from 'services/hygraph/cart-by-account/remove-item';
const handleCartSession: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session?.user.cartId) {
        res.status(400).json({ message: 'You should be logged' });
        return;
    }

    const cartId = session.user.cartId;

    if (req.method === 'GET') {
        const getCartItems = await getCartItemsByCartIdQuery({
            id: cartId,
        });

        if (getCartItems.networkStatus !== 7) {
            res.status(500);
        }

        res.status(200).json({ cart: getCartItems.data.cart });
        return;
    }

    if (req.method === 'POST') {
        //add new item
        const { productOptionId, quantity } = await JSON.parse(req.body);

        if (!productOptionId && !quantity) {
            res.status(400).json({ message: 'payload is required' });
            return;
        }

        const createCartItem = await addItemOptionToCartByCartIdMutation({
            cartId,
            quantity,
            productOptionId,
        });

        res.status(200).json({ cart: createCartItem.data?.updateCart });
        return;
    }

    if (req.method === 'PUT') {
        const { itemId, updatedQuantity: quantity } = await JSON.parse(req.body);

        if (!itemId && !quantity) {
            res.status(400).json({ message: 'payload is required' });
            return;
        }

        const updateCartItem = await updateItemQuantityByCartIdMutation({
            cartId,
            itemId,
            quantity,
        });

        res.status(200).json({ cart: updateCartItem.data?.updateCart });

        return;
    }

    if (req.method === 'DELETE') {
        const { itemId, quantity, setEmpty = false } = await JSON.parse(req.body);

        if (itemId && quantity) {
            if (quantity > 1) {
                //

                const increseCartItem = await updateItemQuantityByCartIdMutation({
                    cartId,
                    itemId,
                    quantity: quantity - 1,
                });

                res.status(200).json({ cart: increseCartItem.data?.updateCart });
                return;
            }

            const removeCartItem = await removeItemFromCartByCartIdMutation({
                cartId,
                itemId,
            });

            res.status(200).json({ cart: removeCartItem.data?.updateCart });
            return;
        }

        if (setEmpty) {
            //
            const removeAllCartItems = await clearCartItemsMutation({ cartId });

            res.status(200).json({ cart: removeAllCartItems.data?.updateCart });
            return;
        }

        res.status(400).json({ message: 'payload is required' });
        return;
    }

    res.status(400).json({ message: 'bad request body' });
    return;
};

export default handleCartSession;
