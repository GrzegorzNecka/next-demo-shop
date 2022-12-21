import type { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCartItemsWithAuthSession } from "./use-auth-session";
import { useCartItemsWithUnauthSession } from "./use-unauth-session";
import { useGetUnauthCartQuery } from "graphQL/generated/graphql";
import { useQuery } from "@tanstack/react-query";

export const useCartItems = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status, data: session } = useSession();

    async function getCookieCartId() {
        const res = await fetch("/api/cart/cookies/create-unauth-session-id", {
            method: "GET",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json;" },
        });

        return res.json();
    }

    const { data: cookie, refetch: refetchCookieId } = useQuery({
        queryKey: ["cookieCartId"],
        queryFn: getCookieCartId,
        enabled: status === "unauthenticated" ? true : false,
    });

    const cookieCartId: string = cookie?.id;

    const authSession = useCartItemsWithAuthSession({
        setCartItems,
        setIsLoading,
        status,
        session,
    });

    const unauthSession = useCartItemsWithUnauthSession({
        setCartItems,
        setIsLoading,
        status,
        cookieCartId,
        cartItems,
    });

    const methods = status === "authenticated" ? authSession : unauthSession;

    return {
        cartItems,
        isLoading,
        addItemToCart: methods.addItemToCart,
        removeItemFromCart: methods.removeItemFromCart,
        clearCartItems: methods.clearCartItems,
    } as const;
};
