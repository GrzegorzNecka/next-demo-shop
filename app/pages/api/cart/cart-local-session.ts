import type { NextApiHandler } from "next/types";
import type { CartItem } from "context/types";
import { CookieValueTypes, getCookie, hasCookie, setCookie } from "cookies-next";

type Cart = [
    {
        readonly userId: CookieValueTypes;
        readonly cartItems: CartItem[];
    }?
];

const CART: Cart = [
    {
        userId: "",
        cartItems: [],
    },
];

// -------------   -------------   -------------   -------------   -------------   -------------

interface RequestApi {
    readonly setEmpty?: boolean;
    readonly signIn?: boolean;
    readonly product?: CartItem;
    readonly itemId?: string;
    userId?: CookieValueTypes;
}

interface Response {
    readonly message?: string;
    readonly cartItems?: CartItem[];
}

const handler: NextApiHandler<Response> = async (req, res) => {
    // let { userId }: { userId?: CookieValueTypes } = awaitJSON.parse(req.body);

    const payload = await JSON.parse(req.body);
    console.log("🚀 payload", payload);
    // let userId = payload.userId;

    // if (!payload.userId) {
    //     const isCookie = hasCookie("local-cart-item-user", { req, res });
    //     if (!isCookie) {
    //         setCookie("local-cart-item-user", `-${Math.random().toString(16).slice(2)}`, {
    //             httpOnly: true,
    //             secure: true,
    //             sameSite: "lax",
    //             req,
    //             res,
    //             maxAge: 60 * 60 * 24,
    //         });
    //     }
    //     userId = getCookie("local-cart-item-user", { req, res });
    //     if (!userId) {
    //         res.status(400).json({ message: "no cookies: local-cart-item-user" });
    //     }
    // }

    // const { product, itemId, setEmpty, signIn }: RequestApi = JSON.parse(req.body);

    switch (req.method) {
        case "GET":
        // res.status(200).json({ cartItems: getCartItems(userId) });
        // return;
        case "POST":
        // if (product) {
        //     res.status(200).json({ cartItems: addToCartItems(userId, product) });
        //     return;
        // }

        // if (signIn) {
        //     //get
        //     res.status(200).json({ cartItems: getCartItems(userId) });
        //     return;
        // }

        // res.status(400).json({ message: "no product in reqeust body" });
        // return;

        case "DELETE":
        // if (itemId) {
        //     res.status(200).json({ cartItems: removeCartItems(userId, itemId) });
        //     return;
        // }

        // if (setEmpty) {
        //     res.status(200).json({ cartItems: clearCartItems(userId) });
        //     return;
        // }

        // res.status(400).json({ message: "bad request body" });
        // return;

        default:
            res.status(400).json({ message: "bad request method" });
            return;
    }
};

// ---

const findCartItems = (userId: CookieValueTypes) => CART.find((user) => user?.userId === userId);

// ---

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

// ---

const addToCartItems = (userId: CookieValueTypes, product: CartItem | null) => {
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

// ---

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

// ---

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
