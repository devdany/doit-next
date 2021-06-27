import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from 'components/header';
import Button from 'components/button';
import theme from 'theme';
import { useMetaMask } from 'metamask-react';
import { useRouter } from 'next/router'
import { useWallet } from 'contexts/wallet'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background-color: ${theme.color.main};
`;

const Body = styled.div`
  width: 100%;
  flex: 0 0 calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 48px;
`;

const Notice = styled.div`
  width: 320px;
  height: 72px;
  font-size: 18px;
  display: flex;
  text-align: center;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export default function Dashboard() {
  if (typeof window === 'undefined') {
    return <></>
  }

  const { status, connect } = useMetaMask();
  const router = useRouter();
  const { connectedWallet } = useWallet()

  useEffect(() => {
    if (connectedWallet) {
      router.push('/dashboard/history')
    }
  }, [connectedWallet])

  let buttonStatus: 'active' | 'inactive' | 'loading' = 'active'

  if (status === 'initializing' || status === 'connecting') {
    buttonStatus = 'loading'
  } else if (status === 'unavailable') {
    buttonStatus = 'inactive'
  }

  return (
    <Container>
      <Header />
      <Body>
        <Notice>
          Check volume swapped to Binance and transaction history
        </Notice>
        <Button
          inactiveMessage='Please setup the metamask!'
          activeStatus={buttonStatus}
          style={{
            width: '240px',
            flex: '0 0 48px'
          }}
          onClick={() => connect()}
        >
          Connect Wallet
        </Button>
      </Body>
    </Container>
  );
}
