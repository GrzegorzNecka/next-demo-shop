import * as yup from 'yup';

const stripeCreateCheckoutSchema = yup
    .object()
    .shape({
        product: yup.array().of(
            yup.object().shape({
                slugs: yup.string().required(),
                productOptionId: yup.string().required(),
                quantity: yup.number().positive().required(),
            }),
        ),
        cartId: yup.string().required(),
    })
    .required();

export type StripeCreateCheckout = yup.InferType<typeof stripeCreateCheckoutSchema>;

export default stripeCreateCheckoutSchema;
