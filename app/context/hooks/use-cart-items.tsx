import { useState, useEffect } from "react";
import { CartItem } from "context/types";
import { useSession } from "next-auth/react";
import { useGetCartItemsByCartIdQuery } from "graphQL/generated/graphql";
import { addToCartItem, clearCart, removeCartItem, updateCartItem } from "services/cart";

export const useCartItems = () => {
    const session = useSession();
    const cartId = session.data?.user?.cartId!; //"cl7q56m7a1eqp0ateldaehrcs"

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

    useEffect(() => {
        if (session.status !== "authenticated" || !data || !data.cart) {
            return;
        }

        if (!cartItems) {
            return; // usówa 1 render
        }

        const initialCartItems = data.cart.cartItems.map((item) => {
            console.log("ditem?.product?.id", item);
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

        setCartItems(initialCartItems);
    }, [session.status, data, cartItems]);

    // ---------------- handleAddItemToCart React Context

    const handleAddItemToCart = async (product: CartItem) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const { productOptionId } = product;

        const existProduct = data.cart?.cartItems.find((item) => item?.option?.id === productOptionId);

        if (!existProduct) {
            const result = await addToCartItem(productOptionId);

            if (result.status === 200) {
                refetch({ id: cartId });
            }

            return;
        }

        const itemId = existProduct?.id!;

        const updatedQuantity = existProduct?.quantity! + product.quantity;

        const result = await updateCartItem(itemId, updatedQuantity);
        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    /* 
    #   
    */

    const handleRemoveCartItem = async (itemId: CartItem["productOptionId"]) => {
        if (!cartId || !data) {
            return;
        }

        setIsLoading(true);

        const existItem = data.cart?.cartItems.find((item) => item.id === itemId);
        if (!existItem) {
            return;
        }

        const result = await removeCartItem(itemId, existItem.quantity);

        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    /* 
    #
    */

    const handleClearCart = async () => {
        if (!cartId || !data) {
            return;
        }

        const result = await clearCart();

        if (result.status === 200) {
            refetch({ id: cartId });
        }
    };

    return [cartItems, isLoading, handleAddItemToCart, handleRemoveCartItem, handleClearCart] as const;
};
