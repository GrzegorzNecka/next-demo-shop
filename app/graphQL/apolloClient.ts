import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API,
    cache: new InMemoryCache(),
});

const authApolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.HYGRAPH_TOKEN_AUTH}`,
    },
});

export { apolloClient, authApolloClient };
