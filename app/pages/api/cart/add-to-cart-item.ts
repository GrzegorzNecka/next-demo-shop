import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    AddItemOptionToCartByCartIdDocument,
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
} from "graphQL/generated/graphql";

const addItemToCartHandler: NextApiHandler = async (req, res) => {
    //_
    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session?.user.cartId) {
        res.status(400).json({ message: "you have to be logged" });
        return;
    }

    const cartId = session.user.cartId;
    // todo nie ma typów dla productOptionId, quantity
    const { productOptionId, quantity } = await JSON.parse(req.body);

    if (!productOptionId && !quantity) {
        res.status(400).json({ message: "productOptionId is required" });
    }

    const addToCartItem = await authApolloClient.mutate<
        AddItemOptionToCartByCartIdMutation,
        AddItemOptionToCartByCartIdMutationVariables
    >({
        mutation: AddItemOptionToCartByCartIdDocument,
        variables: {
            cartId,
            quantity,
            productOptionId: productOptionId,
        },
    });

    res.status(200).json({ addToCartItem });
    return;
};

export default addItemToCartHandler;
