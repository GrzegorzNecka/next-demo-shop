/* eslint-disable @next/next/no-img-element */
import { useCartState } from "components/Cart/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { ProductListItems } from "../types";

interface ProductListItemProps {
    data: ProductListItems;
    targetButton: string | null;
    setTargetButton: Dispatch<SetStateAction<string | null>>;
}

const ProductListItem = ({ data, targetButton, setTargetButton }: ProductListItemProps) => {
    const cartState = useCartState();

    const [quantity, setQuantity] = useState<number>(1);
    // todo - quantity to powinine być stan , lktóry spływa z serwera, tak aby nie przekroczyć limitu
    const handleOnClick = () => {
        setTargetButton(data.title);

        const newCartItem = {
            productId: data.id,
            price: data.price,
            title: data.title,
            quantity: quantity,
            imgUrl: data.thumbnailUrl,
            slug: data.slug,
        };

        cartState.addItemToCart(newCartItem);
    };

    return (
        <div className="p-8">
            <div className="w-full bg-white md:aspect-w-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <Image
                    src={data.thumbnailUrl}
                    alt={data.thumbnailAlt}
                    className="w-full h-full  lg:w-full lg:h-full mix-blend-multiply"
                    layout="responsive"
                    width={4}
                    height={3}
                    objectFit="contain"
                    objectPosition="center"
                    priority
                />
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={`/product/${data.slug}`}>
                            <a className="hover:underline">
                                <span aria-hidden="true" className="">
                                    {data.title}
                                </span>
                            </a>
                        </Link>
                    </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{data.priceWithCurrency}</p>
            </div>
            <div className="pt-4">
                {cartState.isLoading && targetButton === data.title ? (
                    <div className="flex mb-8">
                        <input
                            disabled
                            value={quantity}
                            type="number"
                            className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                        />
                        <button disabled className={`mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}>
                            dodawanie
                        </button>
                    </div>
                ) : (
                    <div className="flex mb-8">
                        <input
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            type="number"
                            className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                        />
                        <button
                            className={` mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}
                            onClick={handleOnClick}
                        >
                            dodaj do koszyka
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const MemoizedProductListItem = React.memo(ProductListItem);

export default MemoizedProductListItem;
