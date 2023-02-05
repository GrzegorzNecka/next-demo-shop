import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetOrderQuery,
    GetOrderQueryVariables,
    PublishOrderMutation,
    PublishOrderMutationVariables,
} from 'graphQL/generated/graphql';
import { PublishOrderDocument } from 'graphQL/generated/graphql';
import { GetOrderDocument } from 'graphQL/generated/graphql';

export const getOrder = async (id: string) => {
    const publishCart = await authApolloClient.mutate<
        PublishOrderMutation,
        PublishOrderMutationVariables
    >({
        mutation: PublishOrderDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
    });

    const { data } = await authApolloClient.query<GetOrderQuery, GetOrderQueryVariables>({
        query: GetOrderDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
    });

    return { order: data.order };
};
