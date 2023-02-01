import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        email: string;
        cartId?: string;
    }

    interface Session {
        user: User;
    }

    interface;
}

export declare type NextApiHandlerWithAuth<T = any> = (
    req: NextApiRequestAuth,
    res: NextApiResponse<T>,
) => unknown | Promise<unknown>;
