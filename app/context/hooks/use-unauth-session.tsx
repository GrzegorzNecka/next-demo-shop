import type { CartItem } from "context/types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetUnauthCartQuery } from "graphQL/generated/graphql";
import { useQuery } from "@tanstack/react-query";
import { CookieValueTypes } from "cookies-next";
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

const updateUnauthCart = async (id: CookieValueTypes, product: CartItem[]) => {
    const result = await fetch("/api/cart/unauth-session", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            id,
            product,
        }),
    });
    return result;
};

const createUnauthCartItem = (item: CartItem) => {
    return {
        itemId: `-${Math.random().toString(16).slice(2)}`,
        quantity: item?.quantity!,
        price: item?.price!,
        title: item?.title!,
        imgUrl: item?.imgUrl!,
        slug: item?.slug!,
        productOptionId: item?.productOptionId!,
    };
};

export const useCartItemsWithUnauthSession = ({ setCartItems, setIsLoading }: useCartItemsProps) => {
    const session = useSession();

    const cookie = useQuery({ queryKey: ["cookieCartId"], queryFn: getCookies });

    const { data, refetch } = useGetUnauthCartQuery({
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

    const cartItems = useRef<CartItem[]>([]);

    useEffect(() => {
        if (session.status !== "unauthenticated" || !data) {
            return;
        }

        //! try catch

        if (!data?.unauthCart?.cartItems) {
            setCartItems([]);
            return;
        }

        cartItems.current = JSON.parse(data?.unauthCart?.cartItems) || [];

        setCartItems(cartItems.current);

        console.log(cartItems.current);
    }, [data]);

    // add to cart and update cart

    const addItemToCart = async (product: CartItem) => {
        if (session.status !== "unauthenticated") {
            return;
        }

        setIsLoading(true);

        if (!cartItems.current) {
            const result = await updateUnauthCart(cookie.data?.id, [createUnauthCartItem(product)]);

            if (result.status === 200) {
                refetch({ id: cookie.data?.id });
            }
            return;
        }

        const existCartItem = cartItems.current.find((item) => item.productOptionId === product.productOptionId);

        //update - increase

        if (existCartItem) {
            const updateCartItem = { ...existCartItem };
            updateCartItem.quantity = updateCartItem.quantity + product.quantity;

            const restCartItems = cartItems.current.filter((item) => item.productOptionId !== product.productOptionId);

            const result = await updateUnauthCart(cookie.data?.id, [
                ...restCartItems,
                createUnauthCartItem(updateCartItem),
            ]);

            if (result.status === 200) {
                refetch({ id: cookie.data?.id });
            }
            return;
        }

        //add new item

        const result = await updateUnauthCart(cookie.data?.id, [...cartItems.current, product]);

        if (result.status === 200) {
            refetch({ id: cookie.data?.id });
        }
        return;
    };

    //- remove cart item

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        if (session.status !== "unauthenticated") {
            return;
        }

        if (!cartItems.current) {
            return;
        }

        const existCartItem = cartItems.current.find((item) => item.itemId === itemId);

        if (!existCartItem) {
            return;
        }

        // decrease

        if (existCartItem.quantity > 1) {
            const updateCartItems = cartItems.current.map((item) => {
                if (item.itemId === itemId) {
                    item.quantity = item.quantity - 1;
                }

                return item;
            });

            const result = await updateUnauthCart(cookie.data?.id, updateCartItems);

            if (result.status === 200) {
                refetch({ id: cookie.data?.id });
            }
            return;
        }

        //clear whole item

        const restCartItems = cartItems.current.filter((item) => item.itemId !== itemId);
        const result = await updateUnauthCart(cookie.data?.id, restCartItems);

        if (result.status === 200) {
            refetch({ id: cookie.data?.id });
        }
        return;
    };

    //- clear cart

    const clearCartItems = async () => {
        if (session.status !== "unauthenticated") {
            return;
        }

        if (!cartItems.current) {
            return;
        }

        const result = await updateUnauthCart(cookie.data?.id, []);

        if (result.status === 200) {
            refetch({ id: cookie.data?.id });
        }
        return;
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
