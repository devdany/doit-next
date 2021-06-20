import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'theme';
import Header from 'components/header';
import MetaMaskIcon from 'assets/images/metamask.png';
import External from 'assets/icons/external.svg';
import Dropdown, { Option } from 'react-dropdown';
import SwapHistory from 'components/swapHistory';
import { History } from 'components/swapHistory/row'
import { makeShortAddress } from 'utils/stringUtil';

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

const AssetsSample = [
  {
    label: 'BDOIT',
    value: 'BDOIT',
  },
  {
    label: 'BABCD',
    value: 'BABCD'
  }
]

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

const sampleHistory: History[] = [
  {
    id: 1,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'success',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  },
  {
    id: 2,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'fail',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  },
  {
    id: 3,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'pending',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  },{
    id: 4,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'success',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  },
  {
    id: 5,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'success',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  },
  {
    id: 6,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'success',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  },
  {
    id: 7,
    from: 'DOIT',
    to: 'BDOIT',
    status: 'success',
    date: '2021-11-11',
    transaction: '0x97d71257fa79947d1c9c0b48afc39a6db3beeb07eeb5a4d537f622b3022e4c74',
    amount: 3500
  }
]

export default function Dashboard() {
  const [asset, setAsset] = useState<Option>(AssetsSample[0]);

  const handleChange = (value: Option) => {
    setAsset(value)
  }
  return (
    <Container>
      <Header />
      <Body>
        <WalletInfoBox>
          <WalletInfo>
            <Icon src={MetaMaskIcon} />
            <WalletAddressText>{makeShortAddress('0x45c49d7be5f14a4cdde91a8e8b1f70cd5fcdf177')}</WalletAddressText>
          </WalletInfo>
        </WalletInfoBox>
        <Label>
          {asset.value} Balance
        </Label>
        <BinanceBalanceBox>
          <AssetBox>
            <Dropdown options={AssetsSample} value={asset} onChange={handleChange} />
          </AssetBox>
          <BalanceText>650,000</BalanceText>
        </BinanceBalanceBox>
        <Divider />
        <HistoryTitleBox>
          <Label>Swap History</Label>
          <AdditionalText>
            <Icon style={{ marginRight: '4px' }} src={External} />
            View on BscScan
          </AdditionalText>
        </HistoryTitleBox>
        <SwapHistory histories={sampleHistory} />
      </Body>
    </Container>
  )
}