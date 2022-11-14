import type { CartItem } from "context/types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useEffect } from "react";

// -------------   -------------   -------------   -------------   -------------   -------------

function getUserIdFromStorage() {
    let userId = localStorage.getItem("LOGGEDOUT_USER_ID");

    if (!userId) {
        return;
    }

    try {
        userId = JSON.parse(userId);
        return userId;
    } catch (error) {
        console.error(error);
        return;
    }
}

function setUserIdInStorage(userId: string) {
    localStorage.setItem("LOGGEDOUT_USER_ID", JSON.stringify(userId));
}

// -------------   -------------   -------------   -------------   -------------   -------------

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "authenticated" | "loading" | "unauthenticated";
};

export const useCartItemsWithLocalStorage = ({ status, setCartItems, setIsLoading }: useCartItemsProps) => {
    //-

    const userId = useRef<string | null>(null);
    const cartItems = useRef<[] | null>([]);

    useEffect(() => {
        if (status !== "unauthenticated") {
            return;
        }

        let userIdFromStorage = getUserIdFromStorage();

        if (!userIdFromStorage) {
            userIdFromStorage = `-${new Date().getTime()}${Math.random().toString(16).slice(2)}`;
            setUserIdInStorage(userIdFromStorage);
        }

        userId.current = userIdFromStorage;
    }, [status]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    useEffect(() => {
        if (status !== "unauthenticated" || !userId.current) {
            return;
        }

        const initialCartItems = async () => {
            if (!userId.current) {
                return;
            }

            const { cartItems } = await getCartItems();

            cartItems.current = cartItems;

            setCartItems(cartItems.current);
        };

        initialCartItems();

        //
    }, [userId.current, status]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    const getCartItems = async () => {
        const res = await fetch("/api/cart/logged-out/handle-cart-items", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                userId: userId.current,
                action: "get",
            }),
        });

        if (res.status !== 200) {
            return;
        }
        return res.json();
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        const res = await fetch("/api/cart/logged-out/handle-cart-items", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                product,
                userId,
                action: "add",
            }),
        });

        if (res.status !== 200) {
            return;
        }
        console.log(res.json());
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        console.log("add item kiedy nie ma sesji");
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const clearCartItems = async () => {
        console.log("add item kiedy nie ma sesji");
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
