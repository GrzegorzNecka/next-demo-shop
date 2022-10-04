/* eslint-disable @next/next/no-img-element */
import { useCartState } from "components/Cart/Context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import { ProductListItems } from "../types";

interface ProductListItemProps {
    data: ProductListItems;
    targetButton: string | null;
    setTargetButton: Dispatch<SetStateAction<string | null>>;
}

const ProductListItem = ({ data, targetButton, setTargetButton }: ProductListItemProps) => {
    const cartState = useCartState();

    const handleOnClick = () => {
        setTargetButton(data.title);

        const newItem = {
            id: data.id,
            price: data.price,
            title: data.title,
            count: 1,
            imgUrl: data.thumbnailUrl,
            slug: data.slug,
        };

        cartState.addItemToCart(newItem);
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
                        <button disabled className={`mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}>
                            dodawanie
                        </button>
                    </div>
                ) : (
                    <div className="flex mb-8">
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
