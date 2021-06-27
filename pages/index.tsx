import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'theme';
import SwapIntro from 'components/swapIntro';
import SwapBox from 'components/swapBox';
import { useMetaMask } from 'metamask-react';
import { useQuery,  gql } from '@apollo/client'
import { Query, QueryTokenBalanceArgs, Token } from 'types/graphql'
import { useWallet } from '../contexts/wallet'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.color.main};
  overflow-y: auto;
`;

const LayoutBox = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SWAPPABLE_TOKENS = gql`
  query {
    swapableTokens {
      id
      name
      address
      abi
      decimal
      network
      swapables {
        id
        name
        address
        network
      }
    }
  }
`;

const TOKEN_BALANCE = gql`
  query tokenBalance($tokenId: Float!, $address: String!) {
    tokenBalance(tokenId: $tokenId, address: $address) {
      userWallet {
        address
      }
      token {
        id
        name
        address
        abi
        decimal
        network
      }
      balance
    }
  }
`;

export default function Swap() {
  if (typeof window === 'undefined') {
    return <></>
  }

  const { status, account, connect } = useMetaMask();
  const [ selectedToken, setSelectedToken ] = useState<Token | null>(null)

  const { data, loading } = useQuery<Query>(SWAPPABLE_TOKENS)

  const { connectedWallet } = useWallet()
  
  const tokenBalanceResult = useQuery<Query, QueryTokenBalanceArgs>(TOKEN_BALANCE, {
    skip: status !== 'connected' || connectedWallet?.address !== account || selectedToken === null,
    variables: {
      tokenId: selectedToken?.id,
      address: connectedWallet?.address
    }
  })

  return (
    <Container>
      <LayoutBox>
        <SwapIntro />
        <SwapBox
          userWallet={connectedWallet}
          tokens={data ? data.swapableTokens : []}
          tokenLoading={loading}
          balance={tokenBalanceResult?.data ? tokenBalanceResult?.data.tokenBalance.balance : 0}
          connect={() => connect()}
          metamaskStatus={status}
          selectToken={(token) => setSelectedToken(token)}
        />
      </LayoutBox>
    </Container>
  )
}