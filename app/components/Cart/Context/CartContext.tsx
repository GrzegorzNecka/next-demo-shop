import { createContext } from "react";
import { useContext } from "react";
import { CartState } from "../types";
import { useCartItems } from "./useCartItems";

export const CartStateContext = createContext<CartState | null>(null);

// ----------------- Provider
export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    console.log("-----render context-----------");

    const [cartItems, handleAddItemToCart] = useCartItems();

    const initialCartState: CartState = {
        items: cartItems || [],
        total: 0,
        addItemToCart: (item) => {
            handleAddItemToCart(item);
        },
    };

    return <CartStateContext.Provider value={initialCartState}>{children}</CartStateContext.Provider>;
};

// ----------------- Client

export const useCartState = () => {
    const cartState = useContext(CartStateContext);

    const itemsLength = cartState?.items.map((obj) => obj.count);
    const total = itemsLength?.reduce((prev, current) => prev + current, 0);

    if (!cartState) {
        throw new Error("you forgot CartStateContext.Provider");
    }

    return { ...cartState, total };
};