// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartItem } from "context/types";
import type { NextApiHandler } from "next";

type Token = {
    token: string;
};

interface Data {
    status: string;
    cartItems?: CartItem[];
    error?: string;
}
interface State {
    token: string;
    cartItems: CartItem[];
}

const STATE: State[] = [];

const dispatch = (token: string, cartItems: CartItem[]) => {
    STATE.push({
        token,
        cartItems,
    });
};

const cartItemHandler: NextApiHandler = async (req, res) => {
    //_
    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
    }

    const { token } = req.body;

    const isTokenExist = STATE.find((item) => item.token === token);

    if (!isTokenExist) {
        dispatch(token, []);
    }

    console.log("🚀 ~ STATE", STATE);

    const result: CartItem[] = [];

    //co jeśli będzie taki sam token - obsłuż

    res.status(200).json({ result });
    return;
};

export default cartItemHandler;
