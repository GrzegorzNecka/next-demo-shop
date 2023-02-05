import type { PaymentIntent } from '@stripe/stripe-js/types/api';
import { getOrder } from 'services/hygraph/order/get-order';
import { updateOrderPaymentStatus } from 'services/hygraph/order/update-order-payment-status';
import { stripeClient } from 'utils/stripe-client';

type FinalizeCheckoutProps = {
    orderId: string;
    stripePaymentIntentStatus: PaymentIntent.Status;
};

export const finalizeCheckout = async ({
    orderId,
    stripePaymentIntentStatus,
}: FinalizeCheckoutProps) => {
    const stripe = await stripeClient();

    const { order } = await getOrder(orderId);
    console.log('🚀 ~  order ---2', order);

    if (!order || typeof order?.stripeCheckoutId !== 'string') {
        console.log('problem with fetching order in finalaize-checkout ');
        return null;
    }

    const checkout = await stripe.checkout.sessions.retrieve(order.stripeCheckoutId);

    if (order.stripePaymentIntentStatus === 'succeeded' || checkout.payment_status === 'unpaid') {
        console.log('status is wrong');
        return { order };
    }

    const updatePaymentStatus = await updateOrderPaymentStatus({
        orderId,
        stripePaymentIntentStatus,
    });

    return updatePaymentStatus;
};
