// import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import type { CartItem } from "context/types";

import { CookieValueTypes, getCookie, hasCookie, setCookie } from "cookies-next";

type Cart = [
    {
        readonly userId: CookieValueTypes;
        readonly cartItems: CartItem[];
    }?
];

//-16692083138492bfb8c5fbf9f5

//-1669213217236b1fd7c5b267d1
//-166921336388305f8dac1a1435
//-1669213566667eedceade9c4f4

const CART: Cart = [
    {
        userId: "-16692083138492bfb8c5fbf9f5",
        cartItems: [
            {
                itemId: "-cff1aaecb3798",
                productOptionId: "cl9lewa6nggtc09ueqfsjarb9",
                price: 1999,
                title: "Unisex Long Sleeve Tee",
                quantity: 2,
                imgUrl: "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
                slug: "unisex-long-sleeve-tee",
            },
            {
                itemId: "-b2eeca36b3764",
                productOptionId: "cl9lex90xg1s00auss1yhx1lz",
                price: 1999,
                title: "Unisex Long Sleeve Tee",
                quantity: 2,
                imgUrl: "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
                slug: "unisex-long-sleeve-tee",
            },
            {
                itemId: "-30ec1e9be681c",
                productOptionId: "cl9ley8g2g26f0ausiuilrshf",
                price: 1999,
                title: "Unisex Long Sleeve Tee",
                quantity: 2,
                imgUrl: "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
                slug: "unisex-long-sleeve-tee",
            },
        ],
    },
];

// -------------   -------------   -------------   -------------   -------------   -------------

interface RequestApi {
    readonly action: "get" | "add" | "remove" | "clear";
    readonly product?: CartItem;
    readonly itemId?: string;
}

interface Response {
    readonly message?: string;
    readonly cartItems?: CartItem[];
}

const handler: NextApiHandler<Response> = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const isCookie = hasCookie("local-cart-item-user", { req, res });

    if (!isCookie) {
        setCookie("local-cart-item-user", `-${new Date().getTime()}${Math.random().toString(16).slice(2)}`, {
            // httpOnly: true,
            // secure: true,
            // sameSite: "lax",
            req,
            res,
            maxAge: 60 * 60 * 24,
        });
    }

    const userId = getCookie("local-cart-item-user", { req, res });

    if (!userId) {
        res.status(400).json({ message: "no cookies: local-cart-item-user" });
    }

    const { action, product, itemId }: RequestApi = JSON.parse(req.body);

    switch (action) {
        case "get":
            res.status(200).json({ cartItems: getCartItems(userId) });
            return;
        case "add":
            if (!product) {
                res.status(400).json({ message: "no product in reqeust body" });
                return;
            }

            res.status(200).json({ cartItems: addToCartItems(userId, product) });
            return;
        case "remove":
            if (!itemId) {
                res.status(400).json({ message: "no itemId in reqeust body" });
                return;
            }

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

const findCartItems = (userId: CookieValueTypes) => CART.find((user) => user?.userId === userId);

// -------------   -------------   -------------   -------------   -------------   -------------

const getCartItems = (userId: CookieValueTypes) => {
    const isUserExist = findCartItems(userId);

    console.log("🚀 ~ isUserExist", isUserExist);

    console.log("userId", userId);

    if (!isUserExist) {
        CART.push({
            userId,
            cartItems: [],
        });
    }

    const cart = findCartItems(userId);

    console.log("🚀 getCartItems ~ cart", cart?.cartItems);

    return cart?.cartItems;
};

// -------------   -------------   -------------   -------------   -------------   -------------

const addToCartItems = (userId: CookieValueTypes, product: CartItem | null) => {
    if (!product) {
        return [];
    }

    const isUserExist = findCartItems(userId);
    // console.log("🚀 ~ file: crud-cart-items.ts ~ line 100 ~ addToCartItems ~ isUserExist", isUserExist);

    if (!isUserExist) {
        return [];
    }

    const { cartItems } = isUserExist;
    // console.log("🚀 ~ file: crud-cart-items.ts ~ line 107 ~ addToCartItems ~ cartItems", cartItems);

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

const removeCartItems = (userId: CookieValueTypes, itemId: string) => {
    if (!itemId) {
        return [];
    }

    const isUserExist = findCartItems(userId);

    if (!isUserExist) {
        return [];
    }

    const { cartItems } = isUserExist;

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

const clearCartItems = (userId: CookieValueTypes) => {
    const isUserExist = CART.find((user) => user?.userId === userId);

    if (!isUserExist) {
        return [];
    }

    isUserExist.cartItems.splice(0, isUserExist.cartItems.length);

    const cart = findCartItems(userId);

    return cart?.cartItems;
};

export default handler;
