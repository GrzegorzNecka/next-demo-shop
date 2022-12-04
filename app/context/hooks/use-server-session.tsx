import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import { GetCartItemsByCartIdQuery, useGetCartItemsByCartIdQuery } from "graphQL/generated/graphql";
// import { handleAddItemToCart, handleClearCartItems, handleRemoveItemFromCart, updateCartItem } from "services/cart";

type useCartItemsProps = {
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const useCartItemsWithGraphQl = ({ setCartItems, setIsLoading }: useCartItemsProps) => {
    const session = useSession();
    const cartId = session.data?.user?.cartId!; //"cl7q56m7a1eqp0ateldaehrcs"

    // -------------   -------------   -------------   -------------   -------------   -------------

    const { data, refetch } = useGetCartItemsByCartIdQuery({
        skip: !Boolean(cartId), // jeśli nie ma sesji przerywa
        variables: {
            id: cartId,
        },
        onCompleted: () => {
            setIsLoading(false);
        },
        onError(error) {
            console.log("error", error);
        },
    });

    // -------------   -------------   -------------   -------------   -------------   -------------

    useEffect(() => {
        if (session.status !== "authenticated" || !data || !data.cart) {
            return;
        }
        // console.log("🚀 ~ file: use-cart-items-logged-in.tsx ~ line 31 ~ useCartItemsWithGraphQl ~ data", data);
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
        // console.log("🚀 ~ file: use-cart-items-logged-in.tsx ~ line 50 ~ cartItems ~ cartItems", cartItems);

        setCartItems(cartItems);

        //-
    }, [session.status, data]);

    // -------------   -------------   -------------   -------------   -------------   -------------

    const addItemToCart = async (product: CartItem) => {
        if (session.status === "unauthenticated" || !cartId || !data) {
            return;
        }

        // console.log("🚀 ~ file: use-cart-items-logged-in.tsx ~ line 60 ~ addItemToCart ~ product", product);

        setIsLoading(true);

        const { productOptionId, quantity } = product;

        const existProduct = data.cart?.cartItems.find((item) => item?.option?.id === productOptionId);

        if (!existProduct) {
            const result = await fetch("/api/cart/cart-server-session", {
                method: "POST",
                headers: { "Content-Type": "application/json;" },
                body: JSON.stringify({
                    productOptionId,
                    quantity,
                }),
            });

            if (result.status === 200) {
                refetch({ id: cartId });
            }

            return;
        }

        const itemId = existProduct?.id!;

        const updatedQuantity = existProduct?.quantity! + quantity;

        const result = await fetch("/api/cart/cart-server-session", {
            method: "PUT",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                itemId,
                updatedQuantity,
            }),
        });
        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    // -------------   -------------   -------------   -------------   -------------   -------------

    const removeItemFromCart = async (itemId: CartItem["productOptionId"]) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const existItem = data.cart?.cartItems.find((item) => item.id === itemId);
        if (!existItem) {
            return;
        }

        //! pisz poprawne nagłówki REST!!!
        const result = await fetch("/api/cart/cart-server-session", {
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

    // -------------   -------------   -------------   -------------   -------------   -------------

    const clearCartItems = async () => {
        if (!cartId || !data) {
            return;
        }

        //! pisz poprawne nagłówki REST!!!
        const result = await fetch("/api/cart/cart-server-session", {
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
