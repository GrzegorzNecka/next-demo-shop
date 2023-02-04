// import type { CartItem } from 'context/types';
import calculateTotal from 'utils/calculate-total';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateOrderItemByOrderIdMutation,
    CreateOrderItemByOrderIdMutationVariables,
    GetCartItemsByCartIdQuery,
    PublishOrderItemMutation,
    PublishOrderItemMutationVariables,
    PublishOrderMutation,
    PublishOrderMutationVariables,
} from 'graphQL/generated/graphql';
import { PublishOrderItemDocument } from 'graphQL/generated/graphql';
import { PublishOrderDocument } from 'graphQL/generated/graphql';
import { CreateOrderItemByOrderIdDocument } from 'graphQL/generated/graphql';
import type Stripe from 'stripe';
import type { StripeCreateCheckout } from 'validations/stripe-checkout-create-schema';

type UpdateOrderItemsProps = {
    cart: GetCartItemsByCartIdQuery['cart'];
    orderId: string | null;
};

export const updateOrderItems = async ({ cart, orderId }: UpdateOrderItemsProps) => {
    /**
     *
     * @todo: total - chyba powinienem wywaliż z modelu
     * @todo: price powinien być w opcji produktu
     *
     */

    if (!cart?.cartItems) {
        return;
    }

    const update = await Promise.all(
        cart.cartItems.map(async (item) => {
            const { data } = await authApolloClient.mutate<
                CreateOrderItemByOrderIdMutation,
                CreateOrderItemByOrderIdMutationVariables
            >({
                mutation: CreateOrderItemByOrderIdDocument,
                variables: {
                    orderId: orderId!,
                    quantity: item.quantity,
                    price: item.option?.product?.price!,
                    productName: item.option?.product?.name!,
                    optionId: item.option?.id!,
                },
                fetchPolicy: 'no-cache',
            });

            const publishItem = await authApolloClient.mutate<
                PublishOrderItemMutation,
                PublishOrderItemMutationVariables
            >({
                mutation: PublishOrderItemDocument,
                variables: { id: data?.createOrderItem?.id },
                fetchPolicy: 'no-cache',
            });

            return data;
        }),
    );

    const publishCart = await authApolloClient.mutate<
        PublishOrderMutation,
        PublishOrderMutationVariables
    >({
        mutation: PublishOrderDocument,
        variables: { id: orderId },
        fetchPolicy: 'no-cache',
    });

    return update;
};
