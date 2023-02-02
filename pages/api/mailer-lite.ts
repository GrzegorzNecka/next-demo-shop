import type { NextApiHandler } from 'next';

/**
 *
 * docs: https://developers.mailerlite.com/reference/add-single-subscriber
 *
 */

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'POST': {
            try {
                const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
                const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

                if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
                    return res.status(500).json({ error: 'Nie podano zmiennych środowiskowych' });
                }

                const json = JSON.parse(req.body);
                const { email, name } = json;

                if (typeof email !== 'string') {
                    return res.status(400).end();
                }

                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'X-MailerLite-ApiDocs': 'true',
                        'Content-Type': 'application/json',
                        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
                    },
                    body: JSON.stringify({
                        email: email,
                        fields: {
                            name: name,
                            last_name: 'Testerson',
                        },
                        groups: [MAILERLITE_GROUP_ID],
                        resubscribe: false,
                        autoresponders: true,
                    }),
                };

                const mailerLiteResponse = await fetch(
                    `https://api.mailerlite.com/api/v2/subscribers`,
                    options,
                );

                if (!mailerLiteResponse.ok) {
                    return res
                        .status(mailerLiteResponse.status)
                        .json({ error: mailerLiteResponse.statusText });
                }

                return res.status(201).json({ statusText: mailerLiteResponse.statusText });
            } catch (err) {
                return res.status(400).json({
                    message: 'Bad Request - verify that the cartId parameter exist',
                    err,
                });
            }
        }
        default:
            return res.status(400).json({
                message: 'Bad Request',
            });
    }
};

export default handler;
