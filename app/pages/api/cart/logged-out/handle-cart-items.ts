import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler, NextApiResponse } from "next/types";
import { CartItem } from "context/types";

type Cart = [
    {
        userId: string;
        cartItems: CartItem[];
    }
];

const CART: Cart = [
    {
        userId: "AAclal3y48wqvub0bt20vq1ojdh",
        cartItems: [
            {
                itemId: "cl9wt0fc9229u0ct7znu8zani",
                quantity: 1,
                price: 1999,
                title: "Unisex Long Sleeve Tee",
                imgUrl: "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
                slug: "unisex-long-sleeve-tee",
                productOptionId: "cl9lewa6nggtc09ueqfsjarb9",
            },
        ],
    },
];

const getCartItems = (userId: string) => {
    const isUserExist = CART.find((user) => user.userId === userId);

    if (!isUserExist) {
        CART.push({
            userId,
            cartItems: [],
        });
    }

    const cart = CART.find((user) => user.userId === userId);

    console.log(CART);

    return cart?.cartItems || [];
};

const addToCartItems = (userId: string, product: CartItem | null) => {
    if (!product) {
        return [];
    }

    const isUserExist = CART.find((user) => user.userId === userId);

    if (!isUserExist) {
        return [];
    }

    const { cartItems } = isUserExist;

    let existItem = cartItems.find((existItem) => {
        if (existItem.productOptionId === product.productOptionId) {
            return existItem;
        }
    });

    if (!existItem) {
        cartItems.push({
            itemId: `-${Math.random().toString(16).slice(2)}`,
            ...product,
        });

        return cartItems;
    }

    existItem.quantity = existItem.quantity + product.quantity;

    return cartItems;
};

const removeCartItems = (userId: string, product: CartItem | null) => {
    if (!product) {
        return [];
    }

    return [];
};

const clearCartItems = (userId: string) => {
    const isUserExist = CART.find((user) => user.userId === userId);

    if (!isUserExist) {
        return [];
    }

    isUserExist.cartItems = [];

    return isUserExist.cartItems;
};

// -------------   -------------   -------------   -------------   -------------   -------------

const handler: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session?.user.cartId) {
        // res.status(400).json({ message: "you have to be logged-out" });
        console.log("czy sesję w tym miejscu powinno się obsługiwać ?");
        return;
    }

    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const { action, product, userId } = JSON.parse(req.body);

    //--------------

    if (action === "get") {
        const cartItems = getCartItems(userId);

        res.status(200).json({ cartItems });

        return;
    }

    if (action === "add") {
        const cartItems = addToCartItems(userId, product);

        res.status(200).json({ cartItems });

        return;
    }

    if (action === "remove") {
        const cartItems = removeCartItems(userId, product);

        res.status(200).json({ cartItems });

        return;
    }

    if (action === "clear") {
        const cartItems = clearCartItems(userId);

        res.status(200).json({ cartItems });

        return;
    }

    res.status(400).json({ message: "bad request action" });
    return;
};

export default handler;
