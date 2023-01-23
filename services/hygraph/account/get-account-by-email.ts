import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
} from 'graphQL/generated/graphql';
import { GetAccountByEmailDocument } from 'graphQL/generated/graphql';

export default async function getAccountByEmailQuery(username: string) {
    const userByEmail = await authApolloClient.query<
        GetAccountByEmailQuery,
        GetAccountByEmailQueryVariables
    >({
        query: GetAccountByEmailDocument,
        variables: { email: username },
    });
    return userByEmail;
}
