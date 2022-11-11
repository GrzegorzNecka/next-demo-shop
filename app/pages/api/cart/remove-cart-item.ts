import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    RemoveItemFromCartByCartIdDocument,
    RemoveItemFromCartByCartIdMutation,
    RemoveItemFromCartByCartIdMutationVariables,
    UpdateItemQuantityByCartIdDocument,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from "graphQL/generated/graphql";

const handleRemoveItemFromCartHandler: NextApiHandler = async (req, res) => {
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

    const { itemId, quantity } = await JSON.parse(req.body);

    if (!itemId && !quantity) {
        res.status(400).json({ message: "itemId and updatedQuantity are required" });
    }

    if (quantity > 1) {
        const increaseItemQuantity = await authApolloClient.mutate<
            UpdateItemQuantityByCartIdMutation,
            UpdateItemQuantityByCartIdMutationVariables
        >({
            mutation: UpdateItemQuantityByCartIdDocument,
            variables: {
                cartId,
                itemId,
                quantity: quantity - 1,
            },
        });

        res.status(200).json({ increaseItemQuantity });
        return;
    }

    const handleRemoveItemFromCart = await authApolloClient.mutate<
        RemoveItemFromCartByCartIdMutation,
        RemoveItemFromCartByCartIdMutationVariables
    >({
        mutation: RemoveItemFromCartByCartIdDocument,
        variables: {
            cartId,
            itemId,
        },
    });

    res.status(200).json({ handleRemoveItemFromCart });
    return;
};

export default handleRemoveItemFromCartHandler;
