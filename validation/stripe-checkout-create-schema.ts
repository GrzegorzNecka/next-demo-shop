import * as yup from 'yup';

export const stripeCreateCheckoutSchema = yup
    .object({
        cartId: yup.string().required(),
        email: yup.string().required(),
    })
    .required();

export type StripeCreateCheckout = yup.InferType<typeof stripeCreateCheckoutSchema>;
