import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components/layout/layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "graphQL/apolloClient";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CartStateContextProvider } from "context/cart-context";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <>
            <ApolloProvider client={apolloClient}>
                <SessionProvider session={pageProps.session}>
                    <CartStateContextProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </CartStateContextProvider>
                </SessionProvider>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
