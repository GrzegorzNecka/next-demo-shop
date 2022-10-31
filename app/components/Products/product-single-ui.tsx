/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { NextSeo } from "next-seo";
import type { ProductDetailsProps, UnionVariants } from "./types";
import ProductOption from "components/Products/product-options";
import { useCartState } from "context/cart-context";
import Markdown from "components/markdown";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
// import type { ProductVariants, Option } from "components/Products/types";
// import ProductVariant from "./product-variant";
// import useProductVariant from "./hooks/use-product-option";
import { ProductColor, ProductSize } from "graphQL/generated/graphql";
import { ValueOf } from "types/types";
// import { groupOptions } from "utils/product-options";
import { Print } from "components/developer/print";

export const ProductSingleUI = ({ data }: ProductDetailsProps) => {
    const cartState = useCartState();

    const InitialId = data?.option?.[0]?.id;

    const isOpiotns = data?.option.length > 1 ? true : false;

    const [activeProductOption, setActiveProductOption] = useState<string>(InitialId);
    const [total, setTotal] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const handleOnClick = () => {
        // setTargetButton(data.title);

        const newCartItem = {
            productOptionId: activeProductOption,
            price: data.price,
            title: data.title,
            quantity,
            imgUrl: data.thumbnailUrl,
            slug: data.slug,
        };

        cartState.addItemToCart(newCartItem);
    };

    useEffect(() => {
        //
        const option = data.option.filter((option) => {
            if (option.id !== activeProductOption) {
                return null;
            }

            return option;
        });

        const [activeOption] = option;

        if (!activeOption.total) {
            return;
        }

        const cartTotal = cartState.items.find((item) => {
            return item.productOptionId === activeProductOption;
        });
        console.log("🚀 ~ file: product-single-ui.tsx ~ line 92 ~ cartTotal ~ cartTotal", cartTotal);

        if (cartTotal) {
            setTotal(activeOption.total - cartTotal.quantity);
            return;
        }

        setTotal(activeOption.total);
    }, [activeProductOption, cartState]);

    return (
        <>
            <SeoProvider data={data} />

            {/* <Print data={data?.option} /> */}

            <div className="font-mono ">
                <div className="grid grid-cols-2 gap">
                    <div>
                        <Image
                            src={data.thumbnailUrl}
                            alt={data.thumbnailAlt}
                            className=""
                            layout="responsive"
                            width={16}
                            height={9}
                            objectFit="contain"
                            objectPosition="center"
                        />
                    </div>

                    <div className="">
                        <div className="flex justify-between pb-8">
                            <h2 className="font-bold text-xl ">{data.title}</h2>
                            <span className=" font-medium text-xl justify-self-end">{data.priceWithCurrency}</span>
                            {/* <ProductArithmeticRating productSlug={data.slug} /> */}
                        </div>
                        {/* // product option */}

                        {isOpiotns && (
                            <ProductOption
                                activeOption={activeProductOption}
                                updateOption={setActiveProductOption}
                                option={data.option}
                            >
                                warianty
                            </ProductOption>
                        )}

                        <div>{total ? `total: ${total}` : "brak w magazynie"}</div>

                        {/* <div>wybrano: {activeProductOption} </div> */}

                        {cartState.isLoading ? (
                            <div className="flex mb-8">
                                {total ? (
                                    <input
                                        disabled
                                        value={quantity}
                                        type="number"
                                        className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                                    />
                                ) : null}

                                <button disabled className={`mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}>
                                    dodawanie
                                </button>
                            </div>
                        ) : (
                            <div className="flex mb-8">
                                {total ? (
                                    <input
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        type="number"
                                        className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                                        max={total}
                                        min={1}
                                    />
                                ) : null}

                                {total ? (
                                    <button
                                        className={` mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}
                                        onClick={handleOnClick}
                                    >
                                        dodaj do koszyka
                                    </button>
                                ) : null}
                            </div>
                        )}

                        {/* <Print data={data.option} /> */}

                        <article className="">
                            <Markdown>{data.longDescription}</Markdown>
                        </article>
                    </div>
                </div>
                <hr />
                <div className="w-3/4 my-16 mx-auto">{/* <ProductReviewContainer productSlug={data.slug} /> */}</div>
            </div>
        </>
    );
};

// todo memoizazja na seo

const SeoProvider = ({ data }: ProductDetailsProps) => {
    return (
        <>
            <NextSeo
                title={` produkt ${data.title}`}
                description={`${data.description}`}
                canonical={`https://naszsklep.vercel.app/products/${data.id}`}
                openGraph={{
                    url: `https://naszsklep.vercel.app/products/${data.id}`,
                    title: data.title,
                    description: data.description,
                    images: [
                        {
                            url: data.thumbnailUrl,
                            alt: data.thumbnailAlt,
                            type: "image/jpeg",
                        },
                    ],
                    site_name: "naszsklep",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
        </>
    );
};
