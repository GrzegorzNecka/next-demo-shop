import type { CartItem } from 'types/context';

type CalculateTotalProps = Array<Pick<CartItem, 'quantity'>>;

const calculateTotal = (cartItem: CalculateTotalProps) => {
    const itemsLength = cartItem.map((obj) => {
        return obj.quantity;
    });

    const total = itemsLength?.reduce((prev, current) => prev + current, 0);
    return total;
};

export default calculateTotal;
