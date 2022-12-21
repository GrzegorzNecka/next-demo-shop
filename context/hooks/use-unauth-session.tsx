import { ApolloQueryResult } from "@apollo/client";
import type { CartItem } from "context/types";
import { GetUnauthCartQuery } from "graphQL/generated/graphql";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { productToCartItem } from "utils/cart";

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "unauthenticated" | "authenticated" | "loading";
    cookieCartId: string;
    cartItems: CartItem[];
};

export const useCartItemsWithUnauthSession = ({
    setCartItems,
    setIsLoading,
    status,
    cookieCartId,
    cartItems,
}: useCartItemsProps) => {
    //
    async function updateData() {
        let result = await fetch("/api/cart/unauth-session", {
            method: "GET",
            headers: { "Content-Type": "application/json;" },
        });

        if (result.status !== 200) {
            return;
        }

        const { cartItems } = await result.json();
        console.log("🚀 ~ file: use-unauth-session.tsx:35 ~ updateData ~ cartItems", cartItems);

        // const data: CartItem[] = JSON.parse(cartItems);
        // console.log("🚀 ~ file: use-unauth-session.tsx:38 ~ updateData ~  data", data);

        setCartItems(cartItems);
        setIsLoading(false);
    }

    // USE_EFFECT
    useEffect(() => {
        if (status !== "unauthenticated") {
            return;
        }

        updateData();
    }, [status]);

    // CONTEXT HANDLERS

    const addItemToCart = async (product: CartItem) => {
        if (status !== "unauthenticated") {
            return;
        }

        setIsLoading(true);

        const existCartItem = cartItems.find((item) => item.productOptionId === product.productOptionId);
        console.log("🚀 ~  ~ existCartItem", existCartItem);

        // create new cartItem
        if (!existCartItem) {
            const create = await updateCart(cookieCartId, [...cartItems, productToCartItem(product)]);
            console.log("🚀 ~  ~ create", create);

            if (create.status === 200) {
                updateData();
            }
            return;
        }

        //update existing cartItem (increase quantity)

        existCartItem.quantity = existCartItem.quantity + product.quantity;
        const restCartItems = cartItems.filter((item) => item.productOptionId !== product.productOptionId);
        const increase = await updateCart(cookieCartId, [...restCartItems, existCartItem]);

        if (increase.status === 200) {
            updateData();
        }
    };

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        if (status !== "unauthenticated" || !cartItems) {
            return;
        }

        const existCartItem = cartItems.find((item) => item.itemId === itemId);

        if (!existCartItem) {
            return;
        }

        setIsLoading(true);

        // decrease cartItem quantity

        if (existCartItem.quantity > 1) {
            const updateCartItems = cartItems.map((item) => {
                if (item.itemId === itemId) {
                    item.quantity = item.quantity - 1;
                }

                return item;
            });

            const decrease = await updateCart(cookieCartId, updateCartItems);

            if (decrease.status === 200) {
                updateData();
            }
            return;
        }

        //delete cartItem

        const restCartItems = cartItems.filter((item) => item.itemId !== itemId);
        const remove = await updateCart(cookieCartId, restCartItems);

        if (remove.status === 200) {
            updateData();
        }
        return;
    };

    const clearCartItems = async () => {
        if (status !== "unauthenticated" || !cartItems) {
            return;
        }

        const clear = await updateCart(cookieCartId, []);

        if (clear.status === 200) {
            updateData();
        }
        return;
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};

// HELPERS

async function updateCart<T, U>(id: T, product: U) {
    const res = await fetch("/api/cart/unauth-session", {
        method: "PUT",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            id,
            product,
        }),
    });
    return res;
}

//! do obsłużenia przypadek kiedy w cookies wyczyszczę pamięć podręczną
async function deleteCookieCartId<T>(id: T) {
    const deleteCookieId = await fetch("/api/cart/cookies/delete-unauth-session-id", {
        method: "DELETE",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            id,
        }),
    });

    return deleteCookieId.status;
}
