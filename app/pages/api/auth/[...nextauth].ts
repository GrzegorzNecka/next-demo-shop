import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    GetAccountByEmailDocument,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
    GetCartIdByAccountIdDocument,
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
    GetCartItemsByCartIdDocument,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
} from "graphQL/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
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
    const userId = getCookie("local-cart-item-user", { req, res });

    const authConfig: NextAuthOptions = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,
            async signIn({ user, account, profile, email, credentials }) {
                console.log("🚀 ~    account,   account,   account,   account,", account?.providerAccountId);

                console.log("🚀 ~ file:   next auth userId", userId);

                if (!userId) {
                    return true;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/logged-out/crud-cart-items`, {
                    method: "POST",
                    credentials: "same-origin",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify({
                        action: "send",
                        userId,
                    }),
                });

                if (res.status !== 200) {
                    return true;
                }

                const { cartItems }: { cartItems: CartItem[] } = await res.json();

                if (cartItems.length === 0) {
                    return true;
                }

                const getCartIdByAccountId = await authApolloClient.query<
                    GetCartIdByAccountIdQuery,
                    GetCartIdByAccountIdQueryVariables
                >({
                    query: GetCartIdByAccountIdDocument,
                    variables: { id: account?.providerAccountId! },
                });

                const { id } = getCartIdByAccountId.data?.account?.cart!;

                const getCartItemsByCartId = await apolloClient.query<
                    GetCartItemsByCartIdQuery,
                    GetCartItemsByCartIdQueryVariables
                >({
                    query: GetCartItemsByCartIdDocument,
                    variables: {
                        id: id!,
                    },
                });

                const sessionCartItems = getCartItemsByCartId.data.cart?.cartItems;
                console.log("🚀 ~ file: [...nextauth].ts:116 ~ signIn ~ sessionCartItems", sessionCartItems);

                if (cartItems.length > 0 && sessionCartItems) {
                    cartItems.forEach((item) => {
                        console.log("🚀 ~ file: [...nextauth].ts:121 ~ cartItems.forEach ~ item", item);
                        const isExist = sessionCartItems.find((s_item) => s_item.option?.product?.slug === item.slug);

                        console.log("🚀 ~ file:  ~ isExist", isExist);
                    });
                }

                //     const getCartFromServer = await apolloClient.query<
                //     AddItemOptionToCartByCartIdMutation,
                //     AddItemOptionToCartByCartIdMutationVariables
                // >({
                //     mutation: AddItemOptionToCartByCartIdDocument,
                //     variables: {
                //         cartId,
                //         quantity,
                //         productOptionId: productOptionId,
                //     },
                // });

                // cartItems.forEach((cartItem) => {

                // })

                return true;
            },
        },
    };

    return NextAuth(req, res, authConfig);
}
