import { authApolloClient } from 'graphQL/apolloClient';
import type { GetOrderQuery, GetOrderQueryVariables } from 'graphQL/generated/graphql';
import { GetOrderDocument } from 'graphQL/generated/graphql';

export const getOrder = async (id: string) => {
    const { data } = await authApolloClient.query<GetOrderQuery, GetOrderQueryVariables>({
        query: GetOrderDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
    });
    console.log('🚀 ~ file: get-order.tsx:11 ~ getOrder ~ data', data);

    return { order: data.order };
};
