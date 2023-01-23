import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
} from 'graphQL/generated/graphql';
import { GetCartItemsByCartIdDocument } from 'graphQL/generated/graphql';

// -- GET

export async function getCartItemsByCartIdQuery({ id }: GetCartItemsByCartIdQueryVariables) {
    //
    const getCartItem = await authApolloClient.query<
        GetCartItemsByCartIdQuery,
        GetCartItemsByCartIdQueryVariables
    >({
        query: GetCartItemsByCartIdDocument,
        variables: {
            id,
        },
        fetchPolicy: 'no-cache',
    });
    return getCartItem;
}
