import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateEmptyOrderMutation,
    CreateEmptyOrderMutationVariables,
    PublishOrderMutation,
    PublishOrderMutationVariables,
} from 'graphQL/generated/graphql';
import { PublishOrderDocument } from 'graphQL/generated/graphql';
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

    const publish = await authApolloClient.mutate<
        PublishOrderMutation,
        PublishOrderMutationVariables
    >({
        mutation: PublishOrderDocument,
        variables: { id: order.data?.createOrder?.id },
        fetchPolicy: 'no-cache',
    });

    return { orderId: order.data?.createOrder?.id || null };
};
