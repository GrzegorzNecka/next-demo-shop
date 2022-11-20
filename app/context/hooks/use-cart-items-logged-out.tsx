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

            await getCartItems();
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

        const { cartItems } = await res.json();

        // cartItems.current = cart.cartItems;

        setCartItems(cartItems);
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        setIsLoading(true);

        const res = await fetch("/api/cart/logged-out/handle-cart-items", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                product,
                userId: userId.current,
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

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        console.log("add item kiedy nie ma sesji");
    };

    const clearCartItems = async () => {
        const res = await fetch("/api/cart/logged-out/handle-cart-items", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                userId: userId.current,
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

// -------------   -------------   -------------   -------------   -------------   -------------

// const getCartItems = async (token: string | null) => {
//     if (!token) {
//         return;
//     }

//     const data = await fetch("/api/cart/logged-out/cart-items", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             token,
//         }),
//     });

//     const res = await data.json();
//     console.log("🚀 ~ file: use-cart-items-logged-out.tsx ~ line 105 ~ getCartItems ~  res", res);
//     return res;
// };

// const updateCartItems = async (token: string, cartItems: CartItem[]) => {
//     const data = await fetch("/api/cartSessionState", {
//         headers: {
//             "Content-Type": "application/json",
//             "Cart-Session-Payload": JSON.stringify({ token, cartItems }),
//         },
//     });

//     const res = await data.json();
//     return res;
// };
