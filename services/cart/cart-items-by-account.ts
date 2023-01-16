import { authApolloClient } from 'graphQL/apolloClient';
import type {
    AddItemOptionToCartByCartIdMutation,
    AddItemOptionToCartByCartIdMutationVariables,
    UpdateItemQuantityByCartIdMutation,
    UpdateItemQuantityByCartIdMutationVariables,
    GetCartItemsByCartIdQuery,
    GetCartItemsByCartIdQueryVariables,
    RemoveItemFromCartByCartIdMutation,
    RemoveItemFromCartByCartIdMutationVariables,
    ClearCartItemsMutationVariables,
    ClearCartItemsMutation,
} from 'graphQL/generated/graphql';
import {
    AddItemOptionToCartByCartIdDocument,
    UpdateItemQuantityByCartIdDocument,
    GetCartItemsByCartIdDocument,
    RemoveItemFromCartByCartIdDocument,
    ClearCartItemsDocument,
} from 'graphQL/generated/graphql';

// -- GET

export async function getCartItemsByCartIdQuery({ id }: GetCartItemsByCartIdQueryVariables) {
    //
    const getCartItem = await authApolloClient.query<
        GetCartItemsByCartIdQuery,
        GetCartItemsByCartIdQueryVariables
    >({
        query: GetCartItemsByCartIdDocument,
        variables: {
            id,
        },
        fetchPolicy: 'no-cache',
    });
    return getCartItem;
}

// -- CREATE

export async function addItemOptionToCartByCartIdMutation({
    cartId,
    quantity,
    productOptionId,
}: AddItemOptionToCartByCartIdMutationVariables) {
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
        fetchPolicy: 'no-cache',
    });

    return createAuthCartItems;
}

// -- UPDATE

export async function updateItemQuantityByCartIdMutation({
    cartId,
    quantity,
    itemId,
}: UpdateItemQuantityByCartIdMutationVariables) {
    //
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
        fetchPolicy: 'no-cache',
    });

    return increaseAuthCartItems;
}

// -- DELETE

export async function removeItemFromCartByCartIdMutation({
    cartId,
    itemId,
}: RemoveItemFromCartByCartIdMutationVariables) {
    //
    const removeCartItem = await authApolloClient.mutate<
        RemoveItemFromCartByCartIdMutation,
        RemoveItemFromCartByCartIdMutationVariables
    >({
        mutation: RemoveItemFromCartByCartIdDocument,
        variables: {
            cartId,
            itemId,
        },
        fetchPolicy: 'no-cache',
    });

    return removeCartItem;
}

// -- DELETE ALL

export async function clearCartItemsMutation({ cartId }: ClearCartItemsMutationVariables) {
    //
    const removeAllCartItems = await authApolloClient.mutate<
        ClearCartItemsMutation,
        ClearCartItemsMutationVariables
    >({
        mutation: ClearCartItemsDocument,
        variables: {
            cartId,
        },
        fetchPolicy: 'no-cache',
    });

    return removeAllCartItems;
}
