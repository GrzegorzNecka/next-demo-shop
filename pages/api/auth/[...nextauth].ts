import NextAuth from 'next-auth';
import type { NextAuthOptions, Account } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CookieValueTypes } from 'cookies-next';
import { getCookie } from 'cookies-next';
import getAccountByEmailQuery from 'services/hygraph/account/get-account-by-email';
import getCartItemsByAccount from 'services/hygraph/account/get-cart-items-by-account';
import getCartIdByAccountIdQuery from 'services/hygraph/account/get-cart-id-by-account';
import getCartItemsByCookieId from 'services/hygraph/cart/by-cookie/get-cart';
import createCartItemByCartId from 'services/hygraph/cart/by-account/create-item';
import updateItemQuantityByCartId from 'services/hygraph/cart/by-account/update-item';
import clearCartByCookieId from 'services/hygraph/cart/by-cookie/clear-cart';

// -- INIT AUTH_OPTIONS

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Logowanie hasłem',
            credentials: {
                username: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }

                const userByEmail = await getAccountByEmailQuery(credentials?.username);

                if (!userByEmail.data.account?.password) {
                    return null;
                }

                const arePasswordsEqual = await bcrypt.compare(
                    credentials.password,
                    userByEmail.data.account?.password,
                );
                if (!arePasswordsEqual) {
                    return null;
                }
                const session = {
                    id: userByEmail.data.account.id,
                    email: userByEmail.data.account.email,
                };
                return session;
            },
        }),
    ],

    // -- INIT CALLBACKS

    callbacks: {
        async session({ session, user, token }) {
            if (typeof token.sub == 'string') {
                //

                const { cartId } = await getCartIdByAccountIdQuery(token.sub);

                if (cartId) {
                    session.user.cartId = cartId;
                }
            }

            session.user.id = token.sub!;
            return session;
        },
    },
};

// -- EXTEND CALLBACK to async signIn()

interface handleSignInProps {
    account: Account | null;
}

const handleSignIn = async ({ account }: handleSignInProps, cookieCartId: CookieValueTypes) => {
    if (typeof cookieCartId !== 'string') {
        return true;
    }

    const cartItemsByCookieId = await getCartItemsByCookieId(cookieCartId);

    if (!cartItemsByCookieId || !cartItemsByCookieId.length || !account?.providerAccountId) {
        return true;
    }

    const { cartItemsByAccount, cartId } = await getCartItemsByAccount(account?.providerAccountId);

    // compare and join data from server and local state
    if (cartItemsByCookieId.length > 0 && cartItemsByAccount) {
        // loop
        cartItemsByCookieId.forEach(async (item) => {
            const repeatedItem = cartItemsByAccount.find(
                (i) => i.option?.id === item.productOptionId,
            );

            if (!repeatedItem) {
                const createAuthCartItems = await createCartItemByCartId({
                    cartId,
                    quantity: item.quantity,
                    productOptionId: item.productOptionId,
                });
            }

            if (repeatedItem) {
                // check total quantity of store
                // if quatnity >= total return total
                const total = repeatedItem.option?.total;
                let quantity = repeatedItem.quantity + item.quantity;
                if (total) {
                    quantity = quantity >= total ? total : quantity;
                }

                const increaseCartItemsByAccount = await updateItemQuantityByCartId({
                    cartId,
                    itemId: repeatedItem.id,
                    quantity,
                });
            }
        });
    }

    const clearCartItemsByCookieId = await clearCartByCookieId({ id: cookieCartId });

    return true;
};

// -- NEXT_AUTH HANDLER

export default async function NextAuthHandler(req: NextApiRequest, res: NextApiResponse) {
    //
    const cookieCartId = getCookie(`${process.env.NEXT_PUBLIC_COOKIE_CART_ID}`, { req, res });

    const options: NextAuthOptions = {
        ...authOptions,
        callbacks: {
            ...authOptions.callbacks,
            async signIn({ account }: handleSignInProps) {
                return handleSignIn({ account }, cookieCartId);
            },
        },
    };

    return NextAuth(req, res, options);
}
