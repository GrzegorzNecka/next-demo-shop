// import type { CartItem } from 'context/types';
import calculateTotal from 'utils/calculate-total';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetCartItemsByCartIdQuery,
    ConnectStripeCheckoutWithOrderMutation,
    ConnectStripeCheckoutWithOrderMutationVariables,
} from 'graphQL/generated/graphql';
import { ConnectStripeCheckoutWithOrderDocument } from 'graphQL/generated/graphql';

import type Stripe from 'stripe';
import type { StripeCreateCheckout } from 'validations/stripe-checkout-create-schema';

type ConnectWithStripeCheckoutProps = {
    session: Stripe.Response<Stripe.Checkout.Session>;
    payload: StripeCreateCheckout;
    orderId: string | null;
};

export const connectWithStripeCheckout = async ({
    session,
    payload,
    orderId,
}: ConnectWithStripeCheckoutProps) => {
    //

    // const quantities = cart?.cartItems.map((item) => ({ quantity: item.quantity }));

    const connect = await authApolloClient.mutate<
        ConnectStripeCheckoutWithOrderMutation,
        ConnectStripeCheckoutWithOrderMutationVariables
    >({
        mutation: ConnectStripeCheckoutWithOrderDocument,
        variables: {
            orderId: orderId!,
            email: payload?.email!,
            stripeCheckoutId: session.id,
            stripePaymentIntentStatus: session.payment_status,
        },
        fetchPolicy: 'no-cache',
    });

    // console.log('🚀 ~ update-order.ts:59  orderItems', orderItems);
};
