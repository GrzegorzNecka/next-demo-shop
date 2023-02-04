// import type { CartItem } from 'context/types';
import calculateTotal from 'utils/calculate-total';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateOrderItemByOrderIdMutation,
    CreateOrderItemByOrderIdMutationVariables,
    GetCartItemsByCartIdQuery,
} from 'graphQL/generated/graphql';
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
     * @todo: total - chyba wywalę wogólę z modelu
     * @todo: price powinien być w opcji produktu
     *
     */

    const update = cart?.cartItems.map(async (item) => {
        const orderItem = await authApolloClient.mutate<
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
    });
};
