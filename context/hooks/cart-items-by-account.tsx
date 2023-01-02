import type { CartItem } from 'context/types';
import { fetchedToCartItem } from 'utils/cart';
import type { Dispatch, SetStateAction } from 'react';
type cartItemsByAccountProps = {
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  cartItems: CartItem[];
};

export const cartItemsByAccount = ({
  setCartItems,
  setIsLoading,
  cartItems,
}: cartItemsByAccountProps) => {
  //

  const API_CART_PATH = '/api/cart/cart-items-by-account';

  // -- CONTEXT HANDLERS

  const updateCartItems = async () => {
    const cart = await fetch(API_CART_PATH, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;' },
    });

    if (cart.status === 200) {
      const withFetchedCartItem = fetchedToCartItem(await cart.json())!;

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
        const withNewCartItem = fetchedToCartItem(await create.json())!;
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
      const withUpdatedCartItem = fetchedToCartItem(await update.json())!;

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
      const withRemovedCartItem = fetchedToCartItem(await remove.json())!;

      setCartItems(withRemovedCartItem);
      setIsLoading(false);
    }
  };

  //

  const clearCartItems = async () => {
    setIsLoading(true);

    const clear = await fetch(API_CART_PATH, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;' },
      body: JSON.stringify({
        setEmpty: true,
      }),
    });

    if (clear.status === 200) {
      setCartItems([]);
      setIsLoading(false);
    }
  };

  return {
    updateCartItems,
    addItemToCart,
    removeItemFromCart,
    clearCartItems,
  } as const;
};
