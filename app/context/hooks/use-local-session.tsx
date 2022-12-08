import type { CartItem } from "context/types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetLocalCartQuery } from "graphQL/generated/graphql";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const getCookies = async () => {
    const res = await fetch("/api/cart/cookies", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json;" },
    });

    return res.json();
};

export const useCartItemsWithLocalStorage = ({ setCartItems, setIsLoading }: useCartItemsProps) => {
    const session = useSession();

    const cookie = useQuery({ queryKey: ["cookieId"], queryFn: getCookies });

    const { data, refetch } = useGetLocalCartQuery({
        skip: !Boolean(cookie.data?.id),
        variables: {
            id: cookie.data?.id,
        },
        onCompleted: () => {
            setIsLoading(false);
        },
        onError(error) {
            console.log("error", error);
        },
    });

    useEffect(() => {
        if (session.status !== "unauthenticated" || !data) {
            return;
        }

        // const cartItems = JSON.parse(data?.cartLocal?.cartItem);
        // console.log("🚀 ~ file: use-local-session.tsx:47 ~ useEffect ~ cartItems", cartItems);

        const localCartItems: CartItem[] | undefined = JSON.parse(data?.cartLocal?.cartItem);

        if (!localCartItems) {
            setCartItems([]);
            return;
        }

        const cartItems = localCartItems.map((item) => {
            return {
                itemId: `-${Math.random().toString(16).slice(2)}`,
                quantity: item?.quantity!,
                price: item?.price!,
                title: item?.title!,
                imgUrl: item?.imgUrl!,
                slug: item?.slug!,
                productOptionId: item?.productOptionId!,
            };
        });

        setCartItems(cartItems);

        console.log(`data local cartItems from cookies id = ${cookie.data?.id}`, data?.cartLocal?.cartItem);
    }, [data]);

    const addItemToCart = async (product: CartItem) => {
        console.log("🚀 ~ file: use-local-session.tsx:69 ~ addItemToCart ~ product", product);

        const result = await fetch("/api/cart/local-session", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                id: cookie.data?.id,
                product: [product],
            }),
        });

        console.log(result);
        if (result.status === 200) {
            refetch({ id: cookie.data?.id });
        }

        /*
        {
            "productOptionId": "cl9lewa6nggtc09ueqfsjarb9",
            "price": 1999,
            "title": "Unisex Long Sleeve Tee",
            "quantity": 1,
            "imgUrl": "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
            "slug": "unisex-long-sleeve-tee"
        }
        */
    };

    // ---

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {};

    // ---

    const clearCartItems = async () => {};

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
