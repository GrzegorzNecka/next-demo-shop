import type { Dispatch, SetStateAction } from 'react';
import { CartItem } from 'context/types';
import { fetchDataToCartItem } from 'utils/cart';

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
      const getCartItems = await cart.json();

      setCartItems(fetchDataToCartItem(getCartItems)!);
      setIsLoading(false);
    }
    return;
  };

  //

  const addItemToCart = async (product: CartItem) => {
    setIsLoading(true);

    const { productOptionId, quantity } = product;

    const existProduct = cartItems.find((item) => item.productOptionId === productOptionId);

    if (!existProduct) {
      const create = await fetch(API_CART_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;' },
        body: JSON.stringify({
          productOptionId,
          quantity,
        }),
      });

      if (create.status === 200) {
        // const updateCartItems = await create.json();
        //  setCartItems(fetchDataToCartItem(updateCartItems)!);
        const withNewCartItem = fetchDataToCartItem(await create.json())!;
        setCartItems(withNewCartItem);
        setIsLoading(false);
      }

      return;
    }

    const update = await fetch(API_CART_PATH, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;' },
      body: JSON.stringify({
        itemId: existProduct.itemId,
        updatedQuantity: existProduct?.quantity! + quantity,
      }),
    });

    if (update.status === 200) {
      const updateCartItems = await update.json();

      setCartItems(fetchDataToCartItem(updateCartItems)!);
      setIsLoading(false);
    }
  };

  //

  const removeItemFromCart = async (itemId: CartItem['productOptionId']) => {
    const existItem = cartItems.find((item) => item.itemId === itemId);

    if (!existItem) {
      return;
    }

    setIsLoading(true);

    const remove = await fetch(API_CART_PATH, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;' },
      body: JSON.stringify({
        itemId,
        quantity: existItem.quantity,
      }),
    });

    if (remove.status === 200) {
      const updateCartItems = await remove.json();

      setCartItems(fetchDataToCartItem(updateCartItems)!);
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
