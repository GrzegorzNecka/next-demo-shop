import { getOrder } from 'services/hygraph/order/get-order';
import { updateOrderPaymentStatus } from 'services/hygraph/order/update-order-payment-status';
import Stripe from 'stripe';
import { stripeClient } from 'utils/stripe-client';

type FinalizeCheckoutProps = {
    orderId: string;
    stripePaymentIntentStatus: string;
};

export const finalizeCheckout = async ({
    orderId,
    stripePaymentIntentStatus,
}: FinalizeCheckoutProps) => {
    console.log(
        '🚀 ~ file: finalize-checkout.ts:16 ~ stripePaymentIntentStatus',
        stripePaymentIntentStatus,
    );
    console.log('🚀 ~ file: finalize-checkout.ts:16 ~ orderId', orderId);
    const stripe = await stripeClient();

    const { order } = await getOrder(orderId);
    console.log('🚀 ~ file: finalize-checkout.ts:24 ~ order ', order);
    console.log('order?.stripeCheckoutId', order?.stripeCheckoutId);

    if (typeof order?.stripeCheckoutId !== 'string') {
        console.log('coś poszło nie tak !order?.stripeCheckoutId', order?.stripeCheckoutId);
        return;
    }

    const checkout = await stripe.checkout.sessions.retrieve(order.stripeCheckoutId);

    console.log('🚀 ~ file: finalize-checkout.ts:32 ~ checkout', checkout);

    if (order?.stripePaymentIntentStatus === 'succeeded' || checkout.payment_status === 'unpaid') {
        return;
    }

    const updatePaymentStatus = await updateOrderPaymentStatus({
        orderId,
        stripePaymentIntentStatus,
    });

    console.log('🚀 ~ file: finalize-checkout.ts:41 ~ updatePaymentStatu', updatePaymentStatus);
    return updatePaymentStatus;
};
