import { useState, useEffect } from "react";
import { CartItem } from "components/Cart/types";
import { useSession } from "next-auth/react";
import {
    useAddItemToCartByCartIdMutation,
    useClearCartItemsMutation,
    useGetCartItemsByCartIdQuery,
    useRemoveItemFromCartByCartIdMutation,
    useUpdateItemQuantityByCartIdMutation,
} from "graphQL/generated/graphql";
import { apolloClient } from "graphQL/apolloClient";
import { add } from "services/cart";

export const useCartItems = () => {
    const session = useSession();
    const cartId = session.data?.user?.cartId!; //"cl7q56m7a1eqp0ateldaehrcs"

    const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // APOLLO
    const { data, refetch } = useGetCartItemsByCartIdQuery({
        skip: !Boolean(cartId),
        variables: {
            id: cartId,
        },
        onCompleted: () => {
            setIsLoading(false);
            // apolloClient.refetchQueries()
        },
    });

    // todo - po tej mutacji aktualizuje się model "Product" - tak nie powinno być
    // todo - stwórz najpierw pusty cart itme i za pomocą connect połacz się
    // todo - (useMemo)[https://kattya.dev/articles/2021-04-17-fixing-re-renders-when-using-context-in-react/]
    // albo stórz pusty cart item z wykorzystaniem cart id oraz quantity a pote
    // przypisz go do cart oraz product

    const [addItemToCartByCartIdMutation] = useAddItemToCartByCartIdMutation({});
    const [removeItemFromCartByCartIdMutation] = useRemoveItemFromCartByCartIdMutation({});
    const [updateItemQuantityByCartIdMutation] = useUpdateItemQuantityByCartIdMutation({});
    const [clearCartItemsMutation] = useClearCartItemsMutation({});

    useEffect(() => {
        if (session.status !== "authenticated" || !data || !data.cart) {
            return;
        }

        const initialCartItems = data.cart.cartItems.map((item) => {
            console.log("ditem?.product?.id", item);
            return {
                itemId: item.id,
                quantity: item.quantity!,
                productId: item?.product?.id!,
                price: item?.product?.price!,
                title: item?.product?.name!,
                imgUrl: item.product?.images.at(0)?.url!,
                slug: item.product?.slug!,
                // option: item.product?.option! ,
                option: "nie istnieje w koszyku",
            };
        });

        setCartItems(initialCartItems);
    }, [session.status, data]);

    // ---------------- handleAddItemToCart React Context

    const handleAddItemToCart = async (product: CartItem) => {
        console.log("🚀 ~  ~ product", product);
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const { productId } = product;

        // const add = async () =>
        //     await fetch("/api/cart/add", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json;" },
        //         body: JSON.stringify({
        //             productId,
        //         }),
        //     });

        const existProduct = data.cart?.cartItems.find((item) => item?.product?.id === productId);

        if (!existProduct) {
            // addItemToCartByCartIdMutation({
            //     variables: {
            //         cartId,
            //         productId,
            //     },
            // });
            const result = await add(productId);

            if (result.status === 200) {
                refetch({ id: cartId });
            }

            return;
        }

        const itemId = existProduct?.id!;

        updateItemQuantityByCartIdMutation({
            variables: {
                cartId,
                itemId,
                quantity: existProduct?.quantity! + product.quantity,
            },
        });
    };

    const handleRemoveItemFromCart = (itemId: CartItem["productId"]) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const item = data.cart?.cartItems.find((item) => {
            return item.id === itemId;
        });
        if (!item) {
            return;
        }

        if (item.quantity > 1) {
            updateItemQuantityByCartIdMutation({
                variables: {
                    cartId,
                    itemId,
                    quantity: item.quantity - 1,
                },
            });

            return;
        }

        removeItemFromCartByCartIdMutation({
            variables: {
                cartId,
                itemId,
            },
        });
    };

    const handleClearCartItems = () => {
        if (!cartId || !data) {
            return;
        }

        clearCartItemsMutation({
            variables: {
                cartId,
            },
        });
    };

    return [cartItems, isLoading, handleAddItemToCart, handleRemoveItemFromCart, handleClearCartItems] as const;
};
