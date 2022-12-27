import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { CartItem } from 'context/types';
import { Session } from 'next-auth';
import { fetchDataToCartItem } from 'utils/cart';

type useCartItemsProps = {
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  status: 'unauthenticated' | 'authenticated' | 'loading';
  session: Session | null;
  cartItems: CartItem[];
};

export const useCartItemsWithAuthSession = ({
  setCartItems,
  setIsLoading,
  status,
  session,
  cartItems,
}: useCartItemsProps) => {
  const cartId = session?.user?.cartId!;

  async function updateData() {
    const cart = await fetch('/api/cart/cart-items-by-account', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;' },
    });

    if (cart.status === 200) {
      const getCartItems = await cart.json();

      setCartItems(fetchDataToCartItem(getCartItems)!);
      setIsLoading(false);
    }
    return;
  }

  useEffect(() => {
    if (status !== 'authenticated' || !cartId) {
      return;
    }

    updateData();
  }, [status]);

  //CONTEXT HANDLERS

  //
  const addItemToCart = async (product: CartItem) => {
    setIsLoading(true);

    const { productOptionId, quantity } = product;

    const existProduct = cartItems.find((item) => item.productOptionId === productOptionId);

    if (!existProduct) {
      const create = await fetch('/api/cart/cart-items-by-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;' },
        body: JSON.stringify({
          productOptionId,
          quantity,
        }),
      });

      if (create.status === 200) {
        const updateCartItems = await create.json();

        setCartItems(fetchDataToCartItem(updateCartItems)!);
        setIsLoading(false);
      }

      return;
    }

    const update = await fetch('/api/cart/cart-items-by-account', {
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

    const remove = await fetch('/api/cart/cart-items-by-account', {
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

    const clear = await fetch('/api/cart/cart-items-by-account', {
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

  return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
