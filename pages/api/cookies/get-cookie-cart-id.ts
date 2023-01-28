import type { NextApiHandler } from 'next/types';
import type { CookieValueTypes } from 'cookies-next';
import { getCookie, hasCookie } from 'cookies-next';
import createCookieCartId from 'services/cookies/create-cookie-cart-id';
import isCartIdExist from 'services/hygraph/cart/by-cookie/is-cart-id-exist';
import deleteCookieCartId from 'services/cookies/delete-cookie-cart-id';
import getCookieCartId from 'services/cookies/get-cookie-cart-id';

interface Response {
    readonly message?: string;
    readonly id?: CookieValueTypes;
}

const handler: NextApiHandler<Response> = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(400).json({ message: 'bad request method' });
        return;
    }

    // is id exist on cookie
    const isCookie = hasCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    if (!isCookie) {
        const create = await createCookieCartId(req, res);
    }

    let cookieCartId = await getCookieCartId(req, res);

    // is id exist on db
    const isExist = await isCartIdExist(cookieCartId as string);

    if (!isExist) {
        await deleteCookieCartId(req, res);
        await createCookieCartId(req, res);
        cookieCartId = await getCookieCartId(req, res);
    }

    res.status(200).json({ id: cookieCartId });
    return;
};

export default handler;
