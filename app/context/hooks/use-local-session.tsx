import type { CartItem } from "context/types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useEffect } from "react";

// -------------   -------------   -------------   -------------   -------------   -------------

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "authenticated" | "loading" | "unauthenticated";
};

let didInit = false;

export const useCartItemsWithLocalStorage = ({ status, setCartItems, setIsLoading }: useCartItemsProps) => {
    // -------------   -------------   -------------   -------------   -------------   -------------

    useEffect(() => {
        if (!didInit) {
            didInit = true;
            return;
        }

        if (status !== "unauthenticated") {
            return;
        }

        const initialCartItems = async () => {
            await getCartItems();
        };

        initialCartItems();
    }, [status]);

    // -------------   -------------   -------------   -------------   -------------   -------------
    //! zamiast akcji pisz poprawne nagłówki !!! -----------------------------  TO JEST BARDZO WAŻNE
    const getCartItems = async () => {
        const res = await fetch("/api/cart/local-session", {
            method: "GET",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
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

        const res = await fetch("/api/cart/local-session", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                product,
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
        const res = await fetch("/api/cart/local-session", {
            method: "DELETE",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                itemId,
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
        const res = await fetch("/api/cart/local-session", {
            method: "DELETE",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                setEmpty: true,
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
