import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    AddItemOptionToCartByCartIdDocument,
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
    GetAccountByEmailDocument,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
    GetCartIdByAccountIdDocument,
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
    GetCartItemsByCartIdDocument,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
    UpdateItemQuantityByCartIdDocument,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
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

    const options: NextAuthOptions = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,
            async signIn({ user, account, profile, email, credentials }) {
                if (!userId) {
                    return true;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/local-session`, {
                    method: "POST",
                    credentials: "same-origin",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify({
                        userId,
                        signIn: true,
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
                console.log("🚀 ~ file: [...nextauth].ts:137 ~ signIn ~  sessionCartItems ", sessionCartItems);

                if (cartItems.length > 0 && sessionCartItems) {
                    //cartItems === non session cart items
                    cartItems.forEach(async (item) => {
                        const isExist = sessionCartItems.find((s_item) => s_item.option?.id === item.productOptionId);
                        console.log("🚀 ~ file: [...nextauth].ts:142 ~ cartItems.forEach ~ isExist", isExist);

                        if (!isExist) {
                            const createCartItem = await authApolloClient.mutate<
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

                        if (isExist) {
                            const updateCartItem = await authApolloClient.mutate<
                                UpdateItemQuantityByCartIdMutation,
                                UpdateItemQuantityByCartIdMutationVariables
                            >({
                                mutation: UpdateItemQuantityByCartIdDocument,
                                variables: {
                                    cartId: id,
                                    itemId: isExist.id,
                                    quantity: isExist.quantity + item.quantity,
                                },
                            });
                        }
                    });
                }

                const setEmpty = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/local-session`, {
                    method: "DELETE",
                    credentials: "same-origin",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify({
                        setEmpty: true,
                        userId,
                    }),
                });

                // await apolloClient.refetchQueries({
                //     include: ['GetCartItemsByCartId'],
                //   });
                //   refetchQueries: [{ query: GetReviewsForProductSlugDocument, variables: { slug: productSlug } }],

                return true;
            },
        },
    };

    return NextAuth(req, res, options);
}
