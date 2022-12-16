import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, CartState } from "./types";
import { useCartItemsWithAuthSession } from "context/hooks/use-auth-session";
import { useCartItemsWithUnauthSession } from "context/hooks/use-unauth-session";
import { useSession } from "next-auth/react";
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
