import React, { useState } from "react";
import { ProductListIdPageProps } from "pages/products/[productId]";
import { changeToCurrency, moveTheComa } from "utils/currency";
import ProductListItem from "./ProductListItem";

const ProductList = ({ data }: ProductListIdPageProps) => {
    const [targetButton, setTargetButton] = useState<string | null>(null);

    if (!data) {
        return <div>nie znaleziono strony</div>;
    }

    return (
        <ul className="relative  bg-white w-full mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
            {data.map((product) => (
                <li key={product.slug} className={`className="group relative" ${product.slug}`}>
                    <ProductListItem
                        data={{
                            id: product.id,
                            slug: product.slug,
                            title: product.name,
                            thumbnailUrl: product.images[0].url,
                            thumbnailAlt: product.images[0].id,
                            price: product.price,
                            priceWithCurrency: changeToCurrency(moveTheComa(product.price)),
                        }}
                        targetButton={targetButton}
                        setTargetButton={setTargetButton}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
