import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { CartItem } from "context/types";
// import { useSession } from "next-auth/react";
import { useGetCartItemsByCartIdQuery } from "graphQL/generated/graphql";
import { Session } from "next-auth";
import { apolloClient } from "graphQL/apolloClient";

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    status: "unauthenticated" | "authenticated" | "loading";
    session: Session | null;
};

export const useCartItemsWithAuthSession = ({ setCartItems, setIsLoading, status, session }: useCartItemsProps) => {
    const cartId = session?.user?.cartId!;

    // --

    const { data, refetch } = useGetCartItemsByCartIdQuery({
        skip: !Boolean(cartId),
        variables: {
            id: cartId,
        },
        // fetchPolicy: "network-only",
        fetchPolicy: "cache-and-network",

        onCompleted: () => {
            // setIsLoading(false);
        },
        onError(error) {
            console.log("error", error);
        },
    });

    // --

    useEffect(() => {
        if (status !== "authenticated" || !data || !data.cart) {
            return;
        }

        const cartItems = data.cart.cartItems.map((item) => {
            return {
                itemId: item.id,
                quantity: item?.quantity!,
                price: item?.option?.product?.price!,
                title: item?.option?.product?.name!,
                imgUrl: item?.option?.product?.images.at(0)?.url!,
                slug: item?.option?.product?.slug!,
                productOptionId: item?.option?.id!,
            };
        });

        setCartItems(cartItems);
    }, [status, data]);

    // -- CONTEXT HANDLERS

    const addItemToCart = async (product: CartItem) => {
        if (status === "unauthenticated" || !cartId || !data) {
            return;
        }
        setIsLoading(true);
        const { productOptionId, quantity } = product;

        const existProduct = data.cart?.cartItems.find((item) => item?.option?.id === productOptionId);

        // -- add new product to cart items

        if (!existProduct) {
            const result = await fetch("/api/cart/auth-session", {
                method: "POST",
                headers: { "Content-Type": "application/json;" },
                body: JSON.stringify({
                    productOptionId,
                    quantity,
                }),
            });

            if (result.status === 200) {
                refetch({ id: cartId });
                setIsLoading(false);

                // await apolloClient.refetchQueries({
                //     include: "active",
                // });
                //! można spróbować w tym miejscu dodać optimistic update
                const optimistic = await result.json();
                console.log("🚀 ~  optimistic", optimistic);
            }

            return;
        }

        // -- update cart items

        const result = await fetch("/api/cart/auth-session", {
            method: "PUT",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                itemId: existProduct?.id!,
                updatedQuantity: existProduct?.quantity! + quantity,
            }),
        });
        if (result.status === 200) {
            setIsLoading(false);
            refetch({ id: cartId });

            // await apolloClient    // refetchQueries: [
            //     {
            //         query: GetCartItemsByCartIdDocument,
            //         variables: { id: cartId },
            //     },
            // ],

            //! można spróbować w tym miejscu dodać optimistic update
            const optimistic = await result.json();
            console.log("🚀 ~  optimistic", optimistic);
        }
    };

    // --

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const existItem = data.cart?.cartItems.find((item) => item.id === itemId);
        if (!existItem) {
            return;
        }

        const result = await fetch("/api/cart/auth-session", {
            method: "DELETE",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                itemId,
                quantity: existItem.quantity,
            }),
        });

        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    // --

    const clearCartItems = async () => {
        if (!cartId || !data) {
            return;
        }

        const result = await fetch("/api/cart/auth-session", {
            method: "DELETE",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                setEmpty: true,
            }),
        });

        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    return { addItemToCart, removeItemFromCart, clearCartItems } as const;
};
