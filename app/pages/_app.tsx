import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components/Layout/Layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "graphQL/apolloClient";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    return (
        <>
            <ApolloProvider client={apolloClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
