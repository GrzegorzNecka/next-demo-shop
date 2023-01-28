import { apolloClient } from 'graphQL/apolloClient';
import type {
    GetUnauthCartIdQuery,
    GetUnauthCartIdQueryVariables,
} from 'graphQL/generated/graphql';
import { GetUnauthCartIdDocument } from 'graphQL/generated/graphql';

//

export default async function isCartIdExist(cookieCartId: string) {
    //
    const cart = await apolloClient.query<GetUnauthCartIdQuery, GetUnauthCartIdQueryVariables>({
        query: GetUnauthCartIdDocument,
        variables: { id: cookieCartId },
        fetchPolicy: 'no-cache',
    });

    return Boolean(cart.data?.unauthCart?.id);
}
