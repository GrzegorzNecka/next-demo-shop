import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { UseMutateFunction } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import FormInput from './form-input';

const useAddToNewsletterMutation = () =>
  useMutation(['add-to-newsletter'], async ({ email, name }: { email: string; name: string }) => {
    await fetch('http://localhost:3000/api/mailerLite', {
      method: 'POST',
      headers: { 'Cintent-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
  });

// -- CONTAINER

export const NewsletterForm = () => {
  const { mutate, isLoading, isSuccess } = useAddToNewsletterMutation();

  return <NewsletterFormView mutate={mutate} isLoading={isLoading} isSuccess={isSuccess} />;
};

// -- types for NewsletterFormView

type NewsletterFormViewProps = {
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      email: string;
      name: string;
    },
    unknown
  >;
  isLoading: boolean;
  isSuccess: boolean;
};

// -- PREZENTATION

export const NewsletterFormView = ({ mutate, isLoading, isSuccess }: NewsletterFormViewProps) => {
  //
  const formSchema = yup
    .object({
      email: yup.string().required('email jest wymagany').email().trim(),
      name: yup.string().required('name jest wymagany').min(3).trim(),
    })
    .required();

  type formData = yup.InferType<typeof formSchema>;

  const { register, handleSubmit, formState } = useForm<formData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate({ email: data.email, name: data.name });
  });

  return (
    <div className="flex flex-col md:w-full">
      <h2 className="mb-4 font-bold md:text-xl text-heading ">subscribe us</h2>
      <form onSubmit={onSubmit} className="justify-center w-full mx-auto">
        <div className="mt-4">
          <div className="w-full">
            <FormInput type="text" placeholder="Name" name="name" useForm={{ register, formState }}>
              Name
            </FormInput>
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              useForm={{ register, formState }}>
              Email
            </FormInput>
          </div>
        </div>

        {!isSuccess ? (
          <div className="mt-4">
            <button disabled={isLoading} className="w-full btn-custom-primary">
              subscribe !
            </button>
          </div>
        ) : (
          <span>subscribe was successed</span>
        )}
      </form>
    </div>
  );
};
