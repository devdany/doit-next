import React, { useContext, useState, useEffect } from 'react';

import { useMetaMask } from 'metamask-react';
import { useMutation, gql } from '@apollo/client'
import { Mutation, MutationConnectWalletArgs, UserWallet } from 'types/graphql'

type ContextType = {
  connectedWallet: UserWallet
  setConnectedWallet: (connectedWllet: UserWallet) => void
};

const WalletContext = React.createContext<ContextType>({
  connectedWallet: null,
  setConnectedWallet: () => {},
});

type Props = {
  children: React.ReactNode
}

const CONNECT_WALLET = gql`
  mutation connectWallet($address: String!) {
    connectWallet(address: $address) {
      id
      address
    }
  }
`;

const WalletProvider = ({ children }: Props) => {
  const [connectedWallet, setConnectedWallet] = useState<UserWallet | null>(null);
  const { status, account } = useMetaMask();
  const [connectWallet] = useMutation<Mutation, MutationConnectWalletArgs>(CONNECT_WALLET)

  useEffect(() => {
    if (status === 'connected') {
      connectWallet({
        variables: {
          address: account
        }
      })
        .then((result) => {
          const wallet = result.data?.connectWallet
          if (wallet) {
            setConnectedWallet(wallet)
          }
        })
    }
  }, [status])

  return (
    <WalletContext.Provider
      value={{
        connectedWallet, setConnectedWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = (): { connectedWallet: UserWallet, setConnectedWallet: (wallet: UserWallet) => void } => {
  const { connectedWallet, setConnectedWallet } = useContext(WalletContext);
  return { connectedWallet, setConnectedWallet };
};

export { WalletProvider, useWallet };

