import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateEmptyOrderMutation,
    CreateEmptyOrderMutationVariables,
} from 'graphQL/generated/graphql';
import { CreateEmptyOrderDocument } from 'graphQL/generated/graphql';

export const createEmptyOrder = async () => {
    const order = await authApolloClient.mutate<
        CreateEmptyOrderMutation,
        CreateEmptyOrderMutationVariables
    >({
        mutation: CreateEmptyOrderDocument,
        variables: {},
        fetchPolicy: 'no-cache',
    });

    return { orderId: order.data?.createOrder?.id || null };
};
