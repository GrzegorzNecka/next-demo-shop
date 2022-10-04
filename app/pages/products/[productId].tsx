import { InferGetStaticPropsType } from "next";
import { InferGetStaticPathsType } from "types/types";
import { apolloClient } from "graphQL/apolloClient";
import { GetProductsListDocument, GetProductsListQuery } from "graphQL/generated/graphql";
import { Main } from "components/Main";
import ProductList from "components/Products/ProductList/ProductList";

export type ProductListIdPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProductListIdPage = ({ data }: ProductListIdPageProps) => {
    return (
        <Main>
            <div className="relative p-16">
                <ProductList data={data} />
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
