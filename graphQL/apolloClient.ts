import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'https://api-eu-central-1.hygraph.com/v2/cl5s794280vvm01tbegxz5w9c/master';

const cache = new InMemoryCache({
  // typePolicies: {
  //     Cart: {
  //         fields: {
  //             cartItems: {
  //                 merge(existing = [], incoming: unknown[]) {
  //                     return [...existing, ...incoming];
  //                 },
  //             },
  //         },
  //     },
  // },
});

const apolloClient = new ApolloClient({
  uri,
  cache,
  name: 'hygraph-client',
  connectToDevTools: true,
});

const authApolloClient = new ApolloClient({
  uri,
  cache,
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN_AUTH}`,
  },
  ssrMode: typeof window === 'undefined',
  name: 'hygraph-auth-client',
  // connectToDevTools: true,
});

export { apolloClient, authApolloClient };
