import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import MetaMaskIcon from 'assets/images/metamask.png';
import CloseIcon from 'assets/icons/close.svg';
import Button from 'components/button';
import { useRouter } from 'next/router'

const Container = styled.div`
  min-width: 360px;
  width: 60%;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  min-width: 340px;
  width: 90%;
  flex: 0 0 36x;
  border-bottom: 2px solid lightgray;
`;

const MetamaskBox = styled.div`
  display: flex;
  min-width: 330px;
  width: 85%;
  flex: 0 0 48px;
  border: 1px solid ${theme.color.sub};
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: #FCF8E6;
  margin-top: 12px;
  justify-content: space-between;
  align-items: center;;
`;

const MetamaskText = styled.span`
  color: gray;
  font-size: 14px;
  font-weight: 400;
`;

const Icon = styled.img`
  flex: 0 0 24px;
  height: 24px;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 24px;
  flex: 0 0 24px;
  height: 24px;
  right: 12px;
`;

type Props = {
  close: () => void
}

export default function MetamaskConnector({ close }: Props) {
  const router = useRouter();
  return (
    <Container>
      <Title>
        <p>Connect Wallet</p>
        <CloseButton onClick={() => close()}>
          <Icon src={CloseIcon}/>
        </CloseButton>
      </Title>
      <MetamaskBox>
        <MetamaskText>MetaMask</MetamaskText>
        <Icon src={MetaMaskIcon} />
      </MetamaskBox>
      <Button
        style={{
          marginTop: '32px',
          marginBottom: '24px',
          minWidth: '240px',
          width: '85%',
          flex: '0 0 48px',
          backgroundColor: theme.color.sub
        }}
        onClick={() => router.push('/swap') }
      >
        Connect Wallet
      </Button>
    </Container>
  )
}