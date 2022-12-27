import type { CartItem } from 'context/types';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useCartItemsWithAuthSession } from './use-cart-items-by-account';
import { useCartItemsWithUnauthSession } from './use-cart-items-by-cookie-id';
import { useGetUnauthCartQuery } from 'graphQL/generated/graphql';
import { useQuery } from '@tanstack/react-query';

async function getCookieCartId() {
  const res = await fetch('/api/cart/cookies/create-id', {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json;' },
  });

  return res.json();
}

export const useCartItems = () => {
  //
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const { data: cookie } = useQuery({
    queryKey: ['cookieCartId'],
    queryFn: getCookieCartId,
    enabled: status === 'unauthenticated' ? true : false,
  });

  const cookieCartId: string = cookie?.id;

  const authSession = useCartItemsWithAuthSession({
    setCartItems,
    setIsLoading,
    status,
    session,
    cartItems,
  });

  const unauthSession = useCartItemsWithUnauthSession({
    setCartItems,
    setIsLoading,
    status,
    cookieCartId,
    cartItems,
  });

  const methods = status === 'authenticated' ? authSession : unauthSession;

  return {
    cartItems,
    isLoading,
    addItemToCart: methods.addItemToCart,
    removeItemFromCart: methods.removeItemFromCart,
    clearCartItems: methods.clearCartItems,
  } as const;
};
