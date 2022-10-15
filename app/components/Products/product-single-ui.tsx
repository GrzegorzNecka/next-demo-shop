/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { NextSeo } from "next-seo";
import type { ProductDetailsProps, UnionVariants } from "./types";
import { useCartState } from "components/Cart/context/cart-context";
import Markdown from "components/markdown";
import { ChangeEvent, useMemo, useState } from "react";
import { ProductVariants } from "components/Products/types";

import ProductVariant from "./product-variant";
import useProductVariant from "./hooks/use-product-variant";

export const ProductSingleUI = ({ data }: ProductDetailsProps) => {
    const cartState = useCartState();

    const [colorVariant, sizeVariant, sizeColorVariant] = useProductVariant(data.variants!);

    const variants = [colorVariant.active, sizeVariant.active, sizeColorVariant.active].filter(
        (el) => el !== undefined
    );

    return (
        <>
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

                        <ProductVariant
                            variant={colorVariant.variant}
                            activeVariantId={colorVariant.active}
                            updateVariant={colorVariant.update}
                        >
                            Kolor
                        </ProductVariant>

                        <ProductVariant
                            variant={sizeVariant.variant}
                            activeVariantId={sizeVariant.active}
                            updateVariant={sizeVariant.update}
                        >
                            Rozmiar
                        </ProductVariant>

                        <ProductVariant
                            variant={sizeColorVariant.variant}
                            activeVariantId={sizeColorVariant.active}
                            updateVariant={sizeColorVariant.update}
                        >
                            Rozmiar/Kolor
                        </ProductVariant>

                        <div>{colorVariant.active}</div>
                        <div>{sizeVariant.active}</div>
                        <div>{sizeColorVariant.active}</div>

                        <button
                            onClick={() =>
                                cartState.addItemToCart({
                                    productId: data.id,
                                    price: data.price,
                                    title: data.title,
                                    quantity: 1,
                                    imgUrl: data.thumbnailUrl,
                                    slug: data.slug,
                                    variants: variants,
                                })
                            }
                            className="btn-custom-primary"
                        >
                            Dodaj do kosza
                        </button>

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
