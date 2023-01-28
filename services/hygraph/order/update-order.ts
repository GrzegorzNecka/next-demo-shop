// import type { CartItem } from 'context/types';
import calculateTotal from 'context/utils/calculate-total';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateOrderMutation,
    UpdateOrderMutationVariables,
    CreateOrderItemByOrderIdMutation,
    CreateOrderItemByOrderIdMutationVariables,
    GetCartItemsByCartIdQuery,
} from 'graphQL/generated/graphql';
import { UpdateOrderDocument, CreateOrderItemByOrderIdDocument } from 'graphQL/generated/graphql';
import type Stripe from 'stripe';
import type { StripeCreateCheckout } from 'validation/stripe-checkout-create-schema';

type UpdateOrderByOrderIdProps = {
    session: Stripe.Response<Stripe.Checkout.Session>;
    payload: StripeCreateCheckout;
    cart: GetCartItemsByCartIdQuery['cart'];
    orderId: string | null;
};

export const updateOrderByOrderId = async ({
    session,
    payload,
    cart,
    orderId,
}: UpdateOrderByOrderIdProps) => {
    const quantities = cart?.cartItems.map((item) => ({ quantity: item.quantity }));

    const updateOrder = await authApolloClient.mutate<
        UpdateOrderMutation,
        UpdateOrderMutationVariables
    >({
        mutation: UpdateOrderDocument,
        variables: {
            orderId: orderId!,
            email: payload?.email!,
            // total: calculateTotal(quantities!),
            total: 10,
            stripeCheckoutId: session.id,
            stripePaymentIntentStatus: session.payment_status,
        },
    });

    //todo price powinien byćw opcji!

    const orderItems = cart?.cartItems.map(async (item) => {
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
        });
    });
    console.log('🚀 ~ file: update-order.ts:59 ~ orderItems ~ orderItems', orderItems);

    //todo - tutaj można zmniejszyć quantity produktów w bazie , a kiedy paid byłby failed wtedy trzeba by je spowrotem wrócić
};
