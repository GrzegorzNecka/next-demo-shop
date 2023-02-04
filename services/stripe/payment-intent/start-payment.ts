import clearCartByCartId from 'services/hygraph/cart/by-account/clear-cart';
import getCartByCartId from 'services/hygraph/cart/by-account/get-cart';
import { updateOrderItems } from 'services/hygraph/order/update-order-items';
import { updateOrderPaymentStatus } from 'services/hygraph/order/update-order-payment-status';
import { setProductOptionTotal } from 'services/hygraph/product/set-product-option-total';

type StartPaymentProps = {
    cartId: string;
    orderId: string;
    stripePaymentIntentStatus: string;
};

export const startPayment = async ({
    cartId,
    orderId,
    stripePaymentIntentStatus,
}: StartPaymentProps) => {
    const cart = await getCartByCartId({
        id: cartId,
    });
    console.log('🚀 ~ file: start-payment.ts:21 ~ cart', cart);

    if (!cart) {
        console.log('cart no exist');
    }

    const createOrderItems = await updateOrderItems({ cart, orderId });
    console.log('🚀 ~ file: start-payment.ts:27 ~ createOrderItems', createOrderItems);

    const clearCart = await clearCartByCartId({ cartId });
    console.log('🚀 ~ file: start-payment.ts:30 ~ clearCart', clearCart);

    const reduceProductTotalOption = await setProductOptionTotal(cart);
    console.log(
        '🚀 ~ file: start-payment.ts:33 ~ reduceProductTotalOption ',
        reduceProductTotalOption,
    );

    const updatePaymentStatus = await updateOrderPaymentStatus({
        orderId,
        stripePaymentIntentStatus,
    });
    console.log('🚀 ~ file: start-payment.ts:42 ~ updatePaymentStatus', updatePaymentStatus);
};
