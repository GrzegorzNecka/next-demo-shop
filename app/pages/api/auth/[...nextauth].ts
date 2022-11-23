import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { authApolloClient } from "graphQL/apolloClient";
import {
    GetAccountByEmailDocument,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
    GetCartIdByAccountIdDocument,
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
} from "graphQL/generated/graphql";

export const authOptions: NextAuthOptions = {
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
        async signIn({ user, account, profile, email, credentials }) {
            // console.log("🚀 ~ file: [...nextauth].ts ~ line 51 ~ signIn ~ credentials", credentials);
            // console.log("🚀 ~ file: [...nextauth].ts ~ line 51 ~ signIn ~ email", email);
            // console.log("🚀 ~ file: [...nextauth].ts ~ line 51 ~ signIn ~ profile", profile);
            // console.log("🚀 ~ file: [...nextauth].ts ~ line 51 ~ signIn ~ account", account);
            // console.log("🚀 ~ file: [...nextauth].ts ~ line 51 ~ signIn ~  user", user);

            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/logged-out/crud-cart-items`, {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json;" },
                body: JSON.stringify({
                    action: "get",
                }),
            });

            if (res.status !== 200) {
                return true;
            }

            const cart = await res.json();
            console.log("🚀 ~ file: [...nextauth].ts ~ line 66 ~ signIn ~ cartItems", cart);

            // if (cartItems.length === 0) {
            //     return true;
            // }

            return true;
        },
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
    secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
