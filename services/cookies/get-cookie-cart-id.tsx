import type { CookieValueTypes } from 'cookies-next';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateUnAuthCartMutation,
    CreateUnAuthCartMutationVariables,
} from 'graphQL/generated/graphql';
import { CreateUnAuthCartDocument } from 'graphQL/generated/graphql';

import type { NextApiRequest, NextApiResponse } from 'next';

interface Response {
    readonly message?: string;
    readonly id?: CookieValueTypes;
}

async function getCookieCartId(req: NextApiRequest, res: NextApiResponse<Response>) {
    const isCookie = hasCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    if (!isCookie) {
        //-
        const cart = await authApolloClient.mutate<
            CreateUnAuthCartMutation,
            CreateUnAuthCartMutationVariables
        >({
            mutation: CreateUnAuthCartDocument,
        });

        //todo - do obsłużenia wyjątek kiedy nie ma połączenia z siecią

        const id = cart.data?.createUnauthCart?.id;

        if (!id) {
            res.status(500).json({ message: 'problem with server (hygraph) connecting' });
        }

        setCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, id, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            req,
            res,
            // maxAge: 60 * 60 * 24,
        });
    }

    const cookieCartId = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    return cookieCartId;
}

export { getCookieCartId };
