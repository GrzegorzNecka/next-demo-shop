import type { CartItem } from "context/types";
import { Dispatch, memo, SetStateAction, useRef, useState } from "react";
import { useEffect } from "react";
import { useGetUnauthCartQuery } from "graphQL/generated/graphql";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes } from "cookies-next";
type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "unauthenticated" | "authenticated" | "loading";
};

export const useCartItemsWithUnauthSession = ({ setCartItems, setIsLoading, status }: useCartItemsProps) => {
    //
    const cartItems = useRef<CartItem[]>([]);
    //todo - sprawdź czy codegen może generować typy dla reactQuery
    const { data: cookie, refetch: refetchCookieId } = useQuery({
        queryKey: ["cookieCartId"],
        queryFn: getCookieCartId,
        enabled: status === "unauthenticated" ? true : false,
    });

    const cookieCartId: string = cookie?.id;

    const { data, refetch: refetchCart } = useGetUnauthCartQuery({
        skip: !Boolean(cookieCartId),
        variables: {
            id: cookieCartId,
        },
        onCompleted: async (data) => {
            if (!data.unauthCart && typeof cookieCartId === "string") {
                // if cookieCartId was remove on hygraf and still exist in cookie memory, then renew cookieCartId

                if (!data?.unauthCart && typeof cookieCartId === "string") {
                    const deleteStatus = await deleteCookieCartId(cookieCartId);

                    if (deleteStatus === 200) {
                        refetchCookieId();
                        refetchCart();
                    }
                }
            }

            setIsLoading(false);
        },
        onError(error) {
            console.log("error", error);
        },
    });

    useEffect(() => {
        if (status !== "unauthenticated" || !data) {
            return;
        }

        if (!data?.unauthCart?.cartItems) {
            setCartItems([]);
            return;
        }

        cartItems.current = JSON.parse(data?.unauthCart?.cartItems) || [];

        setCartItems(cartItems.current);
    }, [data]);

    // -- CONTEXT HANDLERS

    const addItemToCart = async (product: CartItem) => {
        if (status !== "unauthenticated") {
            return;
        }

        setIsLoading(true);

        const existCartItem = cartItems.current.find((item) => item.productOptionId === product.productOptionId);

        // -- create new cartItem
        if (!existCartItem) {
            const create = await updateCart(cookieCartId, [...cartItems.current, changeToCartItem(product)]);

            if (create.status === 200) {
                refetchCart({ id: cookieCartId });
            }
            return;
        }

        // -- update cartItem (increase quantity)

        existCartItem.quantity = existCartItem.quantity + product.quantity;

        const restCartItems = cartItems.current.filter((item) => item.productOptionId !== product.productOptionId);

        const increase = await updateCart(cookieCartId, [...restCartItems, existCartItem]);

        if (increase.status === 200) {
            refetchCart({ id: cookieCartId });
        }
        return;
    };

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        if (status !== "unauthenticated") {
            return;
        }

        if (!cartItems.current) {
            return;
        }

        const existCartItem = cartItems.current.find((item) => item.itemId === itemId);

        if (!existCartItem) {
            return;
        }

        setIsLoading(true);

        // --  decrease cartItem quantity

        if (existCartItem.quantity > 1) {
            const updateCartItems = cartItems.current.map((item) => {
                if (item.itemId === itemId) {
                    item.quantity = item.quantity - 1;
                }

                return item;
            });

            const decrease = await updateCart(cookieCartId, updateCartItems);

            if (decrease.status === 200) {
                refetchCart({ id: cookieCartId });
            }
            return;
        }

        // -- delete cartItem

        const restCartItems = cartItems.current.filter((item) => item.itemId !== itemId);
        const remove = await updateCart(cookieCartId, restCartItems);

        if (remove.status === 200) {
            refetchCart({ id: cookieCartId });
        }
        return;
    };

    const clearCartItems = async () => {
        if (status !== "unauthenticated") {
            return;
        }

        if (!cartItems.current) {
            return;
        }

        const clear = await updateCart(cookieCartId, []);

        if (clear.status === 200) {
            refetchCart({ id: cookieCartId });
        }
        return;
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};

// HELPERS

async function getCookieCartId() {
    const res = await fetch("/api/cart/cookies/create-unauth-session-id", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json;" },
    });

    return res.json();
}

async function deleteCookieCartId<T>(id: T) {
    const deleteCookieId = await fetch("/api/cart/cookies/delete-unauth-session-id", {
        method: "DELETE",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            id,
        }),
    });

    return deleteCookieId.status;
}

function changeToCartItem(item: CartItem) {
    return {
        itemId: `-${Math.random().toString(16).slice(2)}`,
        quantity: item?.quantity!,
        price: item?.price!,
        title: item?.title!,
        imgUrl: item?.imgUrl!,
        slug: item?.slug!,
        productOptionId: item?.productOptionId!,
    };
}

async function updateCart<T, U>(id: T, product: U) {
    const result = await fetch("/api/cart/unauth-session", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            id,
            product,
        }),
    });
    return result;
}
