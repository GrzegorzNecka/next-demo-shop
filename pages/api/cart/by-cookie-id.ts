import type { NextApiHandler } from 'next/types';
import createCookieCartId from 'services/cookies/create-cart-id';
import { hasCookie } from 'cookies-next';
import isCartIdExist from 'services/hygraph/cart/by-cookie/is-cart-id-exist';
import deleteCookieCartId from 'services/cookies/delete-cart-id';
import getCookieCartId from 'services/cookies/get-cart-id';
import getCartItemsByCookieId from 'services/hygraph/cart/by-cookie/get-cart';
import updateCartItemByCookieId from 'services/hygraph/cart/by-cookie/update-item';

const handleCartActionsWithCookie: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET': {
            try {
                if (typeof process.env.NEXT_PUBLIC_COOKIE_CART_ID === 'undefined') {
                    return res.status(400).json({
                        message: 'forgot NEXT_PUBLIC_COOKIE_CART_ID',
                    });
                }

                /**
                 * Is ID of cookie exist on cookies storage ?
                 */

                const isCookie = hasCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, {
                    req,
                    res,
                });

                if (!isCookie) {
                    return res.status(400).json({
                        message: 'forgot COOKIE_CART_ID',
                    });
                }

                /**
                 * Is ID of cookie exist on hygraph ?
                 */

                let cookieCartId = await getCookieCartId(req, res);

                const isExist = await isCartIdExist(cookieCartId as string);

                if (!isExist) {
                    await deleteCookieCartId(req, res);
                    await createCookieCartId(req, res);
                    cookieCartId = await getCookieCartId(req, res);
                }

                /**
                 * if ok, fetch data
                 */

                const cartItems = await getCartItemsByCookieId(cookieCartId as string);

                return res.status(200).json({
                    cartItems: cartItems ?? [],
                });
            } catch (err) {
                return res.status(400).json({
                    message: 'Bad Request - verify that the cartId parameter exist',
                    err,
                });
            }
        }
        case 'PUT': {
            try {
                const { id, product } = await JSON.parse(req.body);

                if (!id || !product) {
                    return res
                        .status(400)
                        .json({ message: 'Bad Request - verify that the payload exist' });
                }

                const updateCartItem = await updateCartItemByCookieId(id, product);

                return res.status(200).json({
                    cartItems: updateCartItem,
                });
            } catch (err) {
                return res.status(400).json({
                    message: 'Bad Request - verify that the cartId parameter exist',
                    err,
                });
            }
        }
        default:
            return res.status(400).json({
                message: 'Bad Request',
            });
    }
};

export default handleCartActionsWithCookie;
