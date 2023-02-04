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

    if (!cart?.cartItems) {
        throw new Error('cartItems not exist');
    }

    const createOrderItems = updateOrderItems({ cart, orderId });

    const clearCart = await clearCartByCartId({ cartId });

    const reduceProductTotalOption = await setProductOptionTotal(cart);

    const updatePaymentStatus = await updateOrderPaymentStatus({
        orderId,
        stripePaymentIntentStatus,
    });
};
