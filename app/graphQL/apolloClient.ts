import { ApolloClient, InMemoryCache } from "@apollo/client";

// https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
// https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects

const cache = new InMemoryCache({
    // typePolicies: {
    //     Cart: {
    //         fields: {
    //             cartItems: {
    //                 // Non-normalized Author object within Book
    //                 merge(existing, incoming, { mergeObjects }) {
    //                     if (!incoming || existing) {
    //                         return;
    //                     }
    //                     console.log("🚀 ~ file: apolloClient.ts:10 ~ merge ~ incoming", incoming);
    //                     console.log("🚀 ~ file: apolloClient.ts:10 ~ merge ~ existing", existing);
    //                     return mergeObjects(existing, incoming);
    //                 },
    //             },
    //         },
    //     },
    // },
});

const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API,
    cache,
});

const authApolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API,
    cache,
    headers: {
        Authorization: `Bearer ${process.env.HYGRAPH_TOKEN_AUTH}`,
    },
});

export { apolloClient, authApolloClient };
