import type { CartItem } from 'context/types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { cartItemsByAccount } from './cart-items-by-account';
import { cartItemsByCookieId } from './cart-items-by-cookie-id';
import { useQuery } from '@tanstack/react-query';

export const useCartItems = () => {
  //
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status } = useSession();

  const { data: cookie } = useQuery({
    queryKey: ['cookieCartId'],
    queryFn: async () => {
      const res = await fetch('/api/cart/cookies/create-id', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json;' },
      });

      return res.json();
    },
    enabled: status === 'unauthenticated' ? true : false,
  });

  const auth = cartItemsByAccount({
    setCartItems,
    setIsLoading,
    cartItems,
  });

  const unauth = cartItemsByCookieId({
    setCartItems,
    setIsLoading,
    cookieCartId: cookie?.id,
    cartItems,
  });

  const methods = status === 'authenticated' ? auth : unauth;

  useEffect(() => {
    methods.updateCartItems();
  }, [status]);

  return {
    cartItems,
    isLoading,
    addItemToCart: methods.addItemToCart,
    removeItemFromCart: methods.removeItemFromCart,
    clearCartItems: methods.clearCartItems,
  } as const;
};
