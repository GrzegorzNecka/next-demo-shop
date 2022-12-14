import type { NextApiHandler, NextApiRequest } from "next/types";
import type { CartItem } from "context/types";
import { CookieValueTypes, getCookie, hasCookie, setCookie } from "cookies-next";
import { apolloClient } from "graphQL/apolloClient";
import {
    CreateCartItemLocalDocument,
    CreateCartItemLocalMutation,
    CreateCartItemLocalMutationVariables,
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

    const isCookie = hasCookie("local-cart-item-id", { req, res });
    //! a co jeśli jest w cookies ale nie ma w hygraph
    if (!isCookie) {
        const createLocalCartItemId = await apolloClient.mutate<
            CreateCartItemLocalMutation,
            CreateCartItemLocalMutationVariables
        >({
            mutation: CreateCartItemLocalDocument,
        });

        //todo do obsłużenia wyjątek kiedy nie ma połączenia z siecią
        const id = createLocalCartItemId.data?.createCartLocal?.id;

        if (!id) {
            res.status(500).json({ message: "problem with server connecting" });
        }

        setCookie("local-cart-item-id", id, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            req,
            res,
            // maxAge: 60 * 60 * 24,
        });
    }

    const cookieId = getCookie("local-cart-item-id", { req, res });

    if (!cookieId) {
        res.status(400).json({ message: "not found cookie" });
        return;
    }

    res.status(200).json({ id: cookieId });
};

export default handler;
