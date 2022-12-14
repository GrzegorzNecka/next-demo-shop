import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    AddItemOptionToCartByCartIdDocument,
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
    UpdateUnauthCartByIdDocument,
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables,
    DeleteUnauthCartDocument,
    DeleteUnauthCartMutation,
    DeleteUnauthCartMutationVariables,
    GetAccountByEmailDocument,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
    GetCartIdByAccountIdDocument,
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
    GetCartItemsByCartIdDocument,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
    GetUnauthCartDocument,
    GetUnauthCartQuery,
    GetUnauthCartQueryVariables,
    UpdateItemQuantityByCartIdDocument,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from "graphQL/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie, getCookie } from "cookies-next";
import { CartItem } from "context/types";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Logowanie hasłem",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }
                const userByEmail = await authApolloClient.query<
                    GetAccountByEmailQuery,
                    GetAccountByEmailQueryVariables
                >({
                    query: GetAccountByEmailDocument,
                    variables: { email: credentials?.username },
                });
                if (!userByEmail.data.account?.password) {
                    return null;
                }
                const arePasswordsEqual = await bcrypt.compare(
                    credentials.password,
                    userByEmail.data.account?.password
                );
                if (!arePasswordsEqual) {
                    return null;
                }
                const session = { id: userByEmail.data.account.id, email: userByEmail.data.account.email };
                return session;
            },
        }),
    ],

    callbacks: {
        async session({ session, user, token }) {
            if (typeof token.sub == "string") {
                const cart = await authApolloClient.query<
                    GetCartIdByAccountIdQuery,
                    GetCartIdByAccountIdQueryVariables
                >({
                    query: GetCartIdByAccountIdDocument,
                    variables: { id: token.sub },
                });
                const cartId = cart.data?.account?.cart?.id;
                if (cartId) {
                    session.user.cartId = cartId;
                }
            }
            session.user.id = token.sub!;
            return session;
        },
    },
};

export default async function NextAuthHandler(req: NextApiRequest, res: NextApiResponse) {
    const cookieId = getCookie("hygraph-unauth-cart-id", { req, res });

    const options: NextAuthOptions = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,

            async signIn({ user, account, profile, email, credentials }) {
                if (typeof cookieId !== "string") {
                    return true;
                }

                // - local cart items
                const unauthCart = await apolloClient.query<GetUnauthCartQuery, GetUnauthCartQueryVariables>({
                    query: GetUnauthCartDocument,
                    variables: { id: cookieId },
                });

                const unauthCartItems: CartItem[] | undefined = JSON.parse(unauthCart.data.unauthCart?.cartItems);

                if (!unauthCartItems || !unauthCartItems.length) {
                    return true;
                }

                // - server cart items

                const authCartId = await authApolloClient.query<
                    GetCartIdByAccountIdQuery,
                    GetCartIdByAccountIdQueryVariables
                >({
                    query: GetCartIdByAccountIdDocument,
                    variables: { id: account?.providerAccountId! },
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

                const authCartItems = authCart.data.cart?.cartItems;

                if (unauthCartItems.length > 0 && authCartItems) {
                    unauthCartItems.forEach(async (item) => {
                        //
                        const repeatedItem = authCartItems.find((s_item) => s_item.option?.id === item.productOptionId);

                        if (!repeatedItem) {
                            const createAuthCartItems = await authApolloClient.mutate<
                                AddItemOptionToCartByCartIdMutation,
                                AddItemOptionToCartByCartIdMutationVariables
                            >({
                                mutation: AddItemOptionToCartByCartIdDocument,
                                variables: {
                                    cartId: id,
                                    quantity: item.quantity,
                                    productOptionId: item.productOptionId,
                                },
                            });
                        }

                        if (repeatedItem) {
                            //quantity must by less or equal than total
                            const total = repeatedItem.option?.total;

                            let quantity = repeatedItem.quantity + item.quantity;
                            if (total) {
                                quantity = quantity >= total ? total : quantity;
                            }

                            const updateAuthCartItems = await authApolloClient.mutate<
                                UpdateItemQuantityByCartIdMutation,
                                UpdateItemQuantityByCartIdMutationVariables
                            >({
                                mutation: UpdateItemQuantityByCartIdDocument,
                                variables: {
                                    cartId: id,
                                    itemId: repeatedItem.id,
                                    quantity,
                                },
                            });
                        }
                    });
                }

                //todo - dodaj auth do wyjątków w hygraph - tak aby zmiany byłuy możliwe tylko po stronie serwera
                const updateUnauthCartItems = await authApolloClient.mutate<
                    UpdateUnauthCartByIdMutation,
                    UpdateUnauthCartByIdMutationVariables
                >({
                    mutation: UpdateUnauthCartByIdDocument,
                    variables: {
                        id: cookieId,
                        cartItems: `[]`,
                    },
                });

                // res.status(200).json({ updateCartItem });

                //todo - alternatywnie - usuń token z bazy i z cookies

                // const DeleteUnauthCartItem = await authApolloClient.mutate<
                //     DeleteUnauthCartMutation,
                //     DeleteUnauthCartMutationVariables
                // >({
                //     mutation: DeleteUnauthCartDocument,
                //     variables: {
                //         id: cookieId,
                //     },
                // });

                // deleteCookie("hygraph-unauth-cart-id", { req, res });

                return true;
            },
        },
    };

    return NextAuth(req, res, options);
}
