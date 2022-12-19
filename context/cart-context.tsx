import { createContext, useContext } from "react";
import type { CartState } from "./types";

import { useCartItems } from "./hooks/use-cart-items";

export const CartStateContext = createContext<CartState | null>(null);

// -- PROVIDER

export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
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

// -- CLIENT

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
