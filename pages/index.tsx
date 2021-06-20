import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/header';
import Button from 'components/button';
import MetamaskConnector from 'components/metamaskConnector';
import theme from 'theme';

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

export default function Index() {
  const [isOpenMetaMaskConnector, setOpenMetaMaskConnector] = useState(false);
  return (
    <Container>
      <Header />
      <Body>
        {isOpenMetaMaskConnector ? (
          <MetamaskConnector close={() => setOpenMetaMaskConnector(false)}/>
        ): (
          <>
            <Notice>
            Check volume swapped to Binance and transaction history
            </Notice>
            <Button
              style={{
                width: '240px',
                flex: '0 0 48px'
              }}
              onClick={() => setOpenMetaMaskConnector(!isOpenMetaMaskConnector)}
            >
              Connect Wallet
            </Button>
          </>
        )}
      </Body>
    </Container>
  );
}
