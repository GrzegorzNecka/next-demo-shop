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
    //todo - sprawdź czy codegen może generować typy dla reactQuery

    const { data: cookie } = useQuery({
        queryKey: ["cookieCartId"],
        queryFn: getCookies,
        enabled: status === "unauthenticated" ? true : false,
    });

    const cookieId: string = cookie?.id;

    const { data, refetch } = useGetUnauthCartQuery({
        skip: !Boolean(cookieId),
        variables: {
            id: cookieId,
        },
        onCompleted: () => {
            setIsLoading(false);
        },
        onError(error) {
            console.log("error", error);
        },
    });

    const cartItems = useRef<CartItem[]>([]);

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

        if (!cartItems.current) {
            const result = await updateUnauthCart(cookieId, [createUnauthCartItem(product)]);

            if (result.status === 200) {
                refetch({ id: cookieId });
            }
            return;
        }

        const existCartItem = cartItems.current.find((item) => item.productOptionId === product.productOptionId);

        // -- update - increase quantity

        if (existCartItem) {
            const updateCartItem = { ...existCartItem };
            updateCartItem.quantity = updateCartItem.quantity + product.quantity;

            const restCartItems = cartItems.current.filter((item) => item.productOptionId !== product.productOptionId);

            const result = await updateUnauthCart(cookieId, [...restCartItems, createUnauthCartItem(updateCartItem)]);

            if (result.status === 200) {
                refetch({ id: cookieId });
            }
            return;
        }

        // -- add new item

        const result = await updateUnauthCart(cookieId, [...cartItems.current, product]);

        if (result.status === 200) {
            refetch({ id: cookieId });
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

        // --  decrease quantity

        if (existCartItem.quantity > 1) {
            const updateCartItems = cartItems.current.map((item) => {
                if (item.itemId === itemId) {
                    item.quantity = item.quantity - 1;
                }

                return item;
            });

            const result = await updateUnauthCart(cookieId, updateCartItems);

            if (result.status === 200) {
                refetch({ id: cookieId });
            }
            return;
        }

        // -- clear whole item

        const restCartItems = cartItems.current.filter((item) => item.itemId !== itemId);
        const result = await updateUnauthCart(cookieId, restCartItems);

        if (result.status === 200) {
            refetch({ id: cookieId });
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

        const result = await updateUnauthCart(cookieId, []);

        if (result.status === 200) {
            refetch({ id: cookieId });
        }
        return;
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};

// HELPERS

async function getCookies() {
    const res = await fetch("/api/cart/get-unauth-token", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json;" },
    });

    return res.json();
}

async function updateUnauthCart<T, U>(id: T, product: U) {
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

function createUnauthCartItem<T extends CartItem>(item: T) {
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
