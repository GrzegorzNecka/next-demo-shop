import { apolloClient } from 'graphQL/apolloClient';
import type { GetUnauthCartQuery, GetUnauthCartQueryVariables } from 'graphQL/generated/graphql';
import { GetUnauthCartDocument } from 'graphQL/generated/graphql';
import type { CartItem } from 'context/types';

//

export default async function getCartItemsByCookieId(cookieCartId: string) {
    //----
    const unauthCart = await apolloClient.query<GetUnauthCartQuery, GetUnauthCartQueryVariables>({
        query: GetUnauthCartDocument,
        variables: { id: cookieCartId },
        fetchPolicy: 'no-cache',
    });

    let unauthCartItems: CartItem[] = [];

    const cartItems = unauthCart.data.unauthCart?.cartItems;

    if (!!cartItems || Array.isArray(cartItems)) {
        unauthCartItems = JSON.parse(cartItems);
    }

    return unauthCartItems;
}
