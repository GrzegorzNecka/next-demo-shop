import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components/layout/layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "graphQL/apolloClient";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CartStateContextProvider } from "context/cart-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ApolloProvider client={apolloClient}>
                    <SessionProvider session={pageProps.session}>
                        <CartStateContextProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </CartStateContextProvider>
                    </SessionProvider>
                </ApolloProvider>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
