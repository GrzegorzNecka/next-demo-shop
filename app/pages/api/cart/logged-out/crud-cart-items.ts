import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import type { CartItem } from "context/types";

type Cart = [
    {
        readonly userId: string;
        readonly cartItems: CartItem[];
    }?
];

const CART: Cart = [
    {
        userId: "-166876594586485471ee0eeffd",
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
    readonly userId: string;
    readonly itemId?: string;
}

interface Response {
    readonly message?: string;
    readonly cartItems?: CartItem[];
}

const handler: NextApiHandler<Response> = async (req, res) => {
    // const session = await unstable_getServerSession(req, res, authOptions);

    // if (session) {
    //     return;
    // }

    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const { action, product, userId, itemId }: RequestApi = JSON.parse(req.body);

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

const findCartItems = (userId: string) => CART.find((user) => user?.userId === userId);

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

const removeCartItems = (userId: string, itemId: string) => {
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

const clearCartItems = (userId: string) => {
    const isUserExist = CART.find((user) => user?.userId === userId);

    if (!isUserExist) {
        return [];
    }

    isUserExist.cartItems.splice(0, isUserExist.cartItems.length);

    const cart = findCartItems(userId);

    return cart?.cartItems;
};

export default handler;
