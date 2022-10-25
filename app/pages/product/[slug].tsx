import { Main } from "components/Main";
import { ProductSingleUI } from "components/Products/product-single-ui";
import { apolloClient } from "graphQL/apolloClient";
import {
    GetProductBySlugDocument,
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables,
    GetProductsSlugsDocument,
    GetProductsSlugsQuery,
} from "graphQL/generated/graphql";

import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import type { InferGetStaticPathsType } from "types/types";
import { changeToCurrency, moveTheComa } from "utils/currency";

const ProductSingleSlugPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!product) {
        return <div>coś poszło nie tak</div>;
    }

    return (
        <Main>
            {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

            <ProductSingleUI
                data={{
                    id: product.id,
                    title: product.name,
                    description: product.description,
                    thumbnailUrl: product.images[0].url,
                    thumbnailAlt: product.name,
                    slug: product.slug,
                    option: product.option,
                    // rating: product.rating.rate,
                    longDescription: product.longDescription,
                    price: product.price,
                    priceWithCurrency: changeToCurrency(moveTheComa(product.price)),
                }}
            />
        </Main>
    );
};

export default ProductSingleSlugPage;

export const getStaticPaths = async () => {
    const { data } = await apolloClient.query<GetProductsSlugsQuery>({
        query: GetProductsSlugsDocument,
    });

    if (!data) {
        return {
            paths: [],
            fallback: "blocking",
        };
    }

    return {
        paths: data.products.map((product) => {
            return {
                params: {
                    slug: product.slug,
                },
            };
        }),
        fallback: "blocking",
    };
};

export const getStaticProps = async ({ params }: InferGetStaticPathsType<typeof getStaticPaths>) => {
    if (!params?.slug) {
        return { props: {}, notFound: true };
    }

    const { data } = await apolloClient.query<GetProductBySlugQuery, GetProductBySlugQueryVariables>({
        variables: {
            slug: params.slug,
        },
        query: GetProductBySlugDocument,
    });

    if (!data.product) {
        return {
            props: {},
            notFound: true,
        };
    }

    const markdown: string = data.product.description;

    return {
        props: {
            product: { ...data.product, longDescription: await serialize(markdown) },
        },
        revalidate: 10,
    };
};
