import type { CartItem } from 'context/types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { cartItemsByAccount } from 'context/utils/cart-items-by-account';
import { cartItemsByCookieId } from 'context/utils/cart-items-by-cookie-id';
import { useQuery } from '@tanstack/react-query';

export const useCartItems = () => {
    //
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status } = useSession();

    const { data: cookie }: { data: { id: string } | undefined } = useQuery({
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

    const byAccount = cartItemsByAccount({
        setCartItems,
        setIsLoading,
        cartItems,
    });

    const byCookieId = cartItemsByCookieId({
        setCartItems,
        setIsLoading,
        cookieCartId: cookie?.id!,
        cartItems,
    });

    const methods = status === 'authenticated' ? byAccount : byCookieId;

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
