import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler, NextApiResponse } from "next/types";
import { CartItem } from "context/types";

const CART = [
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

const temporaryCartItems = [
    {
        itemId: "cl9wt0fc9229u0ct7znu8zani",
        quantity: 1,
        price: 1999,
        title: "Unisex Long Sleeve Tee",
        imgUrl: "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
        slug: "unisex-long-sleeve-tee",
        productOptionId: "cl9lewa6nggtc09ueqfsjarb9",
    },
];

const convertTocartItem = (product: CartItem) => {
    return {
        itemId: `-itemId ${new Date().getTime()}${Math.random().toString(16).slice(2)}`,
        quantity: product?.quantity!,
        price: product?.price!,
        title: product?.title!,
        imgUrl: product?.imgUrl,
        slug: product?.slug!,
        productOptionId: product?.productOptionId!,
    };
};

const getCartItems = (userId: string) => {
    const isUserExist = CART.find((user) => user.userId === userId);

    if (!isUserExist) {
        CART.push({
            userId,
            cartItems: [],
        });
    }

    const cart = CART.find((user) => user.userId === userId);

    return cart?.cartItems || [];
};

const addItemToCartHandler: NextApiHandler = async (req, res) => {
    //_
    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const { action, product, userId } = JSON.parse(req.body);

    const cartItem = convertTocartItem(product) || null;

    if (action === "get") {
        const cartItems = getCartItems(userId);

        res.status(200).json({
            cartItems,
        });

        return;
    }

    if (action === "add") {
        // console.log(" cartItem", cartItem);
        // const isUser = CART.find((obj) => obj.userId === userId);

        res.status(200).json({ CartItems: [cartItem] });
        // console.log("🚀 ~~ isUser", isUser);
        return;
    }

    // const session = await unstable_getServerSession(req, res, authOptions);

    // if (!session?.user.cartId) {
    //     res.status(400).json({ message: "you have to be logged" });
    //     return;
    // }

    // const cartId = session.user.cartId;
    // // todo nie ma typów dla productOptionId, quantity
    // const { productOptionId, quantity } = await JSON.parse(req.body);

    // if (!productOptionId && !quantity) {
    //     res.status(400).json({ message: "productOptionId is required" });
    // }

    res.status(400).json({ message: "bad request action" });
    return;
};

export default addItemToCartHandler;
