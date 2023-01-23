import { authApolloClient } from 'graphQL/apolloClient';
import type {
    ClearCartItemsMutationVariables,
    ClearCartItemsMutation,
} from 'graphQL/generated/graphql';
import { ClearCartItemsDocument } from 'graphQL/generated/graphql';

export async function clearCartItemsMutation({ cartId }: ClearCartItemsMutationVariables) {
    //
    const removeAllCartItems = await authApolloClient.mutate<
        ClearCartItemsMutation,
        ClearCartItemsMutationVariables
    >({
        mutation: ClearCartItemsDocument,
        variables: {
            cartId,
        },
        fetchPolicy: 'no-cache',
    });

    return removeAllCartItems;
}
