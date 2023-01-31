import type { CartItem } from 'types/context';
import { transitionFetchedDataToCartOfContext } from 'utils/cart-transitions';
import type { Dispatch, SetStateAction } from 'react';
type cartItemsByAccountProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;

    cartItems: CartItem[];
};

export const API_CART_PATH = '/api/cart/by-account';

export const cartItemsByAccount = ({
    setCartItems,
    setIsLoading,
    cartItems,
}: cartItemsByAccountProps) => {
    //

    // -- CONTEXT HANDLERS

    const updateCartItems = async () => {
        const cart = await fetch(API_CART_PATH, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;' },
        });

        if (cart.status === 200) {
            const withFetchedCartItem = transitionFetchedDataToCartOfContext(await cart.json())!;

            setCartItems(withFetchedCartItem);
            setIsLoading(false);
        }
        return;
    };

    //

    const addItemToCart = async (product: CartItem) => {
        setIsLoading(true);

        const { productOptionId, quantity } = product;

        const existingProduct = cartItems.find((item) => item.productOptionId === productOptionId);

        if (!existingProduct) {
            const create = await fetch(API_CART_PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;' },
                body: JSON.stringify({
                    productOptionId,
                    quantity,
                }),
            });

            if (create.status === 200) {
                const withNewCartItem = transitionFetchedDataToCartOfContext(await create.json())!;
                setCartItems(withNewCartItem);
                setIsLoading(false);
            }

            return;
        }

        const update = await fetch(API_CART_PATH, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({
                itemId: existingProduct.itemId,
                updatedQuantity: existingProduct?.quantity! + quantity,
            }),
        });

        if (update.status === 200) {
            const withUpdatedCartItem = transitionFetchedDataToCartOfContext(await update.json())!;

            setCartItems(withUpdatedCartItem);
            setIsLoading(false);
            return;
        }
    };

    //

    const removeItemFromCart = async (itemId: CartItem['productOptionId']) => {
        const existingItem = cartItems.find((item) => item.itemId === itemId);

        if (!existingItem) {
            return;
        }

        setIsLoading(true);

        const remove = await fetch(API_CART_PATH, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({
                itemId,
                quantity: existingItem.quantity,
            }),
        });

        if (remove.status === 200) {
            const withRemovedCartItem = transitionFetchedDataToCartOfContext(await remove.json())!;

            setCartItems(withRemovedCartItem);
            setIsLoading(false);
        }
    };

    // -- clearCartItems

    const clearCartItems = async () => {
        setIsLoading(true);

        const withEmptyCart: CartItem[] = await handleClearCartItems();

        if (!withEmptyCart) {
            setIsLoading(false);
            return;
        }

        setCartItems(withEmptyCart);
        setIsLoading(false);
    };

    return {
        updateCartItems,
        addItemToCart,
        removeItemFromCart,
        clearCartItems,
    } as const;
};

// HELPERS

export async function handleClearCartItems() {
    let emptyCart: Response;

    try {
        emptyCart = await fetch(API_CART_PATH, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({
                setEmpty: true,
            }),
        });

        if (emptyCart.status !== 200) {
            throw new Error(`HTTP Response Code: ${emptyCart?.status}`);
        }

        const { cart } = await emptyCart.json();
        return cart.cartItems;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error('There was a SyntaxError', error);
        } else {
            console.error(`There was a during call 'withEmptyCart' method`, error);
        }
        return null;
    }
}
