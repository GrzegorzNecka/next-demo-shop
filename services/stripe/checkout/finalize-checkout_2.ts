import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import { createEmptyOrder } from 'services/hygraph/order/create-empty-item';
import { getOrder } from 'services/hygraph/order/get-order';
import { updateOrderItems } from 'services/hygraph/order/update-order-items';
import { updateOrderPaymentStatus } from 'services/hygraph/order/update-order-payment-status';
import { setProductOptionTotal } from 'services/hygraph/product/set-product-option-total';
import Stripe from 'stripe';
import type { StripeCreateCheckout } from 'validations/stripe-checkout-create-schema';
import { stripeCreateCheckoutSchema } from 'validations/stripe-checkout-create-schema';

type FinalizeCheckoutProps = {
    cartId: string;
    orderId: string;
    stripePaymentIntentStatus: string;
};

export const finalizeCheckout = async ({
    cartId,
    orderId,
    stripePaymentIntentStatus,
}: FinalizeCheckoutProps) => {
    //stripe

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        throw new Error('missing stripe secret key');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    const { order } = await getOrder(orderId);

    if (!order?.stripeCheckoutId) {
        throw new Error('missing stripe checkout id');
    }

    const checkout = await stripe.checkout.sessions.retrieve(order?.stripeCheckoutId);

    if (order?.stripePaymentIntentStatus === 'succeeded' || checkout.payment_status === 'unpaid') {
        return { order, checkout };
    }

    const updatePaymentStatus = await updateOrderPaymentStatus({
        orderId,
        stripePaymentIntentStatus,
    });

    /**
     *
     * @todo: przeniesione z create checkout
     *
     */

    // const clearCart = await clearCartByCartId({ cartId });
    // const cart = await getCartByCartId({
    //     id: cartId,
    // });
    // const reduceProductTotalOption = await setProductOptionTotal(cart);

    /**
     *
     * @todo: utwórz list przewozowy
     *
     */
};
