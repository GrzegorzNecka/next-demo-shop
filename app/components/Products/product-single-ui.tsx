/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { NextSeo } from "next-seo";
import type { ProductDetailsProps } from "./types";
import ProductOption from "components/Products/product-options";
import { useCartState } from "context/cart-context";
import Markdown from "components/markdown";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

export const ProductSingleUI = ({ data }: ProductDetailsProps) => {
    const cartState = useCartState();

    const isProductOpiotns = data?.option.length > 1 ? true : false;

    const [activeProductOptionId, setActiveProductOptionId] = useState<string>(data.option?.[0].id);
    const [numberOfAvailableProductOptions, setNumberOfAvailableProductOptions] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const resetQuantity = () => setQuantity(1);

    const findActiveProductOption = () => {
        return data.option.filter((option) => {
            if (option.id !== activeProductOptionId) {
                return null;
            }

            return option;
        });
    };

    //todo  zamiast tego effectu możę lepiej zrobić z tego osobny komponent i dodać do niego useMomo na propsa
    useEffect(() => {
        //
        const [activeProductOption] = findActiveProductOption();

        if (!activeProductOption.total) {
            return;
        }

        const cartItemOption = cartState.items.find((item) => {
            return item.productOptionId === activeProductOptionId;
        });

        if (cartItemOption) {
            setNumberOfAvailableProductOptions(activeProductOption.total - cartItemOption.quantity);
            return;
        }

        setNumberOfAvailableProductOptions(activeProductOption.total);
    }, [activeProductOptionId, cartState]);

    const handleOnClick = () => {
        const newCartItem = {
            productOptionId: activeProductOptionId,
            price: data.price,
            title: data.title,
            quantity,
            imgUrl: data.thumbnailUrl,
            slug: data.slug,
        };

        cartState.addItemToCart(newCartItem);

        //todo po pomyślnym dodaniu do koszyka zresetuj input
        resetQuantity();
    };

    return (
        <>
            {/* // todo na tym elemencie też memoizacja ale z rozbiciem data przez Object.value() lub objec stringify i porównój wartości watrybutów */}
            <SeoProvider data={data} />

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

                        {isProductOpiotns && (
                            <ProductOption
                                activeOption={activeProductOptionId}
                                updateOption={setActiveProductOptionId}
                                option={data.option}
                            >
                                warianty
                            </ProductOption>
                        )}

                        <div>
                            {numberOfAvailableProductOptions
                                ? `total: ${numberOfAvailableProductOptions}`
                                : "brak w magazynie"}
                        </div>

                        {/* <div>wybrano: {activeProductOption} </div> */}

                        {cartState.isLoading ? (
                            <div className="flex mb-8">
                                {numberOfAvailableProductOptions ? (
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
                                {numberOfAvailableProductOptions ? (
                                    <input
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        type="number"
                                        className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                                        max={numberOfAvailableProductOptions}
                                        min={1}
                                    />
                                ) : null}

                                {numberOfAvailableProductOptions ? (
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
