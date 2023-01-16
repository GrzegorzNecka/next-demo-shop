import { apolloClient } from 'graphQL/apolloClient';
import type {
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables,
} from 'graphQL/generated/graphql';
import { GetProductBySlugDocument } from 'graphQL/generated/graphql';
import Stripe from 'stripe';

type RequestBody = {
    slug: string;
    productOptionId: string;
    quantity: number;
}[];

export const createCheckout = async (payload: RequestBody) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        throw new Error(`no stripe secret key`);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    const products = await Promise.all(
        payload.map(async (cartItem) => {
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

    const lineItems = products.map((item) => {
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
                    description: `color: ${item.option?.color}, size: ${item.option?.size}`,
                    images: item.product!.images.map((i) => i.url),
                    // metadata: {
                    //   slug: item.product!.slug,
                    //   id: item.option?.id,
                    // },
                },
            },
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        locale: 'pl',
        payment_method_types: ['p24', 'card'],
        success_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/success?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout/cancel?canceled=true`,
        line_items: lineItems,
        mode: 'payment',
    });

    return session;
};
