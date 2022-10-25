import {
    ProductColorVariant,
    ProductSizeColorVariant,
    ProductSizeVariant,
    ProductColor,
    ProductSize,
} from "graphQL/generated/graphql";
import { MarkdownResult, ValueOf } from "types/types";

/*
 
 -----------  Product Details  -----------
 
 */

export type UnionVariants = ProductColorVariant | ProductSizeColorVariant | ProductSizeVariant;
export type VariantsTypeNamesUnion = ValueOf<Pick<UnionVariants, "__typename">>;
export type ProductVariants = readonly UnionVariants[] | null;

export type Option = {
    readonly __typename?: "Option";
    readonly quantity: number;
    readonly id: string;
    readonly color?: ProductColor | null;
    readonly size?: ProductSize | null;
};

export interface ProductDetails {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly thumbnailUrl: string;
    readonly thumbnailAlt: string;
    readonly slug: string;
    readonly price: number;
    readonly priceWithCurrency: string;
    readonly option?: ReadonlyArray<Option>;
    // rating: number;
    readonly longDescription: MarkdownResult;
}

export interface ProductDetailsProps {
    data: ProductDetails;
}

/*
 
   ----------- Product List  -----------
 
 */

export type ProductListItems = Pick<
    ProductDetails,
    "id" | "slug" | "price" | "priceWithCurrency" | "title" | "thumbnailUrl" | "thumbnailAlt" | "option"
>;
