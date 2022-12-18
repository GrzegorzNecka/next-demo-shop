import NextAuth, { Account } from "next-auth";
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
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import { CartItem } from "context/types";

// -- INIT AUTH_OPTIONS

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

    // -- INIT CALLBACKS

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

// -- EXTEND CALLBACK to  async signIn()

interface handleSignInProps {
    account: Account | null;
}

const handleSignIn = async ({ account }: handleSignInProps, cookieCartId: CookieValueTypes) => {
    if (typeof cookieCartId !== "string") {
        return true;
    }

    // - cart and cartItems for unauth session

    const unauthCart = await apolloClient.query<GetUnauthCartQuery, GetUnauthCartQueryVariables>({
        query: GetUnauthCartDocument,
        variables: { id: cookieCartId },
    });

    const unauthCartItems: CartItem[] | undefined = JSON.parse(unauthCart.data.unauthCart?.cartItems);

    if (!unauthCartItems || !unauthCartItems.length) {
        return true;
    }

    // - cart and cartItems for auth session

    const authCartId = await authApolloClient.query<GetCartIdByAccountIdQuery, GetCartIdByAccountIdQueryVariables>({
        query: GetCartIdByAccountIdDocument,
        variables: { id: account?.providerAccountId! },
    });

    const { id } = authCartId.data?.account?.cart!;

    const authCart = await apolloClient.query<GetCartItemsByCartIdQuery, GetCartItemsByCartIdQueryVariables>({
        query: GetCartItemsByCartIdDocument,
        variables: {
            id: id!,
        },
    });

    const authCartItems = authCart.data.cart?.cartItems;

    // - compare datas from sessions

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
                // -- quantity must by less or equal than total

                const total = repeatedItem.option?.total;

                let quantity = repeatedItem.quantity + item.quantity;
                if (total) {
                    quantity = quantity >= total ? total : quantity;
                }

                const increaseAuthCartItems = await authApolloClient.mutate<
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

    const clearUnauthCart = await authApolloClient.mutate<
        UpdateUnauthCartByIdMutation,
        UpdateUnauthCartByIdMutationVariables
    >({
        mutation: UpdateUnauthCartByIdDocument,
        variables: {
            id: cookieCartId,
            cartItems: `[]`,
        },
    });

    return true;
};

// NEXT_AUTH HANDLER

export default async function NextAuthHandler(req: NextApiRequest, res: NextApiResponse) {
    const cookieCartId = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    const options: NextAuthOptions = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,
            async signIn({ account }) {
                return handleSignIn({ account }, cookieCartId);
            },
        },
    };

    return NextAuth(req, res, options);
}
