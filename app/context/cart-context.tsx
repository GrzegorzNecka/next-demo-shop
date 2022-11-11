import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { CartItem, CartState } from "./types";
import { useCartItemsFromAuthSession } from "context/hooks/use-cart-items";

export const CartStateContext = createContext<CartState | null>(null);

// -------------   -------------   -------------   -------------   -------------   ------------- Provider

export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    //----------render counter
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    console.log(`Renders cartContext: ${renderCounter.current}`);
    //----------

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [addItemToCart, removeItemFromCart, clearCartItems] = useCartItemsFromAuthSession({
        setCartItems,
        setIsLoading,
    });

    const initialCartState: CartState = {
        // jeśli sesja to cartItems
        items: cartItems || [],
        total: 0,
        isLoading,
        addItemToCart,
        removeItemFromCart,
        clearCartItems,
    };

    return <CartStateContext.Provider value={initialCartState}>{children}</CartStateContext.Provider>;
};

// -------------   -------------   -------------   -------------   -------------   ------------- Client

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
