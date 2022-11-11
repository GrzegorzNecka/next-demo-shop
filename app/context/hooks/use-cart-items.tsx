import { useState, useEffect, useMemo, useCallback } from "react";
import { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import {
    GetCartItemsByCartIdDocument,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
    useGetCartItemsByCartIdQuery,
} from "graphQL/generated/graphql";
import { handleAddItemToCart, handleClearCartItems, handleRemoveItemFromCart, updateCartItem } from "services/cart";
import { apolloClient } from "graphQL/apolloClient";

export const useCartItems = () => {
    const session = useSession();
    const cartId = session.data?.user?.cartId!; //"cl7q56m7a1eqp0ateldaehrcs"

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // -------------   -------------   -------------   -------------   -------------   -------------

    const { data, refetch } = useGetCartItemsByCartIdQuery({
        skip: !Boolean(cartId), // jeśli nie ma sesji przerywa
        variables: {
            id: cartId,
        },
        onCompleted: () => {
            setIsLoading(false);
        },
        onError(error) {
            console.log("error", error);
        },
    });

    // -------------   -------------   -------------   -------------   -------------   -------------

    useEffect(() => {
        console.log("data", data);
        //! ------ ------ ------ ------ ------ jeśli sesji nie ma
        if (!data || !data.cart || session.status !== "authenticated") {
            // console.log("brak sesji użyj local storage");
            return;
        }

        //! ------ ------ ------ ------ ------ jeśli sesja jest

        const cartItems = data.cart.cartItems.map((item) => {
            return {
                itemId: item.id,
                quantity: item?.quantity!,
                price: item?.option?.product?.price!,
                title: item?.option?.product?.name!,
                imgUrl: item?.option?.product?.images.at(0)?.url!,
                slug: item?.option?.product?.slug!,
                productOptionId: item?.option?.id!,
            };
        });

        setCartItems(cartItems);
    }, [session.status, data]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const { productOptionId, quantity } = product;

        const existProduct = data.cart?.cartItems.find((item) => item?.option?.id === productOptionId);

        if (!existProduct) {
            const result = await handleAddItemToCart(productOptionId, quantity);

            if (result.status === 200) {
                refetch({ id: cartId });
            }

            return;
        }

        const itemId = existProduct?.id!;

        const updatedQuantity = existProduct?.quantity! + quantity;

        const result = await updateCartItem(itemId, updatedQuantity);
        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const existItem = data.cart?.cartItems.find((item) => item.id === itemId);
        if (!existItem) {
            return;
        }

        const result = await handleRemoveItemFromCart(itemId, existItem.quantity);

        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const clearCartItems = async () => {
        if (!cartId || !data) {
            return;
        }

        const result = await handleClearCartItems();

        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    return [cartItems, isLoading, addItemToCart, removeItemFromCart, clearCartItems] as const;
};
