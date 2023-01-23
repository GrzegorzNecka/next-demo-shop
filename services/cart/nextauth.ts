import { apolloClient, authApolloClient } from 'graphQL/apolloClient';
import type {
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
    GetUnauthCartQuery,
    GetUnauthCartQueryVariables,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
} from 'graphQL/generated/graphql';
import {
    GetCartIdByAccountIdDocument,
    GetCartItemsByCartIdDocument,
    GetUnauthCartDocument,
    GetAccountByEmailDocument,
} from 'graphQL/generated/graphql';
import type { CartItem } from 'context/types';

//

export async function getCartItemsByAccount(providerAccountId: string) {
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

//

export async function getCartItemsByCookieId(cookieCartId: string) {
    const unauthCart = await apolloClient.query<GetUnauthCartQuery, GetUnauthCartQueryVariables>({
        query: GetUnauthCartDocument,
        variables: { id: cookieCartId },
        fetchPolicy: 'no-cache',
    });

    const unauthCartItems: CartItem[] = JSON.parse(unauthCart.data.unauthCart?.cartItems);
    return unauthCartItems;
}

//

export async function getCartIdByAccountIdQuery(id: string) {
    const cart = await authApolloClient.query<
        GetCartIdByAccountIdQuery,
        GetCartIdByAccountIdQueryVariables
    >({
        query: GetCartIdByAccountIdDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
    });

    return { cart, cartId: cart.data?.account?.cart?.id };
}

//

export async function accountByEmailQuery(username: string) {
    const userByEmail = await authApolloClient.query<
        GetAccountByEmailQuery,
        GetAccountByEmailQueryVariables
    >({
        query: GetAccountByEmailDocument,
        variables: { email: username },
    });
    return userByEmail;
}
