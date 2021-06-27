import { ApolloClient, InMemoryCache } from '@apollo/client'
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL
});

const wsLink = typeof window !== 'undefined' &&  new WebSocketLink({
  uri: process.env.GRAPHQL_WEBSOCKET_URL,
  options: {
    reconnect: true
  }
});

const splitLink = typeof window !== 'undefined' && split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
export default client;