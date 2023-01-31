// import { ProductOption } from "components/Products/types";

export interface CartItem {
    readonly itemId?: string;
    readonly price: number;
    readonly title: string;
    quantity: number;
    readonly imgUrl: string;
    readonly slug: string;
    readonly productOptionId: string;
}

export interface CartState {
    readonly items: readonly CartItem[];
    readonly addItemToCart: (item: CartItem) => void;
    readonly removeItemFromCart: (id: string) => void;
    readonly clearCartItems: () => void;
    readonly total: number | undefined;
    readonly isLoading: boolean;
}

//--------- API --------------

export interface Token {
    readonly token: string;
}

export interface ResponseCartItems {
    readonly status: string;
    readonly cartItems?: CartItem[];
    readonly error?: string;
    readonly message?: string;
}

export interface State {
    readonly token: string;
    readonly cartItems: CartItem[];
}
