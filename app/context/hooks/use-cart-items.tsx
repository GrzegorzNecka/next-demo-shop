import type { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCartItemsWithGraphQl } from "./use-cart-items-logged-in";
import { useCartItemsWithLocalStorage } from "./use-cart-items-logged-out";

export const useCartItems = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status } = useSession();

    const loggedInState = useCartItemsWithGraphQl({
        setCartItems,
        setIsLoading,
    });

    const loggedOutState = useCartItemsWithLocalStorage({
        status,
        setCartItems,
        setIsLoading,
    });

    const methods = status === "authenticated" ? loggedInState : loggedOutState;

    return {
        cartItems,
        isLoading,
        addItemToCart: methods.addItemToCart,
        removeItemFromCart: methods.removeItemFromCart,
        clearCartItems: methods.clearCartItems,
    } as const;
};
