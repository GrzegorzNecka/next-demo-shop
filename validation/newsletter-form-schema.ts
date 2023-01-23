import * as yup from 'yup';

export const newsletterFormSchema = yup
    .object({
        email: yup.string().required('email jest wymagany').email().trim(),
        name: yup.string().required('name jest wymagany').min(3).trim(),
    })
    .required();

export type NewsletterFormSchema = yup.InferType<typeof newsletterFormSchema>;
