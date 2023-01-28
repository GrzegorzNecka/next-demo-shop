import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
} from 'graphQL/generated/graphql';
import { GetCartItemsByCartIdDocument } from 'graphQL/generated/graphql';

// -- GET

export default async function getCartByCartId({ id }: GetCartItemsByCartIdQueryVariables) {
    //
    const getCartItems = await authApolloClient.query<
        GetCartItemsByCartIdQuery,
        GetCartItemsByCartIdQueryVariables
    >({
        query: GetCartItemsByCartIdDocument,
        variables: {
            id,
        },
        fetchPolicy: 'no-cache',
    });

    const cart = getCartItems.data.cart;

    return cart;
}
