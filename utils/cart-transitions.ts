import type { CartItem } from 'context/types';
import type { GetCartItemsByCartIdQuery } from 'graphQL/generated/graphql';
import type { ProductDetails } from 'components/products/types';

export function transitionProductToCartItemOfContextByCookieId(item: CartItem) {
    return {
        itemId: `-${Math.random().toString(16).slice(2)}`,
        quantity: item?.quantity!,
        price: item?.price!,
        title: item?.title!,
        imgUrl: item?.imgUrl!,
        slug: item?.slug!,
        productOptionId: item?.productOptionId!,
    };
}

// -- for authorization cart

export function transitionFetchedDataToCartOfContext({
    cart,
}: {
    cart: GetCartItemsByCartIdQuery['cart'];
}) {
    if (!cart) {
        return [];
    }

    const tranistionCartItems = cart?.cartItems.map((item) => {
        return {
            itemId: item.id,
            quantity: item?.quantity!,
            price: item?.option?.product?.price!,
            title: item?.option?.product?.name!,
            imgUrl: item?.option?.product?.images.at(0)?.url!,
            slug: item?.option?.product?.slug!,
            productOptionId: item?.option?.id!,
        };
    });

    return tranistionCartItems;
}

type TransitionProductDataToCartItemOfContext = {
    activeOptionId: string;
    product: ProductDetails;
    quantity: number;
};

export const transitionProductDataToCartItemOfContext = ({
    activeOptionId,
    product,
    quantity,
}: TransitionProductDataToCartItemOfContext) => {
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
