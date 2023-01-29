import { Main } from 'components/main';
import { ProductSingleUI } from 'components/products/product-single-ui';
import { apolloClient } from 'graphQL/apolloClient';
import type {
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables,
    GetProductsSlugsQuery,
} from 'graphQL/generated/graphql';
import { GetProductBySlugDocument, GetProductsSlugsDocument } from 'graphQL/generated/graphql';

import type { InferGetStaticPropsType } from 'next';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import type { InferGetStaticPathsType } from 'types/types';
import { changeToCurrency, moveTheComa } from 'utils/currency';

type ProductSingleSlugPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductSingleSlugPage = ({ product }: ProductSingleSlugPageProps) => {
    if (!product) {
        return <div>coś poszło nie tak</div>;
    }

    return (
        <Main>
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
            fallback: 'blocking',
        } satisfies GetStaticPathsResult;
    }

    return {
        paths: data.products.map((product) => {
            return {
                params: {
                    slug: product.slug,
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: InferGetStaticPathsType<typeof getStaticPaths>) => {
    if (!params?.slug) {
        return { props: {}, notFound: true };
    }

    const { data } = await apolloClient.query<
        GetProductBySlugQuery,
        GetProductBySlugQueryVariables
    >({
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

    const product = { ...data.product, longDescription: await serialize(markdown) };

    return {
        props: {
            product,
        },
        revalidate: 10,
    } satisfies GetStaticPropsResult<{ product: typeof product }>;
};
