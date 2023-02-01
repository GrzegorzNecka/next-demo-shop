import type { NextApiHandler } from 'next/types';
import { getProductOptionTotal } from 'services/hygraph/product/get-product-option-total';

const productTotalHandler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET': {
            try {
                const { id } = req.query;

                const total = await getProductOptionTotal(id as string);

                if (!total) {
                    return;
                }

                res.status(200).json({ total });
                return;
            } catch (err) {
                res.status(422).json({ status: 'not_fectched', err });
                return;
            }
        }
        default:
            res.status(400);
            return;
    }
};

export default productTotalHandler;
