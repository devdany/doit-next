import React, { useState } from 'react'
import styled from 'styled-components';
import RightArrowIcon from 'assets/icons/rightArrow.svg';
import EthIcon from 'assets/icons/ethereum.svg';
import BinIcon from 'assets/icons/binance.svg';
import Button from 'components/button';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import theme from 'theme';

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
  justify-content: center;
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

const AssetsSample = [
  {
    label: 'DOIT',
    value: 'DOIT',
  },
  {
    label: 'ABCD',
    value: 'ABCD'
  }
]

type Props = {
  isConnected: boolean
  balance: number
  connect: () => void
}

export default function SwapBox({ isConnected, balance, connect }: Props) {
  const [swapAmount, setSwapAmount] = useState(0);
  const [asset, setAsset] = useState<Option>(AssetsSample[0]);

  const handleChangeSwapAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.match(/^\d+$/)) {
      setSwapAmount(Number(e.target.value));
    }

    if (inputValue.length === 0) {
      setSwapAmount(0);
    }
  }

  const handleChangeAsset = (value: Option) => {
    setAsset(value);
  }
  return (
    <Container>
      <Lable>Asset</Lable>
      <Dropdown options={AssetsSample} onChange={handleChangeAsset} value={asset}/>
      <SwapContentContainer>
        <SwapContent>
          <SwapContentLable>From</SwapContentLable>
          <SwapContentBox>
            <ContentGroup>
              <CoinIcon src={EthIcon} />
              <ContentText>Ethereum Network</ContentText>
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
              <ContentText>Binance Smart Chain Network</ContentText>
            </ContentGroup>
          </SwapContentBox>
        </SwapContent>
      </SwapContentContainer>
      <Lable>{asset.value} Balance</Lable>
      {isConnected ? (
        <Input style={{ backgroundColor: '#fafafa' }} disabled value={`${balance} ${asset.value}`} />
      ) : (
          <Button style={{width: '180px', flex: '0 0 42px', backgroundColor: theme.color.sub}} onClick={() => connect()}>Connect Wallet</Button>
      )}
      
      <Lable>Swap Amount</Lable>
      <Input value={swapAmount} onChange={handleChangeSwapAmount}/>
      <AdditionalText>Estimated fee {(swapAmount / 10)} DOIT</AdditionalText>
      <TotalBox>
        <TotalLable>Total Received</TotalLable>
        <TotalText>{swapAmount - (swapAmount / 10)} BDOIT</TotalText>
      </TotalBox>
      <ButtonBox>
        <Button style={{ flex: '0 0 120px' }}>Swap</Button>
      </ButtonBox>
    </Container>
  )
}