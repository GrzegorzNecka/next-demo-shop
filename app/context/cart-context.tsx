import { createContext } from "react";
import { useContext, useRef } from "react";
import { CartState } from "./types";
import { useCartItems } from "context/hooks/use-cart-items";

export const CartStateContext = createContext<CartState | null>(null);

// ----------------- Provider
export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    //----------render counter
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    console.log(`Renders cartContext: ${renderCounter.current}`);
    //----------

    const [cartItems, isLoading, handleAddItemToCart, handleRemoveCartItem, handleClearCart] = useCartItems();

    const initialCartState: CartState = {
        items: cartItems || [],
        total: 0,
        isLoading,
        addItemToCart: (item) => {
            handleAddItemToCart(item);
        },
        removeItemFromCart: (itemId) => {
            handleRemoveCartItem(itemId);
        },
        clearCartItems: () => {
            handleClearCart();
        },
    };

    return <CartStateContext.Provider value={initialCartState}>{children}</CartStateContext.Provider>;
};

// ----------------- Client

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
