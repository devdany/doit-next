import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'theme';
import Header from 'components/header';
import MetaMaskIcon from 'assets/images/metamask.png';
import External from 'assets/icons/external.svg';
import Dropdown, { Option } from 'react-dropdown';
import SwapHistory from 'components/swapHistory';
import { makeShortAddress } from 'utils/stringUtil';
import { useWallet } from 'contexts/wallet';
import { useQuery, gql } from '@apollo/client';
import { Query, QuerySwapHistoriesArgs, Token, QueryTokenBalanceArgs } from 'types/graphql'
import { useMetaMask } from 'metamask-react';

import 'react-dropdown/style.css';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.color.main};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`; 

const Body = styled.div`
  display: flex;
  width: 540px;
  flex: 0 0 620px;
  margin-top: 24px;
  margin-bottom: 48px;
  
  background-color: #ffffff;
  padding-left: 48px;
  padding-right: 48px;
  border-radius: 12px;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 36px;

  @media (max-width: 1024px) {
    width: 340px;
    margin-left: 0px;
    margin-top: 24px;
    padding-left: 24px;
    padding-right: 24px;
    height: auto;
  }
`;

const WalletInfoBox = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 48px;
  justify-content: flex-end;
`;

const WalletInfo = styled.div`
  flex: 0 0 120px;
  height: 48px;
  display: flex;;
  align-items: center;
`;

const WalletAddressText = styled.div`
  font-size: 14px;
  margin-left: 8px;
`;

const Icon = styled.img`
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
`;

const BinanceBalanceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
  flex: 0 0 54px;
  margin-bottom: 24px;
`;

const AssetBox = styled.div`
  flex: 0 0 120px;
  height: 46px;
`;

const Label = styled.div`
  color: ${theme.color.sub};
  font-weight: 500;
  font-size: 18px;
`;

const BalanceText = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  width: 100%;
`;

const HistoryTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const AdditionalText = styled.div`
  font-size: 12px;
  color: ${theme.color.main};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IS_ABLE_TO_BE_SWAPED_TOKENS = gql`
  query {
    isAbleToBeSwapedTokens {
      id
      name
      address
      abi
      decimal
      network
      isAbleToBeSwapped {
        id
        name
        address
        network
      }
    }
  }
`;

const HISTORIES = gql`
  query swapHistories($userWalletId: Float!) {
    swapHistories(userWalletId: $userWalletId) {
      id
      transaction
      amount
      createdAt
      from {
        id
        name
        address
        abi
        decimal
        network
      }
      to {
        id
        name
        address
        abi
        decimal
        network
      }
      result
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

export default function HistoryPage() {
  if (typeof window === 'undefined') {
    return <></>
  }
  const [asset, setAsset] = useState<Option>({ label: '', value: '' });
  const { status, account } = useMetaMask();
  const [ selectedToken, setSelectedToken ] = useState<Token | null>(null)
  const { connectedWallet } = useWallet()
  const isAbleToBeSwapedToken = useQuery<Query>(IS_ABLE_TO_BE_SWAPED_TOKENS)
  const { data, loading } = useQuery<Query, QuerySwapHistoriesArgs>(HISTORIES, {
    variables: {
      userWalletId: connectedWallet?.id
    },
    skip: connectedWallet === null
  })

  const tokenBalanceResult = useQuery<Query, QueryTokenBalanceArgs>(TOKEN_BALANCE, {
    skip: status !== 'connected' || connectedWallet?.address !== account || selectedToken === null,
    variables: {
      tokenId: selectedToken?.id,
      address: connectedWallet?.address
    }
  })

  const tokensToOptions = (tokens: Token[]): Option[] => {
    if (!tokens) {
      return []
    }
    return tokens.map((token) => ({ label: token.name, value: token.name }))
  }

  const handleChange = (value: Option) => {
    if (isAbleToBeSwapedToken && isAbleToBeSwapedToken?.data) {
      const token = isAbleToBeSwapedToken?.data?.isAbleToBeSwapedTokens.find((token) => token.name === value.value)
      setSelectedToken(token)
      setAsset(value)
    }
  }

  useEffect(() => {
    if (isAbleToBeSwapedToken?.data) {
      const tokens = isAbleToBeSwapedToken.data.isAbleToBeSwapedTokens
      const firstToken = tokens[0];
      setAsset({
        label: firstToken.name,
        value: firstToken.name
      })
      setSelectedToken(firstToken)
    }
  }, [isAbleToBeSwapedToken])

  return (
    <Container>
      <Header />
      <Body>
        <WalletInfoBox>
          <WalletInfo>
            <Icon src={MetaMaskIcon} />
            <WalletAddressText>{makeShortAddress(connectedWallet ? connectedWallet.address : '')}</WalletAddressText>
          </WalletInfo>
        </WalletInfoBox>
        <Label>
          {asset.value} Balance
        </Label>
        <BinanceBalanceBox>
          <AssetBox>
            <Dropdown options={tokensToOptions(isAbleToBeSwapedToken?.data?.isAbleToBeSwapedTokens)} value={asset} onChange={handleChange} />
          </AssetBox>
          <BalanceText>{tokenBalanceResult?.data?.tokenBalance ? tokenBalanceResult?.data?.tokenBalance.balance.toLocaleString() : 0}</BalanceText>
        </BinanceBalanceBox>
        <Divider />
        <HistoryTitleBox>
          <Label>Swap History</Label>
          <AdditionalText>
            <Icon style={{ marginRight: '4px' }} src={External} />
            View on BscScan
          </AdditionalText>
        </HistoryTitleBox>
        <SwapHistory loading={loading} histories={data ? data.swapHistories : []} />
      </Body>
    </Container>
  )
}