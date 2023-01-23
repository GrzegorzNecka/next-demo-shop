import { authApolloClient } from 'graphQL/apolloClient';
import type {
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
} from 'graphQL/generated/graphql';
import { AddItemOptionToCartByCartIdDocument } from 'graphQL/generated/graphql';

// -- CREATE

export default async function createCartItemByCartId({
    cartId,
    quantity,
    productOptionId,
}: AddItemOptionToCartByCartIdMutationVariables) {
    const createAuthCartItems = await authApolloClient.mutate<
        AddItemOptionToCartByCartIdMutation,
        AddItemOptionToCartByCartIdMutationVariables
    >({
        mutation: AddItemOptionToCartByCartIdDocument,
        variables: {
            cartId,
            quantity,
            productOptionId,
        },
        fetchPolicy: 'no-cache',
    });

    return createAuthCartItems;
}
