import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    AddItemOptionToCartByCartIdDocument,
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
    AddItemToCartLocalByIdDocument,
    AddItemToCartLocalByIdMutation,
    AddItemToCartLocalByIdMutationVariables,
    DeleteLocalCartDocument,
    DeleteLocalCartMutation,
    DeleteLocalCartMutationVariables,
    GetAccountByEmailDocument,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
    GetCartIdByAccountIdDocument,
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
    GetCartItemsByCartIdDocument,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
    GetLocalCartDocument,
    GetLocalCartQuery,
    GetLocalCartQueryVariables,
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
    const cookieId = getCookie("local-cart-item-id", { req, res });

    const options: NextAuthOptions = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,
            async signIn({ user, account, profile, email, credentials }) {
                if (typeof cookieId !== "string") {
                    return true;
                }

                // - local cart items
                const localCart = await apolloClient.query<GetLocalCartQuery, GetLocalCartQueryVariables>({
                    query: GetLocalCartDocument,
                    variables: { id: cookieId },
                });

                // - server cart items

                const serverCartId = await authApolloClient.query<
                    GetCartIdByAccountIdQuery,
                    GetCartIdByAccountIdQueryVariables
                >({
                    query: GetCartIdByAccountIdDocument,
                    variables: { id: account?.providerAccountId! },
                });

                const { id } = serverCartId.data?.account?.cart!;

                const serverCart = await apolloClient.query<
                    GetCartItemsByCartIdQuery,
                    GetCartItemsByCartIdQueryVariables
                >({
                    query: GetCartItemsByCartIdDocument,
                    variables: {
                        id: id!,
                    },
                });

                //! zmień cart Item na cart Items

                const localCartItems: CartItem[] = JSON.parse(localCart.data.cartLocal?.cartItem);
                console.log("🚀 ~ file: [...nextauth].ts:133 ~ signIn ~ localCartItem", localCartItems);
                const serverCartItems = serverCart.data.cart?.cartItems;
                console.log("🚀 ~ file: [...nextauth].ts:135 ~ signIn ~ serverCartItems", serverCartItems);

                if (localCartItems.length > 0 && serverCartItems) {
                    localCartItems.forEach(async (item) => {
                        const isExist = serverCartItems.find((s_item) => s_item.option?.id === item.productOptionId);

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
                            //quantity must by less or equal than total
                            const total = isExist.option?.total;

                            let quantity = isExist.quantity + item.quantity;

                            if (total) {
                                quantity = quantity >= total ? total : quantity;
                            }

                            const updateCartItem = await authApolloClient.mutate<
                                UpdateItemQuantityByCartIdMutation,
                                UpdateItemQuantityByCartIdMutationVariables
                            >({
                                mutation: UpdateItemQuantityByCartIdDocument,
                                variables: {
                                    cartId: id,
                                    itemId: isExist.id,
                                    quantity,
                                },
                            });
                        }
                    });
                }

                //todo - dodaj auth do wyjątków w hygraph - tak aby zmiany byłuy możliwe tylko po stronie serwera
                const updateCartItem = await authApolloClient.mutate<
                    AddItemToCartLocalByIdMutation,
                    AddItemToCartLocalByIdMutationVariables
                >({
                    mutation: AddItemToCartLocalByIdDocument,
                    variables: {
                        id: cookieId,
                        cartItem: `[]`,
                    },
                });

                // res.status(200).json({ updateCartItem });

                //todo - alternatywnie - usuń token z bazy i z cookies
                // const deleteLocalCartItem = await authApolloClient.mutate<
                //     DeleteLocalCartMutation,
                //     DeleteLocalCartMutationVariables
                // >({
                //     mutation: DeleteLocalCartDocument,
                //     variables: {
                //         id: cookieId,
                //     },
                // });

                // deleteCookie("local-cart-item-id", { req, res });

                return true;
            },
        },
    };

    return NextAuth(req, res, options);
}
