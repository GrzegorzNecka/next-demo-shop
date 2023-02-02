import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import updateItemQuantityByCartId from 'services/hygraph/cart/by-account/update-item';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import createCartItemByCartId from 'services/hygraph/cart/by-account/create-item';
import removeItemByCartId from 'services/hygraph/cart/by-account/remove-item';
import type { NextApiRequestAuth } from 'middlewares/onlyAuth';
import onlyAuth from 'middlewares/onlyAuth';

const handleCartSession = async (req: NextApiRequestAuth, res: NextApiResponse) => {
    const cartId = req.cartId;

    switch (req.method) {
        case 'GET': {
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
        case 'POST': {
            console.log('POST');
            try {
                const { productOptionId, quantity } = await JSON.parse(req.body);

                if (!productOptionId && !quantity) {
                    res.status(400).json({
                        message: 'Bad Request - verify that the payload has been attached',
                    });
                    return;
                }

                const createCartItem = await createCartItemByCartId({
                    cartId,
                    quantity,
                    productOptionId,
                });

                console.log(
                    '🚀 ~ file: by-account.ts:49 ~ handleCartSession ~ createCartItem',
                    createCartItem,
                );

                res.status(201).json({ cart: createCartItem.data?.updateCart });
                return;
            } catch (err) {
                res.status(500).json({
                    status: 'Internal Server Error - problem comes from hygraph CMS',
                    err,
                });
                return;
            }
        }
        case 'PUT': {
            try {
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

                res.status(200).json({ cart: updateCartItem.data?.updateCart });

                return;
            } catch (err) {
                res.status(422).json({
                    status: 'Internal Server Error - problem comes from hygraph CMS',
                    err,
                });
                return;
            }
        }
        case 'DELETE': {
            //! REST -  te metody powinny być chyba z metody PUT
            try {
                const { itemId, quantity, setEmpty = false } = await JSON.parse(req.body);

                if (itemId && quantity) {
                    if (quantity > 1) {
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

                //! REST -  wydaje mi się że tylko to powinno być z metody DELETE

                if (setEmpty) {
                    const removeAllCartItems = await clearCartByCartId({ cartId });

                    res.status(200).json({ cart: removeAllCartItems.data?.updateCart });
                    return;
                }

                res.status(400).json({
                    message: 'Bad Request - verify that the payload has been attached',
                });

                return;
            } catch (err) {
                res.status(422).json({
                    status: 'Internal Server Error - problem comes from hygraph CMS',
                    err,
                });
                return;
            }
        }
        default:
            res.status(400);
            return;
    }
    console.log("🚀 ~ file: by-account.ts:145 ~ handleCartSession ~ 'POST'", 'POST');
    console.log("🚀 ~ file: by-account.ts:145 ~ handleCartSession ~ 'POST'", 'POST');
};

export default onlyAuth(handleCartSession);
