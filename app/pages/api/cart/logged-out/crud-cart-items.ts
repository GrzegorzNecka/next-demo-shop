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

// -------------   -------------   -------------   -------------   -------------   -------------

const handler: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session) {
        return;
    }

    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const { action, product, userId, itemId } = JSON.parse(req.body);

    switch (action) {
        case "get":
            res.status(200).json({ cartItems: getCartItems(userId) });
            return;
        case "add":
            res.status(200).json({ cartItems: addToCartItems(userId, product) });
            return;
        case "remove":
            // removeCartItems(userId, itemId);
            res.status(200).json({ cartItems: removeCartItems(userId, itemId) });
            return;
        case "clear":
            res.status(200).json({ cartItems: clearCartItems(userId) });
            return;
        default:
            res.status(400).json({ message: "bad request action" });
            return;
    }
};

// -------------   -------------   -------------   -------------   -------------   -------------

const findCartItems = (userId: string) => CART.find((user) => user.userId === userId);

// -------------   -------------   -------------   -------------   -------------   -------------

const getCartItems = (userId: string) => {
    const isUserExist = findCartItems(userId);

    if (!isUserExist) {
        CART.push({
            userId,
            cartItems: [],
        });
    }

    const cart = findCartItems(userId);

    return cart?.cartItems;
};

// -------------   -------------   -------------   -------------   -------------   -------------

const addToCartItems = (userId: string, product: CartItem | null) => {
    if (!product) {
        return [];
    }

    const isUserExist = findCartItems(userId);

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

    const cart = findCartItems(userId);

    return cart?.cartItems;
};

// -------------   -------------   -------------   -------------   -------------   -------------

const removeCartItems = (userId: string, itemId: string) => {
    if (!itemId) {
        return [];
    }

    const isUserExist = findCartItems(userId);

    if (!isUserExist) {
        return [];
    }

    const { cartItems } = isUserExist;
    console.log("🚀 ~  cartItems ", cartItems);

    let index;
    let existItem = cartItems.find((existItem, i) => {
        if (existItem.itemId === itemId) {
            index = i;
            return existItem;
        }
    });

    if (!existItem) {
        return [];
    }

    if (index !== undefined && existItem?.quantity === 1) {
        cartItems.splice(index, index + 1);
    }

    existItem.quantity = existItem.quantity - 1;

    const cart = findCartItems(userId);

    return cart?.cartItems;
};

// -------------   -------------   -------------   -------------   -------------   -------------

const clearCartItems = (userId: string) => {
    const isUserExist = CART.find((user) => user.userId === userId);

    if (!isUserExist) {
        return [];
    }

    isUserExist.cartItems = [];

    const cart = findCartItems(userId);

    return cart?.cartItems;
};

export default handler;
