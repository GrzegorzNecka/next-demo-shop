import type { NextApiHandler } from 'next/types';
import type { CookieValueTypes } from 'cookies-next';
import { getCookie, hasCookie } from 'cookies-next';
import createCookieCartId from 'services/cookies/create-cart-id';
import isCartIdExist from 'services/hygraph/cart/by-cookie/is-cart-id-exist';
import deleteCookieCartId from 'services/cookies/delete-cart-id';
import getCookieCartId from 'services/cookies/get-cart-id';

interface Response {
    readonly message?: string;
    readonly id?: CookieValueTypes;
}

const handler: NextApiHandler<Response> = async (req, res) => {
    switch (req.method) {
        case 'GET': {
            try {
                /**
                 * is id exist on cookie
                 */

                const isCookie = hasCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, {
                    req,
                    res,
                });

                if (!isCookie) {
                    const create = await createCookieCartId(req, res);
                }

                let cookieCartId = await getCookieCartId(req, res);

                /**
                 * is id exist on db
                 */

                const isExist = await isCartIdExist(cookieCartId as string);

                if (!isExist) {
                    /**
                     * @todo usuń nieistniejące id w bazie danych
                     */

                    await deleteCookieCartId(req, res);
                    await createCookieCartId(req, res);
                    cookieCartId = await getCookieCartId(req, res);
                }

                return res.status(200).json({ id: cookieCartId });
            } catch (err) {
                return res
                    .status(400)
                    .json({ message: 'Bad Request - check that cookieCartId is exist ' });
            }
        }
        default:
            return res.status(400).json({ message: 'Bad Request method' });
    }
};

export default handler;
