import type { CookieValueTypes } from 'cookies-next';
import { deleteCookie } from 'cookies-next';

import type { NextApiRequest, NextApiResponse } from 'next';

interface Response {
    readonly message?: string;
    readonly id?: CookieValueTypes;
}

async function deleteCookieCartId(req: NextApiRequest, res: NextApiResponse<Response>) {
    /**
     * @todo usuń nieistniejące id w bazie danych
     */

    deleteCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`);
}

export default deleteCookieCartId;
