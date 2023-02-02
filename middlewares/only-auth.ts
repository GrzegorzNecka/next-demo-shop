import { unstable_getServerSession } from 'next-auth/next';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import type { NextApiHandlerWithAuth } from 'types/next-auth';

export interface NextApiRequestAuth extends NextApiRequest {
    /**
     * Paramterer of `cartId` values from session, where it is fetched from hygraph
     */
    cartId: string;
}

const onlyAuth = (handler: NextApiHandlerWithAuth) => {
    return async (req: NextApiRequestAuth, res: NextApiResponse) => {
        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session || !session?.user.cartId) {
            res.status(401).json({
                success: false,
                message: 'Please log in to get access.',
            });
            return;
        }

        req.cartId = session.user.cartId;

        return handler(req, res);
    };
};

export default onlyAuth;
