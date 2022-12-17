import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    UpdateUnauthCartByIdDocument,
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables,
} from "graphQL/generated/graphql";

const handleCartSession: NextApiHandler = async (req, res) => {
    const payload = await JSON.parse(req.body);

    switch (req.method) {
        case "POST":
            if (!payload.id && typeof payload.id !== "string") {
                res.status(400).json({ message: "bad request body" });
                return;
            }

            const updateCartItem = await authApolloClient.mutate<
                UpdateUnauthCartByIdMutation,
                UpdateUnauthCartByIdMutationVariables
            >({
                mutation: UpdateUnauthCartByIdDocument,
                variables: {
                    id: payload.id,
                    cartItems: `${JSON.stringify(payload.product)}`,
                },
            });

            res.status(200).json({ updateCartItem });

            return;

        default:
            res.status(400).json({ message: "bad request method" });
            return;
    }
};

export default handleCartSession;
