import type { CartItem } from 'context/types';

import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateUnauthCartByIdDocument } from 'graphQL/generated/graphql';

export default async function updateCartItemByCookieId(id: string, product: CartItem) {
    //
    const updateCartItem = await authApolloClient.mutate<
        UpdateUnauthCartByIdMutation,
        UpdateUnauthCartByIdMutationVariables
    >({
        mutation: UpdateUnauthCartByIdDocument,
        variables: {
            id: id,
            cartItems: `${JSON.stringify(product)}`,
        },
    });

    console.log('🚀 ~  updateCartItem', updateCartItem);
    if (!updateCartItem.data?.updateUnauthCart?.cartItems) {
        return [];
    }

    // todo - do obsłużenia przypadek kiedy w cookies wyczyszczę pamięć podręczną

    return JSON.parse(updateCartItem.data.updateUnauthCart.cartItems) as CartItem[];
}
