import type { NextApiHandler } from "next/types";
import { CookieValueTypes, getCookie, hasCookie, setCookie } from "cookies-next";
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
    if (req.method !== "GET") {
        res.status(400).json({ message: "bad request method" });
        return;
    }

    const isCookie = hasCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    if (!isCookie) {
        //-
        const cart = await authApolloClient.mutate<CreateUnAuthCartMutation, CreateUnAuthCartMutationVariables>({
            mutation: CreateUnAuthCartDocument,
        });

        //todo - do obsłużenia wyjątek kiedy nie ma połączenia z siecią

        const id = cart.data?.createUnauthCart?.id;

        if (!id) {
            res.status(500).json({ message: "problem with server (hygraph) connecting" });
        }

        setCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, id, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            req,
            res,
            // maxAge: 60 * 60 * 24,
        });
    }

    const cookieId = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    if (!cookieId) {
        res.status(400).json({ message: "not found cookie" });
        return;
    }

    res.status(200).json({ id: cookieId });
};

export default handler;
