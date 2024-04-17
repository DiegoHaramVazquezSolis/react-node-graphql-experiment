import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4020/graphql',
  cache: new InMemoryCache(),
});

const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export {
  ApolloWrapper
};