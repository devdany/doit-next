import React from 'react';
import { MetaMaskProvider } from 'metamask-react';

export type GlobalProviderProps = {
  children: React.ReactNode;
};

export default function GlobalProvider(props: GlobalProviderProps) {
  const { children } = props;
  return (
    <MetaMaskProvider>
      {children}
    </MetaMaskProvider>
  );
}
