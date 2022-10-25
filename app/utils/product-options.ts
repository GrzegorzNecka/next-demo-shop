import { ProductVariants, VariantsTypeNamesUnion, Option } from "components/Products/types";

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

// type Value = ProductColor | ProductSize;

// type ReducerObject = Record<Value, Option[]>;
// type ReducerObject = {
//     [key in Value]: Option[];
// };

// type ReducerObject = Record<string, Option[]>;

type Prop = keyof Pick<Option, "color" | "size">;
type ReducerObject = {
    [value in string]: Option[];
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
            const existValue = obj[value]?.[0][prop];

            return existValue === value;
        });

        if (!existObj) {
            const newObj = {
                [value]: [currentObj],
            };

            acc.push(newObj);

            return acc;
        }

        existObj[value] = [currentObj, { ...existObj[value][0] }];

        return acc;
    }, []);
};

export { extractVariant, groupOptions };
