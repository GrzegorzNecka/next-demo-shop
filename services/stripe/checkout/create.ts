import { apolloClient, authApolloClient } from 'graphQL/apolloClient';
import type {
    CreateStripeCheckoutEndpointByCartMutation,
    CreateStripeCheckoutEndpointByCartMutationVariables,
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables,
} from 'graphQL/generated/graphql';
import { CreateStripeCheckoutEndpointByCartDocument } from 'graphQL/generated/graphql';
import { GetProductBySlugDocument } from 'graphQL/generated/graphql';
import type { CheckoutPayload } from 'pages/api/checkout';
import Stripe from 'stripe';
import stripeCreateCheckoutSchema from 'validation/stripe-checkout-create-schema';

export const createCheckout = async (payload: CheckoutPayload) => {
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

    const products = await Promise.all(
        payload.products.map(async (cartItem) => {
            const product = await apolloClient.query<
                GetProductBySlugQuery,
                GetProductBySlugQueryVariables
            >({
                query: GetProductBySlugDocument,
                variables: { slug: cartItem.slug },
            });

            return {
                product: product.data.product,
                quantity: cartItem.quantity,
                option: product.data.product?.option.find((o) => o.id === cartItem.productOptionId),
            };
        }),
    );

    //todo - description powinien być wyskakiwać z pętli

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((item) => {
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
                        //todo - tu muszę odebrać id koszyka
                    },
                },
            },
            quantity: item.quantity,
        };
    });

    //todo - 1 -  tu mogę stworzyćpusty order i pobrać jego id

    const paymentObject = {
        mode: 'payment',
        locale: 'pl',
        payment_method_types: ['p24', 'card', 'blik'],
        success_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/cancel?canceled=true`,
        line_items: lineItems,
        payment_intent_data: {
            metadata: { mail: '123@gmail.com', cartId: 666 },
        },
        metadata: { mail: '123@gmail.com', cartId: 666 }, //todo -  2 - tu najlepiej jakby było id Orderu
    } satisfies Stripe.Checkout.SessionCreateParams;

    const session = await stripe.checkout.sessions.create(paymentObject);

    //todo - 3 - tu uzupełniam dane całego orderu

    //
    //!todo - stworzenie order w graphCms- status unpaid
    // const createStripeCheckoutEndpoint = await authApolloClient.mutate<
    //     CreateStripeCheckoutEndpointByCartMutation,
    //     CreateStripeCheckoutEndpointByCartMutationVariables
    // >({
    //     mutation: CreateStripeCheckoutEndpointByCartDocument,
    //     variables: {
    //         cartId: payload.cartId,
    //         stripeCheckoutId: session.id,
    //         stripeCheckoutStatus: session.payment_status,
    //         stripePaymentIntent: String(session.payment_intent),
    //         //todo - powinieneś podać tu listę produktów z ceną i nazwą
    //     },
    // });

    // console.log('🚀 ~  createStripeCheckoutEndpoint', createStripeCheckoutEndpoint);

    //todo 1 - koszyk powinien zostać usunięty, a raczej jego stan przeniesiony do order
    //todo 2 - jeśli payment.success = w magazynie zmniejsz liczbę towarów o to oc zostało kupione
    //todo 3 - nowy koszyk powinien zostać utworzony - w sensie rozważ kilka koszyków w ramach konta
    //todo 4 - więc to do koszyka powinien być przypisany idStripa
    // hygaph - też ma webhooki
    //---stripe webhook
    //todo - jesli płatność ma status sukcess to wtedy oznaczamy w hygraph jako zakończone

    // dostaję informację, że płatność się dokonała

    return session;
};
