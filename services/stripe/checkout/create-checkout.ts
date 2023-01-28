import type { CartItem } from 'graphQL/generated/graphql';
import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import { createEmptyOrder } from 'services/hygraph/order/create-empty-item';
import { updateOrderByOrderId } from 'services/hygraph/order/update-order';
import Stripe from 'stripe';
import createContextCartItem from 'utils/create-context-cart-item';
import type { StripeCreateCheckout } from 'validation/stripe-checkout-create-schema';
import { stripeCreateCheckoutSchema } from 'validation/stripe-checkout-create-schema';

export const createCheckout = async (payload: StripeCreateCheckout) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        return { rejected: { message: `missing stripe secret key`, status: 500 } };
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    const isValid = await stripeCreateCheckoutSchema.isValid(payload);

    if (!isValid) {
        return { rejected: { message: `payload is not valid`, status: 400 } };
    }

    //todo - tutaj powinienem pobierać koszyk ? , a w paylodzie powinien być przekazywany id koszyka

    const cart = await getCartByCartId({
        id: payload.cartId,
    });

    if (!cart?.cartItems) {
        return { rejected: { message: `cartItems not exist`, status: 500 } };
    }

    const cartItems = cart.cartItems.map((cartItem) => {
        return {
            product: cartItem.option?.product,
            quantity: cartItem.quantity,
            option: cartItem.option,
        };
    });

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => {
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
                    description: `color: ${item.option?.color || '-'}, size: ${
                        item.option?.size || '-'
                    }`,
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

    const { orderId } = await createEmptyOrder();

    const paymentObject = {
        mode: 'payment',
        locale: 'pl',
        payment_method_types: ['p24', 'card', 'blik'],
        success_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/cancel?canceled=true`,
        line_items: lineItems,
        payment_intent_data: {
            metadata: { email: payload.email, cartId: payload.cartId, orderId: orderId },
        },
    } satisfies Stripe.Checkout.SessionCreateParams;

    const session = await stripe.checkout.sessions.create(paymentObject);

    // todo - 3 - tu uzupełniam dane całego orderu

    const updateOrder = await updateOrderByOrderId({
        session,
        payload,
        cart,
        orderId,
    });

    const clearCart = await clearCartByCartId({ cartId: payload.cartId });

    //todo 2 - jeśli payment.success = w magazynie zmniejsz liczbę towarów o to oc zostało kupione
    //todo 3 - nowy koszyk powinien zostać utworzony - w sensie rozważ kilka koszyków w ramach konta
    //todo 4 - więc to do koszyka powinien być przypisany idStripa
    // hygaph - też ma webhooki
    //---stripe webhook
    //todo - jesli płatność ma status sukcess to wtedy oznaczamy w hygraph jako zakończone

    // dostaję informację, że płatność się dokonała

    return session;
};
function removeAllCartItems() {
    throw new Error('Function not implemented.');
}
