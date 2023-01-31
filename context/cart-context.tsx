import { createContext, useContext } from 'react';
import type { CartState } from '../types/context';
import { useCartItems } from './use-cart-items';
import calculateTotal from '../utils/calculate-total';

export const CartStateContext = createContext<CartState | null>(null);

// -- PROVIDER

export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { cartItems, isLoading, addItemToCart, removeItemFromCart, clearCartItems } =
        useCartItems();

    const initialCartState: CartState = {
        items: cartItems || [],
        total: 0,
        isLoading,
        addItemToCart,
        removeItemFromCart,
        clearCartItems,
    };

    return (
        <CartStateContext.Provider value={initialCartState}>{children}</CartStateContext.Provider>
    );
};

// -- CLIENT

export const useCartState = () => {
    const cartState = useContext(CartStateContext);

    const cartItems = cartState?.items;
    // todo - use memo
    // const total = 0;
    // if (cartItems) {
    //     const quantities = cartItems.map((item) => ({ quantity: item.quantity })),
    //         total = calculateTotal(quantities);
    // }

    const itemsLength = cartState?.items.map((obj) => {
        return obj.quantity;
    });

    const total = itemsLength?.reduce((prev, current) => prev + current, 0);

    if (!cartState) {
        throw new Error('you forgot CartStateContext.Provider');
    }

    return { ...cartState, total };
};
