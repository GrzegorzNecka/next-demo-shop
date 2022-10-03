import { createContext, useEffect, useRef, useState } from "react";
import { CartItem, CartState } from "components/Cart/types";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useGetCartItemsByCartIdQuery } from "graphQL/generated/graphql";

export const CartStateContext = createContext<CartState | null>(null);

// ----------------- Provider
export const CartStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    console.log("-----render context-----------");

    const session = useSession();
    const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

    const { data } = useGetCartItemsByCartIdQuery({
        variables: {
            id: session.data?.user?.cartId!,
            // id: "cl7q56m7a1eqp0ateldaehrcs",
        },
    });

    useEffect(() => {
        if (session.status !== "authenticated" || !data || !data.cart) {
            return;
        }

        const initialCartItems = data.cart.cartItems.map((item) => {
            return {
                id: item.product!.id,
                price: item.product!.price,
                title: item.product!.name,
                count: item.quantity,
                imgUrl: item.product!.images[0].url,
                slug: item.product!.slug,
            };
        });

        setCartItems(initialCartItems);
    }, [session.status, data]);

    // ------

    const handleAddItemToCart = (item: CartItem) => {
        console.log(item);
    };

    const initialCartState: CartState = {
        items: cartItems || [],
        total: 0,
        addItemToCart: (item) => {
            handleAddItemToCart(item);
        },
    };

    return <CartStateContext.Provider value={initialCartState}>{children}</CartStateContext.Provider>;
};

// ----------------- Client

export const useCartState = () => {
    const cartState = useContext(CartStateContext);

    const itemsLength = cartState?.items.map((obj) => obj.count);
    const total = itemsLength?.reduce((prev, current) => prev + current, 0);

    if (!cartState) {
        throw new Error("you forgot CartStateContextProvider");
    }

    return { ...cartState, total };
};
