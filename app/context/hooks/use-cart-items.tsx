import type { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCartItemsWithGraphQl } from "./use-server-session";
import { useCartItemsWithLocalStorage } from "./use-local-session";

export const useCartItems = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status } = useSession();

    const serverSession = useCartItemsWithGraphQl({
        setCartItems,
        setIsLoading,
    });

    const localSession = useCartItemsWithLocalStorage({
        setCartItems,
        setIsLoading,
    });

    const methods = status === "authenticated" ? serverSession : localSession;

    return {
        cartItems,
        isLoading,
        addItemToCart: methods.addItemToCart,
        removeItemFromCart: methods.removeItemFromCart,
        clearCartItems: methods.clearCartItems,
    } as const;
};
