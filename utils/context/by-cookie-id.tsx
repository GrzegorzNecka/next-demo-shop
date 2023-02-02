import type { CartItem } from 'types/context';
import type { Dispatch, SetStateAction } from 'react';
import { transitionProductToCartItemOfContextByCookieId } from 'utils/cart-transitions';

type cartItemsByCookieIdProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    cookieCartId: string | undefined;
    cartItems: CartItem[];
};

export const cartItemsByCookieId = ({
    setCartItems,
    setIsLoading,
    cookieCartId,
    cartItems,
}: cartItemsByCookieIdProps) => {
    const API_CART_ENDPOINT = '/api/cart/by-cookie-id';

    /**
     *
     * Context handlers
     *
     */

    async function updateCartItems() {
        if (!cookieCartId) {
            return;
        }

        const result = await fetch(API_CART_ENDPOINT, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;' },
        });

        if (result.status !== 200) {
            return;
        }

        const { cartItems: withFetchedCartItems }: { cartItems: CartItem[] } = await result.json();

        setCartItems(withFetchedCartItems);
        setIsLoading(false);
    }

    async function addItemToCart(product: CartItem) {
        setIsLoading(true);

        const existCartItem = cartItems.find(
            (item?) => item.productOptionId === product.productOptionId,
        );

        /**
         * Add new product to Cart
         */

        if (!existCartItem) {
            const create = await fetch(API_CART_ENDPOINT, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;' },
                body: JSON.stringify({
                    id: cookieCartId,
                    product: [
                        ...cartItems,
                        transitionProductToCartItemOfContextByCookieId(product),
                    ],
                }),
            });

            if (create.status === 200) {
                const { cartItems: withUpdatedCartItem }: { cartItems: CartItem[] } =
                    await create.json();

                setCartItems(withUpdatedCartItem!);
                setIsLoading(false);
            }
            return;
        }

        /**
         * Update existing product in Cart
         */

        existCartItem.quantity = existCartItem.quantity + product.quantity;

        const restCartItems = cartItems.filter(
            (item) => item.productOptionId !== product.productOptionId,
        );

        const increase = await fetch(API_CART_ENDPOINT, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({
                id: cookieCartId,
                product: [...restCartItems, existCartItem],
            }),
        });

        if (increase.status === 200) {
            const { cartItems }: { cartItems: CartItem[] } = await increase.json();
            setCartItems(cartItems!);
            setIsLoading(false);
        }
    }

    async function removeItemFromCart(itemId: CartItem['productOptionId']) {
        if (!cartItems) {
            return;
        }

        const existCartItem = cartItems.find((item) => item.itemId === itemId);

        if (!existCartItem) {
            return;
        }

        setIsLoading(true);

        /**
         * Update cartItem quantity
         */

        if (existCartItem.quantity > 1) {
            const updateCartItems = cartItems.map((item) => {
                if (item.itemId === itemId) {
                    item.quantity = item.quantity - 1;
                }

                return item;
            });

            const decrease = await fetch(API_CART_ENDPOINT, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;' },
                body: JSON.stringify({
                    id: cookieCartId,
                    product: updateCartItems,
                }),
            });

            if (decrease.status === 200) {
                const { cartItems }: { cartItems: CartItem[] } = await decrease.json();
                setCartItems(cartItems!);
                setIsLoading(false);
            }
            return;
        }

        /**
         * Delete Cart
         */

        const restCartItems = cartItems.filter((item) => item.itemId !== itemId);

        const remove = await fetch(API_CART_ENDPOINT, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({
                id: cookieCartId,
                product: restCartItems,
            }),
        });

        if (remove.status === 200) {
            const { cartItems }: { cartItems: CartItem[] } = await remove.json();
            setCartItems(cartItems!);
            setIsLoading(false);
        }
        return;
    }

    async function clearCartItems() {
        if (!cartItems) {
            return;
        }

        // const clear = await updateCart(cookieCartId, []);

        const clear = await fetch(API_CART_ENDPOINT, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;' },
            body: JSON.stringify({
                id: cookieCartId,
                product: [],
            }),
        });

        if (clear.status === 200) {
            const { cartItems }: { cartItems: CartItem[] } = await clear.json();
            setCartItems(cartItems!);
            setIsLoading(false);
        }
        return;
    }

    return {
        updateCartItems,
        addItemToCart,
        removeItemFromCart,
        clearCartItems,
    } as const;
};
