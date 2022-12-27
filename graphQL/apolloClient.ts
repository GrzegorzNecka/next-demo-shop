import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = 'https://api-eu-central-1.hygraph.com/v2/cl5s794280vvm01tbegxz5w9c/master';

type Item = { __ref: string };
type CartItems = Item[];

const cache = new InMemoryCache({
  typePolicies: {
    Cart: {
      fields: {
        cartItems: {
          merge(existing: CartItems = [], incoming: CartItems) {
            console.log('🚀 existing', existing, '🚀 incoming', incoming);

            if (!existing.length) {
              console.log('return "incoming", because "existing" is empty');
              return [...incoming];
            }

            const merge: CartItems = [];

            existing.forEach((item) => {
              const duplicate = incoming.find((i) => i.__ref === item.__ref);

              if (!duplicate) {
                console.log('if dont exist duplicate push "existing" item');
                merge.push(item);
                return;
              }
              console.log('if  exist duplicate push "incoming" item');
              merge.push(duplicate);
            });
            console.log('return merged array');
            return [...merge];
          },
        },
      },
    },
  },
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
