import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  flex: 0 0 72px;
  display: flex;
  padding-left: 24px;
  align-items: center;
`;

const LogoBox = styled.div`
  flex: 0 0 240px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  font-weight: bold;
`;


export default function Header() {
  return (
    <Container>
      <LogoBox>
        DOIT SWAP
      </LogoBox>
    </Container>
  )
}