import React, { useRef, useState } from "react";
import { extractVariant } from "utils/product-options";
import { ProductVariants, VariantsTypeNamesUnion } from "../types";

const typenames: VariantsTypeNamesUnion[] = ["ProductColorVariant", "ProductSizeVariant", "ProductSizeColorVariant"];
//todo use memo ?
const extractProductVariants = (variants: ProductVariants) => {
    return typenames.map((typename) => {
        return extractVariant(variants, typename);
    });
};
//todo use memo ?
const initialID = (variant: ProductVariants) => variant?.at(0)?.id!;

const useProductVariant = (variant: ProductVariants) => {
    const [productColorVariant, productSizeVariant, productSizeColorVariant] = extractProductVariants(variant);

    const [activeColorVariantId, setActiveColorVariantId] = useState(initialID(productColorVariant));
    const [activeSizeVariantId, setActiveSizeVariantId] = useState(initialID(productSizeVariant));
    const [activeSizeColorVariantId, setActiveSizeColorVariantId] = useState(initialID(productSizeColorVariant));

    const colorVariant = {
        variant: productColorVariant,
        active: activeColorVariantId,
        update: setActiveColorVariantId,
    };

    const sizeVariant = {
        variant: productSizeVariant,
        active: activeSizeVariantId,
        update: setActiveSizeVariantId,
    };

    const sizeColorVariant = {
        variant: productSizeColorVariant,
        active: activeSizeColorVariantId,
        update: setActiveSizeColorVariantId,
    };

    return [colorVariant, sizeVariant, sizeColorVariant] as const;
};

export default useProductVariant;
