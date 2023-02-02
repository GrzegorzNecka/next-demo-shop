import type { NextApiResponse } from 'next/types';
import type { NextApiRequestAuth } from 'middlewares/only-auth';
import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import updateItemQuantityByCartId from 'services/hygraph/cart/by-account/update-item';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import createCartItemByCartId from 'services/hygraph/cart/by-account/create-item';
import removeItemByCartId from 'services/hygraph/cart/by-account/remove-item';
import onlyAuth from 'middlewares/only-auth';

const handleCartActionsWithAccount = async (req: NextApiRequestAuth, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET': {
            try {
                const cartId = req.cartId;
                const cart = await getCartByCartId({
                    id: cartId,
                });

                return res.status(200).json({ cart });
            } catch (err) {
                return res.status(400).json({
                    message: 'Bad Request - verify that the cartId parameter exist',
                    err,
                });
            }
        }
        case 'POST': {
            try {
                const cartId = req.cartId;
                const { productOptionId, quantity } = await JSON.parse(req.body);

                if (!productOptionId && !quantity) {
                    return res.status(400).json({
                        message: 'Bad Request - verify that the payload has been attached',
                    });
                }

                const createCartItem = await createCartItemByCartId({
                    cartId,
                    quantity,
                    productOptionId,
                });

                return res.status(200).json({ cart: createCartItem.data?.updateCart });
            } catch (err) {
                return res.status(500).json({
                    status: 'Internal Server Error - problem comes from hygraph CMS',
                    err,
                });
            }
        }
        case 'PUT': {
            try {
                const cartId = req.cartId;
                const { itemId, updatedQuantity } = await JSON.parse(req.body);

                if (!itemId && !updatedQuantity) {
                    res.status(400).json({
                        message: 'Bad Request - verify that the payload has been attached',
                    });
                    return;
                }

                const updateCartItem = await updateItemQuantityByCartId({
                    cartId,
                    itemId,
                    quantity: updatedQuantity,
                });

                return res.status(200).json({ cart: updateCartItem.data?.updateCart });
            } catch (err) {
                return res.status(500).json({
                    status: 'Internal Server Error - problem comes from hygraph CMS',
                    err,
                });
            }
        }

        case 'DELETE': {
            const { setEmpty = false } = await JSON.parse(req.body);

            if (setEmpty === false) {
                try {
                    const cartId = req.cartId;
                    const { itemId } = await JSON.parse(req.body);

                    if (!itemId) {
                        return res.status(400).json({
                            message: 'Bad Request - verify that the payload has been attached',
                        });
                    }

                    const removeCartItem = await removeItemByCartId({
                        cartId,
                        itemId,
                    });

                    return res.status(200).json({ cart: removeCartItem.data?.updateCart });
                } catch (err) {
                    return res.status(500).json({
                        status: 'Internal Server Error - problem comes from hygraph CMS',
                        err,
                    });
                }
            }

            if (setEmpty === true) {
                try {
                    const cartId = req.cartId;
                    const removeAllCartItems = await clearCartByCartId({ cartId });

                    res.status(200).json({ cart: removeAllCartItems.data?.updateCart });
                    return;
                } catch (err) {
                    return res.status(500).json({
                        status: 'Internal Server Error - problem comes from hygraph CMS',
                        err,
                    });
                }
            }

            return res.status(400).json({
                status: 'Bad Request',
            });
        }
        default:
            return res.status(400).json({
                message: 'Bad Request',
            });
    }
};

export default onlyAuth(handleCartActionsWithAccount);
