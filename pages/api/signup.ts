import type { NextApiHandler } from 'next';
import * as bcrypt from 'bcrypt';
import type { SignUpFormData } from 'validations/signup-form-shchema';
import signUpFormSchema from 'validations/signup-form-shchema';
import createAccountId from 'services/hygraph/account/create-account-id';
import createCart from 'services/hygraph/cart/create-cart';
import connectAccountWithCart from 'services/hygraph/account/connect-account-with-cart';

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

    /**
     * Connect to hygraph
     */

    const accountId = await createAccountId(email, passwordHash);

    if (!accountId) {
        res.status(500).json({ message: 'fixed create account' });
        return;
    }

    const cartId = await createCart();

    if (!cartId) {
        res.status(500).json({ message: 'fixed create cart' });
        return;
    }

    const connect = await connectAccountWithCart(accountId, cartId);

    if (!connect) {
        res.status(500).json({ message: 'fixed publish' });
        return;
    }

    res.json({ status: 'created' });
    // res.status(201).json({ status: 'created' });
    return;
};

export default SignupHandler;
