// import { ProductListItem } from "components/ProductListItem";
import { GetStaticPathsResult, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { InferGetStaticPathsType } from "types/types";
import { Main } from "components/Main";
// import { changeToCurrency, moveTheComa } from "utils/currency";
import { useState } from "react";
import { apolloClient } from "graphQL/apolloClient";
import { GetProductsListDocument, GetProductsListQuery } from "graphQL/generated/graphql";

const ProductListIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    // const [targetButton, setTargetButton] = useState<string | null>(null);

    if (!data) {
        return <div>nie znaleziono strony</div>;
    }

    return (
        <Main>
            <div className="relative p-16">
                <ul className="relative  bg-white w-full mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
                    {data.map((product) => (
                        <li key={product.slug} className={`className="group relative" ${product.slug}`}>
                            <p>nazwa: {product.name}</p>
                            <p>cena:{product.price}</p>
                        </li>
                    ))}
                </ul>
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
