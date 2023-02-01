import { apolloClient } from 'graphQL/apolloClient';

import type {
    GetProductOptionTotalQuery,
    GetProductOptionTotalQueryVariables,
} from 'graphQL/generated/graphql';
import { GetProductOptionTotalDocument } from 'graphQL/generated/graphql';

export const getProductOptionTotal = async (id: string) => {
    //

    const { data } = await apolloClient.query<
        GetProductOptionTotalQuery,
        GetProductOptionTotalQueryVariables
    >({
        query: GetProductOptionTotalDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
    });

    return data.option?.total;
};
