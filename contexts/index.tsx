import React from 'react';
import { MetaMaskProvider } from 'metamask-react';
import { ApolloProvider } from '@apollo/client'
import { WalletProvider } from './wallet'
import client from 'apollo'

export type GlobalProviderProps = {
  children: React.ReactNode;
};

export default function GlobalProvider(props: GlobalProviderProps) {
  const { children } = props;
  return (
    <ApolloProvider client={client}>
      <MetaMaskProvider>
        <WalletProvider>
          {children}
        </WalletProvider>
      </MetaMaskProvider>
    </ApolloProvider>
  );
}
