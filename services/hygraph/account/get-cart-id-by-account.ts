import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetCartIdByAccountIdQuery,
    GetCartIdByAccountIdQueryVariables,
} from 'graphQL/generated/graphql';
import { GetCartIdByAccountIdDocument } from 'graphQL/generated/graphql';

export default async function getCartIdByAccountIdQuery(id: string) {
    const cart = await authApolloClient.query<
        GetCartIdByAccountIdQuery,
        GetCartIdByAccountIdQueryVariables
    >({
        query: GetCartIdByAccountIdDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
    });

    return { cart, cartId: cart.data?.account?.cart?.id };
}
