import React from 'react';
import styled from 'styled-components';
import CoinPeople from 'assets/images/coinPeople.png';
import theme from 'theme'
import { useRouter } from 'next/router'

const IntroBox = styled.div`
  display: flex;
  flex: 0 0 340px;
  background-color: #ffffff;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 12px;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 12px;
`;

const IntroTitle = styled.div`
  color: ${theme.color.sub};
  font-size: 24px;
  font-weight: 500;
`;

const IntroContent = styled.div`
  font-size: 18px;
  margin-top: 24px;
`;

const LinkText = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-top: 12px;
  color: ${theme.color.primary};
`;

const ConinPeopleImage = styled.img`
  align-items: center;
  flex: 0 0 180px;
  width: 180px;
  height: auto;
  margin: auto;
  margin-top: 48px;

  @media (max-width: 1024px) {
    display: none;
  }
`

export default function SwapIntro() {
  const router = useRouter();
  return (
    <IntroBox>
      <IntroTitle>DOIT SWAP</IntroTitle>
      <IntroContent>
        The safe, fast and most secure way to bring Ethereum-chain assets to Binance chains.
      </IntroContent>
      <IntroContent>
        Start Convert ERC-20 to BEP-20
      </IntroContent>
      <LinkText onClick={() => router.push('/dashboard')} style={{ marginTop: '36px' }}>DashBoard</LinkText>
      <LinkText>UserGuide</LinkText>
      <ConinPeopleImage src={CoinPeople} />
    </IntroBox>
  )
}