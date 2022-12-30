import { Option } from 'graphQL/generated/graphql';
import { MarkdownResult, ValueOf } from 'types/types';

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
