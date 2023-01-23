import type { NextApiHandler } from 'next/types';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetUnauthCartQuery,
    GetUnauthCartQueryVariables,
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables,
} from 'graphQL/generated/graphql';
import { GetUnauthCartDocument, UpdateUnauthCartByIdDocument } from 'graphQL/generated/graphql';
import { getCookieCartId } from 'services/cookies/get-cookie-cart-id';

const handleCartSession: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const cookieCartId = await getCookieCartId(req, res);

        const getCartItem = await authApolloClient.query<
            GetUnauthCartQuery,
            GetUnauthCartQueryVariables
        >({
            query: GetUnauthCartDocument,
            variables: {
                id: cookieCartId as string,
            },
        });

        if (getCartItem.networkStatus !== 7) {
            res.status(500).json({ message: 'Network Error' });
        }

        res.status(200).json({
            cartItems: JSON.parse(getCartItem.data.unauthCart?.cartItems) ?? [],
        });

        return;
    }

    if (req.method === 'PUT') {
        //add, update, delete
        const { id, product } = await JSON.parse(req.body);

        if (!id && typeof id !== 'string') {
            res.status(400).json({ message: 'bad request body' });
            return;
        }

        const updateCartItem = await authApolloClient.mutate<
            UpdateUnauthCartByIdMutation,
            UpdateUnauthCartByIdMutationVariables
        >({
            mutation: UpdateUnauthCartByIdDocument,
            variables: {
                id: id,
                cartItems: `${JSON.stringify(product)}`,
            },
        });

        //! do obsłużenia przypadek kiedy w cookies wyczyszczę pamięć podręczną

        if (!updateCartItem) {
            res.status(500).json({ message: 'Network Error' });
        }

        res.status(200).json({
            cartItems: JSON.parse(updateCartItem.data?.updateUnauthCart?.cartItems),
        });
        return;
    }

    //else
    res.status(400).json({ message: 'bad request method' });
    return;
};

export default handleCartSession;
