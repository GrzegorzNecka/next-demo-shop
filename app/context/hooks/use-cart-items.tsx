import type { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCartItemsWithAuthSession } from "./use-auth-session";
import { useCartItemsWithUnauthSession } from "./use-unauth-session";

export const useCartItems = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status } = useSession();

    const authSession = useCartItemsWithAuthSession({
        setCartItems,
        setIsLoading,
    });

    const unauthSession = useCartItemsWithUnauthSession({
        setCartItems,
        setIsLoading,
    });

    const methods = status === "authenticated" ? authSession : unauthSession;

    return {
        cartItems,
        isLoading,
        addItemToCart: methods.addItemToCart,
        removeItemFromCart: methods.removeItemFromCart,
        clearCartItems: methods.clearCartItems,
    } as const;
};
