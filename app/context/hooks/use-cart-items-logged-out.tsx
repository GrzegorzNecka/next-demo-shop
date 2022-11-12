import type { CartItem } from "context/types";
import type { Dispatch, SetStateAction } from "react";

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const useCartItemsWithLocalStorage = ({ setCartItems, setIsLoading }: useCartItemsProps) => {
    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        console.log("add item kiedy nie ma sesji", product);
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        console.log("add item kiedy nie ma sesji");
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const clearCartItems = async () => {
        console.log("add item kiedy nie ma sesji");
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
