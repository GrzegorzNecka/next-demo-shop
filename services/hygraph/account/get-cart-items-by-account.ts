import { authApolloClient, apolloClient } from 'graphQL/apolloClient';
import type {
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
} from 'graphQL/generated/graphql';
import {
    GetCartIdByAccountIdDocument,
    GetCartItemsByCartIdDocument,
} from 'graphQL/generated/graphql';

export default async function getCartItemsByAccount(providerAccountId: string) {
    //
    const authCartId = await authApolloClient.query<
        GetCartIdByAccountIdQuery,
        GetCartIdByAccountIdQueryVariables
    >({
        query: GetCartIdByAccountIdDocument,
        variables: { id: providerAccountId },
        fetchPolicy: 'no-cache',
    });

    if (!authCartId.data?.account?.cart?.id) {
        throw new Error('GetCartIdByAccountIdQuery does not return cart id');
    }

    const { id } = authCartId.data.account.cart;

    const authCart = await apolloClient.query<
        GetCartItemsByCartIdQuery,
        GetCartItemsByCartIdQueryVariables
    >({
        query: GetCartItemsByCartIdDocument,
        variables: {
            id: id!,
        },
        fetchPolicy: 'no-cache',
    });

    return { cartItemsByAccount: authCart.data.cart?.cartItems, cartId: id };
}
