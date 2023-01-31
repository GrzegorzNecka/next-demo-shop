import Image from 'next/image';
import { NextSeo } from 'next-seo';
import type { ProductDetailsProps } from '../../types/components/types';
import ProductOption from 'components/products/product-options';

import Markdown from 'components/markdown';
import { useState } from 'react';
import { ButtonAddToCart as ButtonAddToCart } from './button-add-to-cart';

export const ProductSingleUI = ({ data }: ProductDetailsProps) => {
    const isProductOpiotns = data?.option.length > 1 ? true : false;
    const [activeProductOptionId, setActiveProductOptionId] = useState<string>(data.option?.[0].id);
    console.log(
        '🚀 ~ file: product-single-ui.tsx:13 ~ ProductSingleUI ~ activeProductOptionId',
        activeProductOptionId,
    );

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
                            // objectFit="contain"
                            // objectPosition="center"
                        />
                    </div>

                    <div className="">
                        <div className="flex justify-between pb-8">
                            <h2 className="font-bold text-xl ">{data.title}</h2>
                            <span className=" font-medium text-xl justify-self-end">
                                {data.priceWithCurrency}
                            </span>
                            {/* <ProductArithmeticRating productSlug={data.slug} /> */}
                        </div>

                        {isProductOpiotns && (
                            <ProductOption
                                activeOptionId={activeProductOptionId}
                                updateOptionId={setActiveProductOptionId}
                                option={data.option}>
                                warianty
                            </ProductOption>
                        )}

                        <ButtonAddToCart data={data} activeOptionId={activeProductOptionId} />

                        <article className="">
                            {<Markdown>{data.longDescription}</Markdown>}
                        </article>
                    </div>
                </div>
                <hr />
                <div className="w-3/4 my-16 mx-auto">
                    {/* <ProductReviewContainer productSlug={data.slug} /> */}
                </div>
            </div>
        </>
    );
};

//todo seo memo

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
                            type: 'image/jpeg',
                        },
                    ],
                    site_name: 'naszsklep',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
        </>
    );
};
