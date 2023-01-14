import type { NextApiHandler } from 'next/types';
import type { CookieValueTypes } from 'cookies-next';

import { getCookieCartId } from 'services/cookies/get-cookie-cart-id';

interface Response {
  readonly message?: string;
  readonly id?: CookieValueTypes;
}

const handler: NextApiHandler<Response> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(400).json({ message: 'bad request method' });
    return;
  }

  const cookieCartId = await getCookieCartId(req, res);

  if (!cookieCartId) {
    res.status(400).json({ message: 'not found cookie' });
    return;
  }

  res.status(200).json({ id: cookieCartId });
};

export default handler;
