import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    AddItemOptionToCartByCartIdDocument,
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
    AddItemToCartLocalByIdDocument,
    AddItemToCartLocalByIdMutation,
    AddItemToCartLocalByIdMutationVariables,
    ClearCartItemsDocument,
    ClearCartItemsMutation,
    ClearCartItemsMutationVariables,
    RemoveItemFromCartByCartIdDocument,
    RemoveItemFromCartByCartIdMutation,
    RemoveItemFromCartByCartIdMutationVariables,
    UpdateItemQuantityByCartIdDocument,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from "graphQL/generated/graphql";

const handleCartSession: NextApiHandler = async (req, res) => {
    // const session = await unstable_getServerSession(req, res, authOptions);

    // if (!session?.user.cartId) {
    //     res.status(400).json({ message: "you have to be logged" });
    //     return;
    // }

    // const cartId = session.user.cartId;
    const payload = await JSON.parse(req.body);

    console.log("1", payload.product);

    console.log("2", JSON.stringify(payload.product));

    switch (req.method) {
        //add to cart item
        case "POST":
            // if (!payload?.productOptionId && !payload?.quantity) {
            //     res.status(400).json({ message: "productOptionId is required" });
            //     return;
            // }

            const updateCartItem = await authApolloClient.mutate<
                AddItemToCartLocalByIdMutation,
                AddItemToCartLocalByIdMutationVariables
            >({
                mutation: AddItemToCartLocalByIdDocument,
                variables: {
                    id: payload.id,
                    cartItem: `${JSON.stringify(payload.product)}`,
                    // cartId,
                    // quantity: payload.quantity,
                    // productOptionId: payload.productOptionId,
                },
            });
            console.log(
                "🚀 ~ file: local-session.ts:43 ~ consthandleCartSession:NextApiHandler= ~  createCartItem",
                updateCartItem
            );
            res.status(200).json({ updateCartItem });

            return;
        //update cart item

        default:
            res.status(400).json({ message: "bad request method" });
            return;
    }
};

export default handleCartSession;
