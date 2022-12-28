import NextAuth, { Account } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { CookieValueTypes, getCookie } from 'cookies-next';
import {
  accountByEmailQuery,
  getCartIdByAccountIdQuery,
  getCartItemsByAccount,
  getCartItemsByCookieId,
} from 'services/cart/nextauth';
import {
  addItemOptionToCartByCartIdMutation,
  updateItemQuantityByCartIdMutation,
} from 'services/cart/cart-items-by-account';
import { clearUnauthCartByIdMutation } from 'services/cart/cart-items-by-cookie-id';

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

        const userByEmail = await accountByEmailQuery(credentials?.username);

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
        const session = { id: userByEmail.data.account.id, email: userByEmail.data.account.email };
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

  if (!cartItemsByCookieId || !cartItemsByCookieId.length) {
    return true;
  }

  const { cartItemsByAccount, cartId } = await getCartItemsByAccount(account?.providerAccountId!);

  // compare and join data from server and local state
  if (cartItemsByCookieId.length > 0 && cartItemsByAccount) {
    // loop
    cartItemsByCookieId.forEach(async (item) => {
      const repeatedItem = cartItemsByAccount.find((i) => i.option?.id === item.productOptionId);

      if (!repeatedItem) {
        const createAuthCartItems = await addItemOptionToCartByCartIdMutation({
          cartId,
          quantity: item.quantity,
          productOptionId: item.productOptionId,
        });
      }

      if (!!repeatedItem) {
        type RepeatedItem = typeof repeatedItem;

        function countQuantity(repeatedItem: RepeatedItem) {
          // check total quantity of store
          // if quatnity >= total return total
          const total = repeatedItem.option?.total;
          let quantity = repeatedItem.quantity + item.quantity;
          if (total) {
            quantity = quantity >= total ? total : quantity;
          }
          return quantity;
        }

        const increaseCartItemsByAccount = await updateItemQuantityByCartIdMutation({
          cartId,
          itemId: repeatedItem.id,
          quantity: countQuantity(repeatedItem),
        });
      }
    });
  }

  const clearCartItemsByCookieId = await clearUnauthCartByIdMutation({ id: cookieCartId });

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
