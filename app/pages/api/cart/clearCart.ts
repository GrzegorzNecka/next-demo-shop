import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    AddItemToCartByCartIdDocument,
    AddItemToCartByCartIdMutation,
    AddItemToCartByCartIdMutationVariables,
    ClearCartItemsDocument,
    ClearCartItemsMutation,
    ClearCartItemsMutationVariables,
} from "graphQL/generated/graphql";

const clearCartHandler: NextApiHandler = async (req, res) => {
    //_
    if (req.method !== "GET") {
        res.status(400).json({ message: "bad request method" });
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session?.user.cartId) {
        res.status(400).json({ message: "you have to be logged" });
        return;
    }

    const cartId = session.user.cartId;

    const calerCart = await authApolloClient.mutate<ClearCartItemsMutation, ClearCartItemsMutationVariables>({
        mutation: ClearCartItemsDocument,
        variables: {
            cartId,
        },
    });

    res.status(200).json({ calerCart });
    return;
};

export default clearCartHandler;
