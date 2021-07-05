import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import RightArrowIcon from 'assets/icons/rightArrow.svg';
import EthIcon from 'assets/icons/ethereum.svg';
import BinIcon from 'assets/icons/binance.svg';
import Button from 'components/button';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import theme from 'theme';
import { Token, UserWallet } from 'types/graphql'
import { HashLoader } from 'react-spinners';
import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationRegisterBrunTransactionCheckerArgs } from 'types/graphql'
import Web3 from 'web3';
import bigint from 'big-integer';
import { useRouter } from 'next/router'

const Container = styled.div`
  display: flex;
  flex: 0 0 540px;
  margin-left: 12px;
  overflow-y: auto;
  height: 780px;
  
  background-color: #ffffff;
  padding-left: 48px;
  padding-right: 48px;
  border-radius: 12px;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 36px;

  @media (max-width: 1024px) {
    flex: 0 0 340px;
    margin-left: 0px;
    margin-top: 24px;
    padding-left: 24px;
    padding-right: 24px;
    height: auto;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex: 0 0 540px;
  height: 780px;
  background-color: #ffffff;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;

  @media (max-width: 1024px) {
    flex: 0 0 340px;
    margin-left: 0px;
    margin-top: 24px;
    height: 540;
  }
`;

const Lable = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
`;

const SwapContentLable = styled.div`
  font-size: 18px;
  font-weight: 500;
  width: 100%;
`;

const SwapContentContainer = styled.div`
  width: 100%;
  flex: 0 0 120px;
  margin-top: 18px;
  display: flex;
`;

const SwapContentBox = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 12px;
  border: 1px solid lightgray;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

const ContentGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinIcon = styled.img`
  width: 24px;
  height: 24px;
  flex: 0 0 24px
`;

const ContentText = styled.div`
  margin-left: 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  flex: 0 0 110px;

  @media (max-width: 1024px) {
    flex: 1;
  }
`;


const SwapContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SwapArrow = styled.div`
  flex: 0 0 24px;
  display: flex;
  height: 120px;
  margin-left: 8px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  padding-top: 46px;
`;

const Icon = styled.img`
  width: 24px;
  flex: 0 0 24px;
  height: auto;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  border-radius: 8px;
  flex: 0 0 48px;
  padding-left: 12px;
  border: 1px solid lightgray;
`;

const AdditionalText = styled.div`
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  width: 100%;
`;

const TotalBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 12px;
  width: 100%;
`;

const TotalLable = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
`;


const TotalText = styled.div`
  margin-top: 12px;
  font-size: 24px;
  font-weight: 600;
`

const ButtonBox = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  userWallet?: UserWallet
  metamaskStatus: 'initializing' | 'unavailable' | 'notConnected' | 'connected' | 'connecting'
  balance: number
  tokens?: Token[]
  tokenLoading: boolean
  connect: () => void
  selectToken: (token: Token) => void
  updateBalance: () => void
}

const tokensToOptions = (tokens: Token[]): Option[] => tokens.map((token) => ({ label: token.name, value: token.name }))

const REGISTER_BURN_TRANSACTION_CHECKER = gql`
  mutation registerBrunTransactionChecker($tokenAddress: String!, $userWalletAddress: String!, $mintTokenAddress: String!, $transactionId: String!) {
    registerBrunTransactionChecker(tokenAddress: $tokenAddress, userWalletAddress: $userWalletAddress, mintTokenAddress: $mintTokenAddress, transactionId: $transactionId)
  }
