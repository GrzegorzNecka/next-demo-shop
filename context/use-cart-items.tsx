import type { CartItem } from 'types/context';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cartItemsByAccount } from 'utils/context/by-account';
import { cartItemsByCookieId } from 'utils/context/by-cookie-id';

export const useCartItems = () => {
    //
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { status } = useSession();

    //  type QueryCookieData = { data: { id: string } | undefined };

    const { data: cookie } = useQuery({
        queryKey: ['cookieCartId'],
        queryFn: async () => {
            const res = await fetch('/api/cookies/get-cookie-cart-id', {
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json;' },
            });

            return res.json();
        },
        enabled: status === 'unauthenticated' ? true : false,
    });

    const cookieCartId: string | undefined = cookie?.id;

    // aktualizacja stanu wewnątrz funkcji
    const byAccount = cartItemsByAccount({
        setCartItems,
        setIsLoading,
        cartItems,
    });

    // aktualizacja stanu wewnątrz funkcji
    const byCookieId = cartItemsByCookieId({
        setCartItems,
        setIsLoading,
        cookieCartId,
        cartItems,
    });

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        if (status === 'authenticated') {
            byAccount.updateCartItems();
        }

        if (status === 'unauthenticated' && typeof cookieCartId === 'string') {
            byCookieId.updateCartItems();
        }

        return;
    }, [status, cookieCartId]);

    const methods = status === 'authenticated' ? byAccount : byCookieId;

    return {
        cartItems,
        isLoading,
        addItemToCart: methods.addItemToCart,
        removeItemFromCart: methods.removeItemFromCart,
        clearCartItems: methods.clearCartItems,
    } as const;
};
