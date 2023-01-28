import type { ProductDetails } from 'components/products/types';

type CreateContextCartItemProps = {
    activeOptionId: string;
    product: ProductDetails;
    quantity: number;
};

const createContextCartItem = ({
    activeOptionId,
    product,
    quantity,
}: CreateContextCartItemProps) => {
    const newCartItem = {
        productOptionId: activeOptionId,
        price: product.price,
        title: product.title,
        quantity,
        imgUrl: product.thumbnailUrl,
        slug: product.slug,
    };

    return newCartItem;
};

export default createContextCartItem;
