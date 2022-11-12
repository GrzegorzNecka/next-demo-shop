import type { CartItem } from "context/types";
import { Dispatch, SetStateAction, useState } from "react";
import { useEffect, useId } from "react";

// -------------   -------------   -------------   -------------   -------------   -------------

function getTokenFromStorage() {
    let token = localStorage.getItem("CART_ITEMS_TOKEN");

    if (!token) {
        return;
    }

    try {
        token = JSON.parse(token);
        return token;
    } catch (error) {
        console.error(error);
        return;
    }
}

function setTokenInStorage(token: string) {
    localStorage.setItem("CART_ITEMS_TOKEN", JSON.stringify(token));
}

// -------------   -------------   -------------   -------------   -------------   -------------

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "authenticated" | "loading" | "unauthenticated";
};

export const useCartItemsWithLocalStorage = ({ status, setCartItems, setIsLoading }: useCartItemsProps) => {
    //-

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (status !== "unauthenticated") {
            return;
        }

        let tokenFromStorage = getTokenFromStorage();

        if (!tokenFromStorage) {
            tokenFromStorage = `${new Date().getTime()}${Math.random().toString(16).slice(2)}`;
            setTokenInStorage(tokenFromStorage);
        }

        setToken(tokenFromStorage);
    }, [status]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    useEffect(() => {
        if (status !== "unauthenticated" || !token) {
            return;
        }

        //pobierz cartItem

        const getCartItmes = async () => {
            const cartItems = await getCartItems(token);
            // setCartItems(cartItems);
        };

        getCartItmes();
    }, [token, status]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        console.log("add item kiedy nie ma sesji", product);
    };

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        console.log("add item kiedy nie ma sesji");
    };

    const clearCartItems = async () => {
        console.log("add item kiedy nie ma sesji");
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};

// -------------   -------------   -------------   -------------   -------------   -------------

const getCartItems = async (token: string) => {
    const data = await fetch("/api/cart/logged-out/cart-items", {
        headers: {
            "Content-Type": "application/json",
            "Cart-Session-Token": JSON.stringify({ token: token }),
        },
    });

    const res = await data.json();
    return res;
};

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
