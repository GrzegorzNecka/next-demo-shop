import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateItemQuantityByCartIdDocument } from 'graphQL/generated/graphql';

export default async function updateItemQuantityByCartId({
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
