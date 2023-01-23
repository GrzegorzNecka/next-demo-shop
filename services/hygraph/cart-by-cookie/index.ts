import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateUnauthCartByIdDocument } from 'graphQL/generated/graphql';

//

export async function clearUnauthCartByIdMutation({ id }: { id: string }) {
    const clearUnauthCart = await authApolloClient.mutate<
        UpdateUnauthCartByIdMutation,
        UpdateUnauthCartByIdMutationVariables
    >({
        mutation: UpdateUnauthCartByIdDocument,
        variables: {
            id,
            cartItems: `[]`,
        },
    });

    return clearUnauthCart;
}

//
