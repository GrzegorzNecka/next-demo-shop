import { authApolloClient } from 'graphQL/apolloClient';
import {
  AddItemOptionToCartByCartIdMutation,
  AddItemOptionToCartByCartIdMutationVariables,
  AddItemOptionToCartByCartIdDocument,
  UpdateItemQuantityByCartIdDocument,
  UpdateItemQuantityByCartIdMutation,
  UpdateItemQuantityByCartIdMutationVariables,
} from 'graphQL/generated/graphql';

type AddItemOptionToCartByCartIdMutationProps = {
  cartId: string;
  quantity: number;
  productOptionId: string;
};

export async function addItemOptionToCartByCartIdMutation({
  cartId,
  quantity,
  productOptionId,
}: AddItemOptionToCartByCartIdMutationProps) {
  const createAuthCartItems = await authApolloClient.mutate<
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables
  >({
    mutation: AddItemOptionToCartByCartIdDocument,
    variables: {
      cartId,
      quantity,
      productOptionId,
    },
  });

  return createAuthCartItems;
}

type UpdateItemQuantityByCartIdMutationProps = {
  cartId: string;
  quantity: number;
  itemId: string;
};

export async function updateItemQuantityByCartIdMutation({
  cartId,
  quantity,
  itemId,
}: UpdateItemQuantityByCartIdMutationProps) {
  const increaseAuthCartItems = await authApolloClient.mutate<
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables
  >({
    mutation: UpdateItemQuantityByCartIdDocument,
    variables: {
      cartId,
      itemId,
      quantity,
    },
  });
  return increaseAuthCartItems;
}
