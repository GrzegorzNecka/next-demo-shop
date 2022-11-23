import type { CartItem } from "context/types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useEffect } from "react";

// -------------   -------------   -------------   -------------   -------------   -------------

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "authenticated" | "loading" | "unauthenticated";
};

export const useCartItemsWithLocalStorage = ({ status, setCartItems, setIsLoading }: useCartItemsProps) => {
    // -------------   -------------   -------------   -------------   -------------   -------------

    useEffect(() => {
        if (status !== "unauthenticated") {
            return;
        }

        const initialCartItems = async () => {
            await getCartItems();
        };

        initialCartItems();
    }, [status]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    const getCartItems = async () => {
        const res = await fetch("/api/cart/logged-out/crud-cart-items", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                action: "get",
            }),
        });

        if (res.status !== 200) {
            return;
        }

        const { cartItems } = await res.json();

        setCartItems(cartItems);
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        setIsLoading(true);

        const res = await fetch("/api/cart/logged-out/crud-cart-items", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                product,
                action: "add",
            }),
        });

        if (res.status !== 200) {
            return;
        }

        const { cartItems } = await res.json();

        setCartItems(cartItems);
        setIsLoading(false);
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        // setIsLoading(true);
        const res = await fetch("/api/cart/logged-out/crud-cart-items", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                itemId,

                action: "remove",
            }),
        });
        if (res.status !== 200) {
            return;
        }
        const { cartItems } = await res.json();
        setCartItems(cartItems);
        setIsLoading(false);
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const clearCartItems = async () => {
        const res = await fetch("/api/cart/logged-out/crud-cart-items", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                action: "clear",
            }),
        });

        if (res.status !== 200) {
            return;
        }

        const { cartItems } = await res.json();

        setCartItems(cartItems);
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
