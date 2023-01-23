import { authApolloClient } from 'graphQL/apolloClient';
import type {
    RemoveItemFromCartByCartIdMutation,
    RemoveItemFromCartByCartIdMutationVariables,
} from 'graphQL/generated/graphql';
import { RemoveItemFromCartByCartIdDocument } from 'graphQL/generated/graphql';

export async function removeItemFromCartByCartIdMutation({
    cartId,
    itemId,
}: RemoveItemFromCartByCartIdMutationVariables) {
    //
    const removeCartItem = await authApolloClient.mutate<
        RemoveItemFromCartByCartIdMutation,
        RemoveItemFromCartByCartIdMutationVariables
    >({
        mutation: RemoveItemFromCartByCartIdDocument,
        variables: {
            cartId,
            itemId,
        },
        fetchPolicy: 'no-cache',
    });

    return removeCartItem;
}
