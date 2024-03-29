import type { NextApiHandler } from 'next';
import * as yup from 'yup';
import * as bcrypt from 'bcrypt';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
  ConnectAccountWithCartAndPublishMutation,
  ConnectAccountWithCartAndPublishMutationVariables,
  CreateAccountMutation,
  CreateAccountMutationVariables,
  CreateCartMutation,
  CreateCartMutationVariables,
} from 'graphQL/generated/graphql';
import {
  ConnectAccountWithCartAndPublishDocument,
  CreateAccountDocument,
  CreateCartDocument,
} from 'graphQL/generated/graphql';

export const signUpFormSchema = yup
  .object({
    email: yup.string().required('pole jest wymagane').email(),
    password: yup.string().required('pole jest wymagane').min(3),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'hasła muszą być takie same'),
  })
  .required();

type SignUpFormData = yup.InferType<typeof signUpFormSchema>;

const SignupHandler: NextApiHandler = async (req, res) => {
  const { email, password, passwordConfirmation }: SignUpFormData = await JSON.parse(req.body);

  const isValid = signUpFormSchema.isValid({
    email,
    password,
    passwordConfirmation,
  });

  if (!isValid) {
    res.status(400).json({ message: 'bad payload' });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // -- HYGRAPH CONNECT

  const account = await authApolloClient.mutate<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >({
    mutation: CreateAccountDocument,
    variables: { email, password: passwordHash },
  });

  const accountId = account.data?.createAccount?.id;

  if (!accountId) {
    res.status(500).json({ message: 'fixed create account' });
    return;
  }

  const cart = await authApolloClient.mutate<CreateCartMutation, CreateCartMutationVariables>({
    mutation: CreateCartDocument,
    fetchPolicy: 'no-cache',
  });

  const cartId = cart.data?.createCart?.id;

  if (!cartId) {
    res.status(500).json({ message: 'fixed create cart' });
    return;
  }

  const connectAccountWithCartAndPublishAll = await authApolloClient.mutate<
    ConnectAccountWithCartAndPublishMutation,
    ConnectAccountWithCartAndPublishMutationVariables
  >({
    mutation: ConnectAccountWithCartAndPublishDocument,
    variables: {
      accountId,
      cartId,
    },
  });

  if (!connectAccountWithCartAndPublishAll) {
    res.status(500).json({ message: 'fixed publish' });
    return;
  }

  res.json({ status: 'created' });
  return;
};

export default SignupHandler;
