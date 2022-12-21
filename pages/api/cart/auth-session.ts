import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    AddItemOptionToCartByCartIdDocument,
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
    ClearCartItemsDocument,
    ClearCartItemsMutation,
    ClearCartItemsMutationVariables,
    GetCartItemsByCartIdDocument,
    RemoveItemFromCartByCartIdDocument,
    RemoveItemFromCartByCartIdMutation,
    RemoveItemFromCartByCartIdMutationVariables,
    UpdateItemQuantityByCartIdDocument,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from "graphQL/generated/graphql";

const handleCartSession: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session?.user.cartId) {
        res.status(400).json({ message: "you have to be logged" });
        return;
    }

    const cartId = session.user.cartId;
    const payload = await JSON.parse(req.body);

    switch (req.method) {
        case "POST":
            // -- add to cartitemmode

            if (!payload?.productOptionId && !payload?.quantity) {
                res.status(400).json({ message: "productOptionId is required" });
                return;
            }

            const createCartItem = await authApolloClient.mutate<
                AddItemOptionToCartByCartIdMutation,
                AddItemOptionToCartByCartIdMutationVariables
            >({
                mutation: AddItemOptionToCartByCartIdDocument,
                variables: {
                    cartId,
                    quantity: payload.quantity,
                    productOptionId: payload.productOptionId,
                },
                // fetchPolicy: "no-cache",
                // awaitRefetchQueries: true,
                // refetchQueries: [
                //     {
                //         query: GetCartItemsByCartIdDocument,
                //         variables: { id: cartId },
                //     },
                // ],
            });

            // await apolloClient.refetchQueries({
            //     include: "active",
            // });
            // await authApolloClient.refetchQueries({
            //     include: "active",
            // });

            res.status(200).json({ createCartItem });
            return;

        case "PUT":
            // -- update cart item

            if (!payload.itemId && !payload.updatedQuantity) {
                res.status(400).json({ message: "itemId and updatedQuantity are required" });
                return;
            }

            const updateCartItem = await authApolloClient.mutate<
                UpdateItemQuantityByCartIdMutation,
                UpdateItemQuantityByCartIdMutationVariables
            >({
                mutation: UpdateItemQuantityByCartIdDocument,
                variables: {
                    cartId,
                    itemId: payload.itemId,
                    quantity: payload.updatedQuantity,
                },

                // awaitRefetchQueries: true,
                // refetchQueries: [
                //     {
                //         query: GetCartItemsByCartIdDocument,
                //         variables: { id: cartId },
                //     },
                // ],
            });

            // await apolloClient.refetchQueries({
            //     include: [GetCartItemsByCartIdDocument],
            // // });
            // await authApolloClient.refetchQueries({
            //     include: "active",
            // });

            // console.log(apolloClient.cache.updateQuery({ query: GetCartItemsByCartIdDocument, variables: { cartId } }));

            res.status(200).json({ updateCartItem });
            return;

        case "DELETE":
            // -- remove selected item

            if (payload.itemId && payload.quantity) {
                if (payload.quantity > 1) {
                    const increseCartItem = await authApolloClient.mutate<
                        UpdateItemQuantityByCartIdMutation,
                        UpdateItemQuantityByCartIdMutationVariables
                    >({
                        mutation: UpdateItemQuantityByCartIdDocument,
                        variables: {
                            cartId,
                            itemId: payload.itemId,
                            quantity: payload.quantity - 1,
                        },
                    });

                    res.status(200).json({ increseCartItem });
                    return;
                }

                const removeCartItem = await authApolloClient.mutate<
                    RemoveItemFromCartByCartIdMutation,
                    RemoveItemFromCartByCartIdMutationVariables
                >({
                    mutation: RemoveItemFromCartByCartIdDocument,
                    variables: {
                        cartId,
                        itemId: payload.itemId,
                    },
                });
                res.status(200).json({ removeCartItem });
                return;
            }
            // -- set empty Cart
            if (payload.setEmpty) {
                const removeAllCartItems = await authApolloClient.mutate<
                    ClearCartItemsMutation,
                    ClearCartItemsMutationVariables
                >({
                    mutation: ClearCartItemsDocument,
                    variables: {
                        cartId,
                    },
                });

                res.status(200).json({ removeAllCartItems });
                return;
            }

            res.status(400).json({ message: "bad request body" });
            return;

        default:
            res.status(400).json({ message: "bad request method" });
            return;
    }
};

export default handleCartSession;
