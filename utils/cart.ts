import { CartItem } from 'context/types';
import { GetCartItemsByCartIdQuery } from 'graphQL/generated/graphql';

export function productToCartItem(item: CartItem) {
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

export function fetchedToCartItem({ cart }: { cart: GetCartItemsByCartIdQuery['cart'] }) {
  if (!cart) {
    return [];
  }

  const fetchedCartItems = cart?.cartItems.map((item) => {
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

  return fetchedCartItems;
}
