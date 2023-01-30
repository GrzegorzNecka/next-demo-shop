import type { InferGetStaticPropsType } from 'next';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import type { InferGetStaticPathsType } from 'types/types';
import { apolloClient } from 'graphQL/apolloClient';
import type { GetProductsListQuery } from 'graphQL/generated/graphql';
import { GetProductsListDocument } from 'graphQL/generated/graphql';
import { Main } from 'components/main';
import ProductListUI from 'components/products/products-list-ui';

export type ProductListIdPageProps = InferGetStaticPropsType<typeof getStaticProps>;

// page

const ProductsListIdPage = ({ data }: ProductListIdPageProps) => {
    return (
        <Main>
            <div className="relative p-16">
                <ProductListUI data={data} />
            </div>
        </Main>
    );
};

export default ProductsListIdPage;

// paths

export const getStaticPaths = async () => {
    const products = [1, 2];

    return {
        fallback: 'blocking',
        paths: products.map((id) => {
            return {
                params: {
                    id: `${id}`,
                },
            };
        }),
    } satisfies GetStaticPathsResult;
};

// prosp

export const getStaticProps = async ({
    params,
}: InferGetStaticPathsType<typeof getStaticPaths>) => {
    if (!params?.id) {
        return { props: {}, notFound: true };
    }

    const {
        data: { products },
    } = await apolloClient.query<GetProductsListQuery>({
        query: GetProductsListDocument,
        fetchPolicy: 'no-cache',
    });

    return {
        props: {
            data: products.map((product) => product),
        },
        revalidate: 10,
    } satisfies GetStaticPropsResult<{ data: typeof products }>;
};
