import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateAccountMutation,
    CreateAccountMutationVariables,
} from 'graphQL/generated/graphql';
import { CreateAccountDocument } from 'graphQL/generated/graphql';

export default async function createAccountId(email: string, password: string) {
    const { data } = await authApolloClient.mutate<
        CreateAccountMutation,
        CreateAccountMutationVariables
    >({
        mutation: CreateAccountDocument,
        fetchPolicy: 'no-cache',
        variables: { email, password },
    });

    const accountId = data?.createAccount?.id;

    return accountId;
}
