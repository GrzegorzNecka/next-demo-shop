import { ApolloQueryResult } from '@apollo/client';
import type { CartItem } from 'context/types';
import { GetUnauthCartQuery } from 'graphQL/generated/graphql';
import { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { productToCartItem } from 'utils/cart';

type useCartItemsProps = {
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  status: 'unauthenticated' | 'authenticated' | 'loading';
  cookieCartId: string;
  cartItems: CartItem[];
};

export const useCartItemsWithUnauthSession = ({
  setCartItems,
  setIsLoading,
  status,
  cookieCartId,
  cartItems,
}: useCartItemsProps) => {
  //
  async function updateData() {
    let result = await fetch('/api/cart/cart-items-by-cookie-id', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;' },
    });

    if (result.status !== 200) {
      return;
    }

    const { cartItems }: { cartItems: CartItem[] } = await result.json();

    setCartItems(cartItems);
    setIsLoading(false);
  }

  // USE_EFFECT
  useEffect(() => {
    if (status !== 'unauthenticated') {
      return;
    }

    updateData();
  }, [status]);

  // CONTEXT HANDLERS

  const addItemToCart = async (product: CartItem) => {
    setIsLoading(true);

    const existCartItem = cartItems.find(
      (item) => item.productOptionId === product.productOptionId,
    );

    // create new cartItem
    if (!existCartItem) {
      const create = await updateCart(cookieCartId, [...cartItems, productToCartItem(product)]);

      if (create.status === 200) {
        const { cartItems }: { cartItems: CartItem[] } = await create.json();

        setCartItems(cartItems!);
        setIsLoading(false);
      }
      return;
    }

    //update existing cartItem (increase quantity)

    existCartItem.quantity = existCartItem.quantity + product.quantity;
    const restCartItems = cartItems.filter(
      (item) => item.productOptionId !== product.productOptionId,
    );
    const increase = await updateCart(cookieCartId, [...restCartItems, existCartItem]);

    if (increase.status === 200) {
      const { cartItems }: { cartItems: CartItem[] } = await increase.json();
      setCartItems(cartItems!);
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (itemId: CartItem['productOptionId']) => {
    if (status !== 'unauthenticated' || !cartItems) {
      return;
    }

    const existCartItem = cartItems.find((item) => item.itemId === itemId);

    if (!existCartItem) {
      return;
    }

    setIsLoading(true);

    // decrease cartItem quantity

    if (existCartItem.quantity > 1) {
      const updateCartItems = cartItems.map((item) => {
        if (item.itemId === itemId) {
          item.quantity = item.quantity - 1;
        }

        return item;
      });

      const decrease = await updateCart(cookieCartId, updateCartItems);

      if (decrease.status === 200) {
        const { cartItems }: { cartItems: CartItem[] } = await decrease.json();
        setCartItems(cartItems!);
        setIsLoading(false);
      }
      return;
    }

    //delete cartItem

    const restCartItems = cartItems.filter((item) => item.itemId !== itemId);
    const remove = await updateCart(cookieCartId, restCartItems);

    if (remove.status === 200) {
      const { cartItems }: { cartItems: CartItem[] } = await remove.json();
      setCartItems(cartItems!);
      setIsLoading(false);
    }
    return;
  };

  const clearCartItems = async () => {
    if (status !== 'unauthenticated' || !cartItems) {
      return;
    }

    const clear = await updateCart(cookieCartId, []);

    if (clear.status === 200) {
      const { cartItems }: { cartItems: CartItem[] } = await clear.json();
      setCartItems(cartItems!);
      setIsLoading(false);
    }
    return;
  };

  return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};

// HELPERS

async function updateCart<T, U>(id: T, product: U) {
  const res = await fetch('/api/cart/cart-items-by-cookie-id', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;' },
    body: JSON.stringify({
      id,
      product,
    }),
  });
  return res;
}

//! do obsłużenia przypadek kiedy w cookies wyczyszczę pamięć podręczną
//! te problem z aktualizacja są przez to właśnie
// async function deleteCookieCartId<T>(id: T) {
//   const deleteCookieId = await fetch('/api/cart/cookies/delete-cart-items-by-cookie-id-id', {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json;' },
//     body: JSON.stringify({
//       id,
//     }),
//   });

//   return deleteCookieId.status;
// }
