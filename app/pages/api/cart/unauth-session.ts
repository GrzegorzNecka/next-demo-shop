import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    UpdateUnauthCartByIdDocument,
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables,
} from "graphQL/generated/graphql";

const handleCartSession: NextApiHandler = async (req, res) => {
    //! przydało by się zabezpieczyć

    //! gdzie syntax try catch - chyba w fetchu zwykłym

    //! przydało by się zabezpieczyć

    const payload = await JSON.parse(req.body);

    switch (req.method) {
        case "POST":
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
