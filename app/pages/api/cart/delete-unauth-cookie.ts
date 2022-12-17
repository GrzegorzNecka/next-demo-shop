import type { NextApiHandler } from "next/types";
import { CookieValueTypes, getCookie, hasCookie, setCookie, deleteCookie } from "cookies-next";
import { authApolloClient } from "graphQL/apolloClient";
import {
    CreateUnAuthCartDocument,
    CreateUnAuthCartMutation,
    CreateUnAuthCartMutationVariables,
} from "graphQL/generated/graphql";

interface Response {
    readonly message?: string;
    readonly id?: CookieValueTypes;
}

const handler: NextApiHandler<Response> = async (req, res) => {
    if (req.method !== "DELETE") {
        res.status(400).json({ message: "bad request method" });
        return;
    }
    const payload = await JSON.parse(req.body);

    if (!payload.id) {
        res.status(400).json({ message: "bad request body" });
        return;
    }

    const isCookie = hasCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    if (!isCookie) {
        return;
    }
    const existCookie = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    if (existCookie === payload.id) {
        deleteCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });
    }

    res.status(200).json({ message: "cookie token was deleted" });
    return;
};

export default handler;
