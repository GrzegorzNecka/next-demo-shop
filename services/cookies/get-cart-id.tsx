import type { CookieValueTypes } from 'cookies-next';
import { getCookie } from 'cookies-next';

import type { NextApiRequest, NextApiResponse } from 'next';

interface Response {
    readonly message?: string;
    readonly id?: CookieValueTypes;
}

async function getCookieCartId(req: NextApiRequest, res: NextApiResponse<Response>) {
    const cookieCartId = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    return cookieCartId;
}

export default getCookieCartId;
