import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import type { NextApiHandler } from 'next/types';
import { authApolloClient } from 'graphQL/apolloClient';
import {
  AddItemOptionToCartByCartIdDocument,
  AddItemOptionToCartByCartIdMutation,
  AddItemOptionToCartByCartIdMutationVariables,
  ClearCartItemsDocument,
  ClearCartItemsMutation,
  ClearCartItemsMutationVariables,
  GetCartItemsByCartIdDocument,
  GetCartItemsByCartIdQuery,
  GetCartItemsByCartIdQueryVariables,
  RemoveItemFromCartByCartIdDocument,
  RemoveItemFromCartByCartIdMutation,
  RemoveItemFromCartByCartIdMutationVariables,
  UpdateItemQuantityByCartIdDocument,
  UpdateItemQuantityByCartIdMutation,
  UpdateItemQuantityByCartIdMutationVariables,
} from 'graphQL/generated/graphql';

const handleCartSession: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user.cartId) {
    res.status(400).json({ message: 'You should be logged' });
    return;
  }

  const cartId = session.user.cartId;

  if (req.method === 'GET') {
    const getCartItem = await authApolloClient.query<
      GetCartItemsByCartIdQuery,
      GetCartItemsByCartIdQueryVariables
    >({
      query: GetCartItemsByCartIdDocument,
      variables: {
        id: cartId,
      },
      fetchPolicy: 'no-cache',
    });

    if (getCartItem.networkStatus !== 7) {
      res.status(500).json({ message: 'Network Error' });
    }

    res.status(200).json({ cart: getCartItem.data.cart });
    return;
  }

  if (req.method === 'POST') {
    //add new item
    const { productOptionId, quantity } = await JSON.parse(req.body);

    if (!productOptionId && !quantity) {
      res.status(400).json({ message: 'payload is required' });
      return;
    }

    const createCartItem = await authApolloClient.mutate<
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

    res.status(200).json({ cart: createCartItem.data?.updateCart });
    return;
  }

  if (req.method === 'PUT') {
    const { itemId, updatedQuantity: quantity } = await JSON.parse(req.body);

    if (!itemId && !quantity) {
      res.status(400).json({ message: 'payload is required' });
      return;
    }

    const updateCartItem = await authApolloClient.mutate<
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

    res.status(200).json({ cart: updateCartItem.data?.updateCart });

    return;
  }

  if (req.method === 'DELETE') {
    const { itemId, quantity, setEmpty = false } = await JSON.parse(req.body);

    if (itemId && quantity) {
      if (quantity > 1) {
        const increseCartItem = await authApolloClient.mutate<
          UpdateItemQuantityByCartIdMutation,
          UpdateItemQuantityByCartIdMutationVariables
        >({
          mutation: UpdateItemQuantityByCartIdDocument,
          variables: {
            cartId,
            itemId,
            quantity: quantity - 1,
          },
          fetchPolicy: 'no-cache',
        });

        res.status(200).json({ cart: increseCartItem.data?.updateCart });
        return;
      }

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

      res.status(200).json({ cart: removeCartItem.data?.updateCart });
      return;
    }

    if (setEmpty) {
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

      res.status(200).json({ cart: removeAllCartItems.data?.updateCart });
      return;
    }

    res.status(400).json({ message: 'payload is required' });
    return;
  }

  res.status(400).json({ message: 'bad request body' });
  return;
};

export default handleCartSession;
