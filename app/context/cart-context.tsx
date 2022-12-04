import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, CartState } from "./types";
import { useCartItemsWithGraphQl } from "context/hooks/use-server-session";
import { useCartItemsWithLocalStorage } from "context/hooks/use-local-session";
import { useSession } from "next-auth/react";
import { useCartItems } from "./hooks/use-cart-items";

export const CartStateContext = createContext<CartState | null>(null);

// -------------   -------------   -------------   -------------   -------------   ------------- //* Provider

export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    // const [cartItems, setCartItems] = useState<CartItem[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const { cartItems, isLoading, addItemToCart, removeItemFromCart, clearCartItems } = useCartItems();

    const initialCartState: CartState = {
        items: cartItems || [],
        total: 0,
        isLoading,
        addItemToCart,
        removeItemFromCart,
        clearCartItems,
    };

    return <CartStateContext.Provider value={initialCartState}>{children}</CartStateContext.Provider>;
};

// -------------   -------------   -------------   -------------   -------------   ------------- //* Client

export const useCartState = () => {
    const cartState = useContext(CartStateContext);

    const itemsLength = cartState?.items.map((obj) => {
        return obj.quantity;
    });

    const total = itemsLength?.reduce((prev, current) => prev + current, 0);

    if (!cartState) {
        throw new Error("you forgot CartStateContext.Provider");
    }

    return { ...cartState, total };
};
