import type { CartState } from 'types/context';
import type { Option } from 'graphQL/generated/graphql';
import type { MarkdownResult } from 'types/types';
// import { ValueOf } from 'types/types';

export type ProductOption = Pick<Option, 'color' | 'size' | '__typename' | 'id' | 'total'>;
export type ProductOptionList = Pick<Option, 'id'>;

export interface ProductProps {
    readonly id: string;
    readonly title: string;
    readonly thumbnailUrl: string;
    readonly thumbnailAlt: string;
    readonly slug: string;
    readonly price: number;
    readonly priceWithCurrency: string;
    // rating: number;
}

export interface ProductDetails extends ProductProps {
    readonly longDescription: MarkdownResult;
    readonly option: readonly ProductOption[];
    readonly description: string;
}

export interface ProductDetailsProps {
    data: ProductDetails;
}

export interface ProductListItems extends ProductProps {
    readonly option: readonly ProductOptionList[];
    // rating: number;
}

export interface ProductListItemProps {
    data: ProductListItems;
}

//--- AddToCartBtn Component

export interface ButtonAddToCartViewProps {
    readonly cartState: CartState;
    readonly product: ProductDetails;
    readonly activeOptionId: string;
    readonly quantity: number;
    readonly setQuantity: React.Dispatch<React.SetStateAction<number>>;
    readonly availableQuantity: number;
    readonly testTotal: number | undefined;
}

export interface ButtonAddToCartProps {
    readonly data: ProductDetails;
    readonly activeOptionId: string;
}
