import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateItemQuantityByCartIdDocument } from 'graphQL/generated/graphql';

export async function updateItemQuantityByCartIdMutation({
    cartId,
    quantity,
    itemId,
}: UpdateItemQuantityByCartIdMutationVariables) {
    //
    const increaseAuthCartItems = await authApolloClient.mutate<
        UpdateItemQuantityByCartIdMutation,
        UpdateItemQuantityByCartIdMutationVariables
    >({
        mutation: UpdateItemQuantityByCartIdDocument,
        variables: {
            cartId,
            itemId,
            quantity,
        },
        fetchPolicy: 'no-cache',
    });

    return increaseAuthCartItems;
}
