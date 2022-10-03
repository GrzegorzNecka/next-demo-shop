// import { ProductListItem } from "components/ProductListItem";
import { GetStaticPathsResult, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { InferGetStaticPathsType } from "types/types";
import { Main } from "components/Main";
// import { changeToCurrency, moveTheComa } from "utils/currency";
import { useState } from "react";
import { apolloClient } from "graphQL/apolloClient";
import { GetProductsListDocument, GetProductsListQuery } from "graphQL/generated/graphql";
import ProductList from "components/Products/ProductList/ProductList";
import { changeToCurrency, moveTheComa } from "utils/currency";
import { ProductListItem } from "components/Products/ProductList/ProductListItem";

type ProductListIdPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductListIdPage = ({ data }: ProductListIdPageProps) => {
    if (!data) {
        return <div>nie znaleziono strony</div>;
    }

    return (
        <Main>
            <div className="relative p-16">
                <ProductList>
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
                            />
                        </li>
                    ))}
                </ProductList>
            </div>
        </Main>
    );
};

export default ProductListIdPage;

// -----------------

export const getStaticPaths = async () => {
    const products = [1, 2];

    return {
        fallback: "blocking",
        paths: products.map((id) => {
            return {
                params: {
                    productId: `${id}`,
                },
            };
        }),
    };
};

// -----------------

export const getStaticProps = async ({ params }: InferGetStaticPathsType<typeof getStaticPaths>) => {
    if (!params?.productId) {
        return { props: {}, notFound: true };
    }

    const {
        data: { products },
    } = await apolloClient.query<GetProductsListQuery>({
        query: GetProductsListDocument,
    });

    return {
        props: {
            data: products,
        },
    };
};