`;

export default function SwapBox({ balance, connect, tokenLoading, tokens, metamaskStatus, selectToken, userWallet, updateBalance }: Props) {
  if (!tokens) {
    return (
      <SpinnerContainer>
        <HashLoader color={theme.color.sub} />
      </SpinnerContainer>
    )
  }
  const [swapAmount, setSwapAmount] = useState(0);
  const tokenOptions = tokensToOptions(tokens);
  const [asset, setAsset] = useState<Option>({ label: '', value: '' });
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [regiterBurnTransactionChecker] = useMutation<Mutation, MutationRegisterBrunTransactionCheckerArgs>(REGISTER_BURN_TRANSACTION_CHECKER)
  const router = useRouter();

  useEffect(() => {
    if (tokens.length > 0) {
      const firstToken = tokens[0];
      setAsset({
        label: firstToken.name,
        value: firstToken.name
      })
      selectToken(firstToken)

      setSelectedToken(firstToken);
    }
  }, [tokens])

  const handleChangeSwapAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const castedValue= Number(e.target.value)
    if (inputValue.match(/^\d+$/) && castedValue <= balance) {
      setSwapAmount(castedValue);
    }

    if (inputValue.length === 0) {
      setSwapAmount(0);
    }
  }

  const handleChangeAsset = (value: Option) => {
    setAsset(value);
    const token = tokens.find((token) => token.name === value.value)
    setSelectedToken(token)
    selectToken(token)
  }

  let buttonStatus: 'active' | 'inactive' | 'loading' = 'active'

  if (metamaskStatus === 'initializing' || metamaskStatus === 'connecting') {
    buttonStatus = 'loading'
  } else if (metamaskStatus === 'unavailable') {
    buttonStatus = 'inactive'
  }

  const isPossibleSwap = () => selectedToken && selectedToken.swapables && selectedToken.swapables.length > 0 && metamaskStatus === 'connected' && userWallet ? true: false
  const handleClickSwap = async () => {
    if (isPossibleSwap()) {
      // TODO: burnging transaction send
      if (typeof window !== 'undefined') {
        const anyWindow = window as any
        const web3 = new Web3(anyWindow.web3.currentProvider);
        const tokenInstance = new web3.eth.Contract(JSON.parse(selectedToken.abi as any), selectedToken.address);
        const decimalAmount = bigint(10).pow(selectedToken.decimal).multiply(swapAmount).toString()

        tokenInstance.methods.burn(decimalAmount).send({ from: userWallet.address })
          .on('transactionHash', (hash: string) => {
            // 보낸거
            regiterBurnTransactionChecker({
              variables: {
                tokenAddress: selectedToken.address,
                userWalletAddress: userWallet.address,
                mintTokenAddress: selectedToken.swapables[0].address,
                transactionId: hash
              }
            })
              .then((result) => {
                if (result.data?.registerBrunTransactionChecker) {
                  router.push('/dashboard/history');
                } else {
                  alert('Fail swap request. please contact to us.')
                }
              })
          })
          .on('receipt', () => {
            updateBalance();
          })
      }
    }
  }

  return (
    tokenLoading ? (
      <SpinnerContainer>
        <HashLoader color={theme.color.sub} />
      </SpinnerContainer>
    ) : (
      <Container>
        <Lable>Asset</Lable>
        <Dropdown options={tokenOptions} onChange={handleChangeAsset} value={asset}/>
        <SwapContentContainer>
          <SwapContent>
            <SwapContentLable>From</SwapContentLable>
            <SwapContentBox>
              <ContentGroup>
                <CoinIcon src={EthIcon} />
                <ContentText>{selectedToken?.network} Network</ContentText>
              </ContentGroup>
            </SwapContentBox>
          </SwapContent>
          <SwapArrow>
            <Icon src={RightArrowIcon} />
          </SwapArrow>
          <SwapContent>
            <SwapContentLable>To</SwapContentLable>
            <SwapContentBox>
              <ContentGroup>
                <CoinIcon src={BinIcon} />
                <ContentText>{selectedToken?.swapables[0].network} Network</ContentText>
              </ContentGroup>
            </SwapContentBox>
          </SwapContent>
        </SwapContentContainer>
        <Lable>{selectedToken?.name} Balance</Lable>
        {metamaskStatus === 'connected' ? (
          <Input style={{ backgroundColor: '#fafafa' }} disabled value={`${balance.toLocaleString()} ${asset.value}`} />
        ) : (
            <Button
              activeStatus={buttonStatus}
              inactiveMessage='Please setup the metamask!'
              style={{width: '180px', flex: '0 0 42px', backgroundColor: theme.color.sub}}
              onClick={() => connect()}>
                Connect Wallet
              </Button>
        )}
        
        <Lable>Swap Amount</Lable>
        <Input value={swapAmount} onChange={handleChangeSwapAmount}/>
        <AdditionalText>Estimated fee {(swapAmount / 10).toLocaleString()} {selectedToken?.name}</AdditionalText>
        <TotalBox>
          <TotalLable>Total Received</TotalLable>
          <TotalText>{(swapAmount - (swapAmount / 10)).toLocaleString()} {selectedToken?.swapables[0].name}</TotalText>
        </TotalBox>
        <ButtonBox>
          <Button activeStatus={isPossibleSwap() ? 'active' : 'inactive'} onClick={handleClickSwap} style={{ flex: '0 0 120px' }}>Swap</Button>
        </ButtonBox>
      </Container>
    )
    
  )
}