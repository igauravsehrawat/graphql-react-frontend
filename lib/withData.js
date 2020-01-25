import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    // ? true: false, i know
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    resolvers: {
      Mutation: {
        toggleCart(_root, variables, { cache }) {
          const { data } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          });
          console.log('data', data);
          cache.writeData({
            data: {
              cartOpen: true,
            }
          });
        }
      },
    },
    defaults: {
      cartOpen: true,
    }
  });
}

export default withApollo(createClient);
