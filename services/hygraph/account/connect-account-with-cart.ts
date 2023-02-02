import { authApolloClient } from 'graphQL/apolloClient';
import type {
    ConnectAccountWithCartAndPublishMutation,
    ConnectAccountWithCartAndPublishMutationVariables,
} from 'graphQL/generated/graphql';
import { ConnectAccountWithCartAndPublishDocument } from 'graphQL/generated/graphql';

export default async function connectAccountWithCart(accountId: string, cartId: string) {
    const connect = await authApolloClient.mutate<
        ConnectAccountWithCartAndPublishMutation,
        ConnectAccountWithCartAndPublishMutationVariables
    >({
        mutation: ConnectAccountWithCartAndPublishDocument,
        variables: {
            accountId,
            cartId,
        },
    });

    return connect;
}
