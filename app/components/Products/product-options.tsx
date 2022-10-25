import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ProductVariants } from "./types";
import { useRouter } from "next/router";
// import { ProductVariants } from "graphQL/generated/graphql";
interface ProductVariantProps {
    variant: ProductVariants;
    children: React.ReactNode;
    activeVariantId: string;
    updateOption: Dispatch<SetStateAction<string>>;
}

const ProductOption = ({ variant, children, activeVariantId, updateOption }: ProductVariantProps) => {
    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateOption(event.target.value);
    };

    return (
        <>
            {variant && variant.length >= 1 ? (
                <div className="md:w-3/4 px-3 mb-6">
                    <label
                        className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                        htmlFor="style"
                    >
                        {children}
                    </label>
                    <div className="relative">
                        <select
                            id="style"
                            name="style"
                            value={activeVariantId}
                            className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                            onChange={onChange}
                        >
                            {variant.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"></div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

const MemoizedProductVariant = React.memo(ProductOption);

export default MemoizedProductVariant;
