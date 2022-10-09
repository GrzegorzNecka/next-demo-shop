import { useState, useEffect } from "react";
import { CartItem } from "components/Cart/types";
import { useSession } from "next-auth/react";
import { useAddItemToCartByCartIdMutation, useGetCartItemsByCartIdQuery } from "graphQL/generated/graphql";

export const useCartItems = () => {
    const session = useSession();
    const cartId = session.data?.user?.cartId!; //"cl7q56m7a1eqp0ateldaehrcs"

    const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // APOLLO
    const { data } = useGetCartItemsByCartIdQuery({
        skip: !Boolean(cartId),
        variables: {
            id: cartId,
        },
        onCompleted: () => {
            setIsLoading(false);
        },
    });

    // todo - po tej mutacji aktualizuje się model "Product" - tak nie powinno być
    // todo - stwórz najpierw pusty cart itme i za pomocą connect połacz się
    // albo stórz pusty cart item z wykorzystaniem cart id oraz quantity a pote
    // przypisz go do cart oraz product

    const [addItemToCartByCartIdMutation] = useAddItemToCartByCartIdMutation({});

    useEffect(() => {
        if (session.status !== "authenticated" || !data || !data.cart) {
            return;
        }

        const initialCartItems = data.cart.cartItems.map((item) => {
            console.log("ditem?.product?.id", item?.id);
            return {
                id: item?.product?.id!, //! czy item.id
                price: item?.product?.price!,
                title: item?.product?.name!, // todo title zmień na name
                count: item.quantity!, //todo zmień na quantity
                imgUrl: item.product?.images.at(0)?.url!,
                slug: item.product?.slug!,
            };
        });

        setCartItems(initialCartItems);
    }, [session.status, data]);

    // ---------------- handleAddItemToCart React Context

    const handleAddItemToCart = (product: CartItem) => {
        if (!cartId) {
            return;
        }

        setIsLoading(true);

        const productId = product.id;

        addItemToCartByCartIdMutation({
            variables: {
                cartId,
                productId,
            },
        });
    };

    const removeItems = (id: CartItem["id"]) => {};

    return [cartItems, isLoading, handleAddItemToCart, removeItems] as const;
};
