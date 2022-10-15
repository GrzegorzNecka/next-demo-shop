import { ProductVariants, VariantsTypeNamesUnion } from "components/Products/types";

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

export { extractVariant };
