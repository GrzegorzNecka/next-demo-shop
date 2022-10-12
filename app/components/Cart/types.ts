export interface CartItem {
    readonly itemId?: string;
    readonly productId: string;
    readonly price: number;
    readonly title: string;
    readonly quantity: number;
    readonly imgUrl: string;
    readonly slug: string;
}

export interface CartState {
    readonly items: readonly CartItem[];
    readonly addItemToCart: (item: CartItem) => void;
    readonly removeItemFromCart: (id: string) => void;
    readonly clearCartItems: () => void;
    readonly total: number;
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
