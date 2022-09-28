import { createContext, useEffect, useState } from "react";
import { CartItem, CartState } from "components/Cart/types";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useGetCartItemsByCartIdQuery } from "graphQL/generated/graphql";

export const CartStateContext = createContext<CartState | null>(null);

// ----------------- Provider
export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    console.log("-----render context-----------");
    // const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // const session = useSession();
    // const isCartId = Boolean(session.data?.user?.cartId);

    // const { data, refetch } = useGetCartItemsByCartIdQuery({
    //     skip: !isCartId,
    //     variables: {
    //         id: session.data?.user?.cartId!,
    //         // id: "cl7q56m7a1eqp0ateldaehrcs",
    //     },
    // });

    // useEffect(() => {
    //     if (session.status !== "authenticated" || !data || !data.cart) {
    //         return;
    //     }

    //     console.log(data);

    //     const initialCartItems = data.cart.cartItems.map((item) => {
    //         return {
    //             id: item.product!.id,
    //             price: item.product!.price,
    //             title: item.product!.name,
    //             count: item.quantity,
    //             imgUrl: item.product!.images[0].url,
    //             slug: item.product!.slug,
    //         };
    //     });

    //     setCartItems(initialCartItems);
    // }, [data, session]);

    // const handleAddItemToCart = (item: CartItem) => {
    //     console.log(item);
    //     refetch();
    // };

    return (
        <CartStateContext.Provider
            value={{
                items: [],
                total: 0,
                addItemToCart: (item) => {
                    // handleAddItemToCart(item);
                },
            }}
        >
            {children}
        </CartStateContext.Provider>
    );
};

// ----------------- Client

export const useCartState = () => {
    const cartState = useContext(CartStateContext);

    const itemsLength = cartState?.items.map((obj) => obj.count);
    const total = itemsLength?.reduce((prev, current) => prev + current, 0);

    return { ...cartState, total };
};
