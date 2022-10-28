import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    UpdateItemQuantityByCartIdDocument,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from "graphQL/generated/graphql";

const updateCartItemHandler: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session?.user.cartId) {
        res.status(400).json({ message: "you have to be logged" });
        return;
    }

    const cartId = session.user.cartId;

    const { itemId, updatedQuantity } = await JSON.parse(req.body);

    if (!itemId && !updatedQuantity) {
        res.status(400).json({ message: "itemId and updatedQuantity are required" });
    }

    const updateCartItem = await authApolloClient.mutate<
        UpdateItemQuantityByCartIdMutation,
        UpdateItemQuantityByCartIdMutationVariables
    >({
        mutation: UpdateItemQuantityByCartIdDocument,
        variables: {
            cartId,
            itemId,
            quantity: updatedQuantity,
        },
    });

    res.status(200).json({ updateCartItem });
    return;
};

export default updateCartItemHandler;
