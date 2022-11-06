import {
    ProductColor,
    ProductSize,
    Option,
    ProductColorVariant,
    ProductSizeColorVariant,
    ProductSizeVariant,
} from "graphQL/generated/graphql";
import { ValueOf } from "types/types";

export type UnionVariants = ProductColorVariant | ProductSizeColorVariant | ProductSizeVariant;
export type VariantsTypeNamesUnion = ValueOf<Pick<UnionVariants, "__typename">>;
export type ProductVariants = readonly UnionVariants[] | null;

function extractVariant<V extends ProductVariants, T extends VariantsTypeNamesUnion>(variants: V, typename: T) {
    if (!variants) {
        return null;
    }

    return variants?.filter((variant) => {
        if (variant.__typename === typename) {
            return variant;
        }
    });
}

type Value = ProductColor | ProductSize;

type Prop = keyof Pick<Option, "color" | "size">;
type ReducerObject = {
    name: Value;
    variation: Option[];
};

const groupOptions = (options: readonly Option[] | undefined, prop: Prop) => {
    if (!options) {
        return;
    }

    return options.reduce<ReducerObject[]>((acc, currentObj) => {
        const value = currentObj[prop];

        if (!value) {
            return [];
        }

        const existObj = acc.find((obj) => {
            console.log("🚀 ~ file: product-options.ts ~ line 42 ~ existObj ~ obj", value);

            const existName = obj.name;

            return existName === value;
        });

        if (!existObj) {
            const newObj = {
                name: value,
                variation: [currentObj],
                // [value]: [currentObj],
            };

            acc.push(newObj);

            return acc;
        }

        existObj.variation = [currentObj, { ...existObj.variation[0] }];

        return acc;
    }, []);
};

export { extractVariant, groupOptions };
