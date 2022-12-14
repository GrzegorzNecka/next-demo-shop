import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import type { NextApiHandler } from "next/types";
import { authApolloClient } from "graphQL/apolloClient";
import {
    AddItemToCartLocalByIdDocument,
    AddItemToCartLocalByIdMutation,
    AddItemToCartLocalByIdMutationVariables,
} from "graphQL/generated/graphql";

const handleCartSession: NextApiHandler = async (req, res) => {
    //! przydało by się zabezpieczyć
    // const session = await unstable_getServerSession(req, res, authOptions);

    // if (session) {
    //     return;
    // }

    //! gdzie syntax try catch - chyba w fetchu zwykłym

    //! przydało by się zabezpieczyć

    const payload = await JSON.parse(req.body);

    switch (req.method) {
        //todo - zmień nazwę na  UpdateLocalCartItemMutation,

        //todo - dodaj auth do wyjątków w hygraph - tak aby zmiany byłuy możliwe tylko po stronie serwera
        case "POST":
            const updateCartItem = await authApolloClient.mutate<
                AddItemToCartLocalByIdMutation,
                AddItemToCartLocalByIdMutationVariables
            >({
                mutation: AddItemToCartLocalByIdDocument,
                variables: {
                    id: payload.id,
                    cartItem: `${JSON.stringify(payload.product)}`,
                },
            });

            res.status(200).json({ updateCartItem });

            return;
        //update cart item

        default:
            res.status(400).json({ message: "bad request method" });
            return;
    }
};

export default handleCartSession;
