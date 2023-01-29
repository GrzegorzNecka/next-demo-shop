import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import { createEmptyOrder } from 'services/hygraph/order/create-empty-item';
import { updateOrderByOrderId } from 'services/hygraph/order/update-order';
import { setProductOptionTotal } from 'services/hygraph/product/set-product-option-total';
import Stripe from 'stripe';
import type { StripeCreateCheckout } from 'validation/stripe-checkout-create-schema';
import { stripeCreateCheckoutSchema } from 'validation/stripe-checkout-create-schema';

export const createCheckout = async (payload: StripeCreateCheckout) => {
    //stripe
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        throw new Error('missing stripe secret key');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    //yup
    const isValid = await stripeCreateCheckoutSchema.isValid(payload);

    if (!isValid) {
        throw new Error('payload is not valid');
    }

    //graphql
    const cart = await getCartByCartId({
        id: payload.cartId,
    });

    if (!cart?.cartItems) {
        throw new Error('cartItems not exist');
    }

    const cartItems = cart.cartItems.map((cartItem) => {
        return {
            product: cartItem.option?.product,
            quantity: cartItem.quantity,
            option: cartItem.option,
        };
    });

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => {
        // todo - to powinno wynikać z funkcji iterującej po option
        const color = item.option?.color || '-';
        const size = item.option?.size || '-';

        return {
            adjustable_quantity: {
                enabled: true,
                minimum: 0,
                maximum: item.option?.total,
            },
            price_data: {
                currency: 'PLN',
                unit_amount: item.product!.price,
                product_data: {
                    name: item.product!.name,
                    description: `color: ${color}, size: ${size}`,
                    images: item.product!.images.map((i) => i.url),
                    metadata: {
                        slug: item.product!.slug,
                        id: item.option!.id,
                    },
                },
            },
            quantity: item.quantity,
        };
    });

    console.log('lineItems', lineItems);

    const { orderId } = await createEmptyOrder();

    const paymentObject = {
        mode: 'payment',
        locale: 'pl',
        payment_method_types: ['p24', 'card', 'blik'],
        success_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/cancel?canceled=true`,
        line_items: lineItems,
        payment_intent_data: {
            metadata: {
                email: payload.email,
                cartId: payload.cartId,
                orderId: orderId,
            },
        },
    } satisfies Stripe.Checkout.SessionCreateParams;

    console.log('paymentObject', paymentObject);

    const session = await stripe.checkout.sessions.create(paymentObject);

    console.log(' session', session);

    const updateOrder = await updateOrderByOrderId({
        session,
        payload,
        cart,
        orderId,
    });

    const clearCart = await clearCartByCartId({ cartId: payload.cartId });

    const reduceProductTotalOption = await setProductOptionTotal(cart);

    return session;
};
