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

async function createCookieCartId(req: NextApiRequest, res: NextApiResponse<Response>) {
    const cart = await authApolloClient.mutate<
        CreateUnAuthCartMutation,
        CreateUnAuthCartMutationVariables
    >({
        mutation: CreateUnAuthCartDocument,
    });

    const id = cart.data?.createUnauthCart?.id;

    if (!id) {
        res.status(500).json({ message: 'problem with server (hygraph) connecting' });
        return;
    }

    setCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, id, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        req,
        res,
    });
}

export default createCookieCartId;
