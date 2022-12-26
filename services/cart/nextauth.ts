import { apolloClient, authApolloClient } from 'graphQL/apolloClient';
import {
  GetCartIdByAccountIdQuery,
  GetCartIdByAccountIdQueryVariables,
  GetCartIdByAccountIdDocument,
  GetCartItemsByCartIdQuery,
  GetCartItemsByCartIdQueryVariables,
  GetCartItemsByCartIdDocument,
  CartItem as CartItemFromApollo,
  GetUnauthCartDocument,
  GetUnauthCartQuery,
  GetUnauthCartQueryVariables,
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from 'graphQL/generated/graphql';
import { CartItem } from 'context/types';

//

export async function getCartItemsByAccount(providerAccountId: string) {
  const authCartId = await authApolloClient.query<
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables
  >({
    query: GetCartIdByAccountIdDocument,
    variables: { id: providerAccountId },
  });

  const { id } = authCartId.data?.account?.cart!;

  const authCart = await apolloClient.query<
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables
  >({
    query: GetCartItemsByCartIdDocument,
    variables: {
      id: id!,
    },
  });

  return { authCartItems: authCart.data.cart?.cartItems, cartId: id };
}

//

export async function getCartItemsByCookieId(cookieCartId: string) {
  const unauthCart = await apolloClient.query<GetUnauthCartQuery, GetUnauthCartQueryVariables>({
    query: GetUnauthCartDocument,
    variables: { id: cookieCartId },
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
