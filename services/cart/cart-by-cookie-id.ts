import { authApolloClient } from 'graphQL/apolloClient';
import {
  UpdateUnauthCartByIdMutation,
  UpdateUnauthCartByIdMutationVariables,
  UpdateUnauthCartByIdDocument,
} from 'graphQL/generated/graphql';

export async function clearUnauthCartByIdMutation({ id }: { id: string }) {
  const clearUnauthCart = await authApolloClient.mutate<
    UpdateUnauthCartByIdMutation,
    UpdateUnauthCartByIdMutationVariables
  >({
    mutation: UpdateUnauthCartByIdDocument,
    variables: {
      id,
      cartItems: `[]`,
    },
  });

  return clearUnauthCart;
}
