import { authApolloClient } from 'graphQL/apolloClient';
import type { CreateCartMutation, CreateCartMutationVariables } from 'graphQL/generated/graphql';
import { CreateCartDocument } from 'graphQL/generated/graphql';

export default async function createCart() {
    const { data } = await authApolloClient.mutate<CreateCartMutation, CreateCartMutationVariables>(
        {
            mutation: CreateCartDocument,
            fetchPolicy: 'no-cache',
        },
    );

    const cartId = data?.createCart?.id;

    return cartId;
}
