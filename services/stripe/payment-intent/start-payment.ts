import type { PaymentIntent } from '@stripe/stripe-js';
import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import { getOrder } from 'services/hygraph/order/get-order';
import { updateOrderItems } from 'services/hygraph/order/update-order-items';
import { updateOrderPaymentStatus } from 'services/hygraph/order/update-order-payment-status';
import { setProductOptionTotal } from 'services/hygraph/product/set-product-option-total';
import { stripeClient } from 'utils/stripe-client';

type StartPaymentProps = {
    cartId: string;
    orderId: string;
    stripePaymentIntentStatus: PaymentIntent.Status; //requires_payment_method
};

export const startPayment = async ({
    cartId,
    orderId,
    stripePaymentIntentStatus,
}: StartPaymentProps) => {
    const cart = await getCartByCartId({
        id: cartId,
    });

    const { order } = await getOrder(orderId);

    console.log('🚀  order ---1', order);

    if (!cart || !order || typeof order?.stripeCheckoutId !== 'string') {
        console.log('problem with hygraph connection ');
        return;
    }

    if (order.stripePaymentIntentStatus === 'requires_payment_method') {
        console.log('status have already cheanged ');
        return;
    }

    const createOrderItems = await updateOrderItems({ cart, orderId });
    // console.log('🚀 createOrderItems', createOrderItems);

    const clearCart = await clearCartByCartId({ cartId });
    // console.log('🚀 clearCart', clearCart);

    const reduceProductTotalOption = await setProductOptionTotal(cart);
    // console.log('🚀  reduceProductTotalOption ', reduceProductTotalOption);

    const updatePaymentStatus = await updateOrderPaymentStatus({
        orderId,
        stripePaymentIntentStatus,
    });

    return updatePaymentStatus;
};
