import { authApolloClient } from 'graphQL/apolloClient';
import type {
    GetUnpaidStripeCheckoutsByCartIdQuery,
    GetUnpaidStripeCheckoutsByCartIdQueryVariables,
    UpdateStripeCheckoutStatusMutation,
    UpdateStripeCheckoutStatusMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateStripeCheckoutStatusDocument } from 'graphQL/generated/graphql';
import { GetUnpaidStripeCheckoutsByCartIdDocument } from 'graphQL/generated/graphql';
import Stripe from 'stripe';
// import getOfferById from "services/airtable/offers/get";
// import airDB from "services/airtable/airtableClient";

export const finalize = async (cartId = 'cl9dvd6lcy1yx0atdaep1g1xw') => {
    // let offer = await getOfferById(offerId);
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        return { message: `no stripe secret key` };
        // throw new Error(`no stripe secret key`);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    const unpaidCheckouts = await authApolloClient.query<
        GetUnpaidStripeCheckoutsByCartIdQuery,
        GetUnpaidStripeCheckoutsByCartIdQueryVariables
    >({
        query: GetUnpaidStripeCheckoutsByCartIdDocument,
        variables: { cartId },
    });

    const firstCheckout = unpaidCheckouts.data.cart?.stripeCheckouts.at(0);
    const unpaidCheckoutId = firstCheckout?.stripeCheckoutId;
    // const checkoutElem = unpaidCheckouts.at(0)

    const checkout = await stripe.checkout.sessions.retrieve(unpaidCheckoutId!); // checkout_status => session

    //zabezpieczenie przed ponownym wykonaniem

    if (
        firstCheckout?.stripeCheckoutStatus === 'succeeded' ||
        checkout.payment_status === 'unpaid'
    ) {
        return { firstCheckout, checkout };
    }
    // /https://stripe.com/docs/api/payment_intents/retrieve

    if (!checkout?.payment_intent) {
        return;
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(String(checkout.payment_intent));

    if (paymentIntent.status === 'succeeded') {
        const updateCheckoutStatus = await authApolloClient.mutate<
            UpdateStripeCheckoutStatusMutation,
            UpdateStripeCheckoutStatusMutationVariables
        >({
            mutation: UpdateStripeCheckoutStatusDocument,
            variables: {
                stripeCheckoutId: unpaidCheckoutId!,
                stripeCheckoutStatus: paymentIntent.status,
            },
        });

        console.log('paymentIntent.status === "succeeded"');
        return { unpaidCheckoutId, checkout };
    }

    //paymentIntent.status === "succeeded" === oferta opłacona
};
