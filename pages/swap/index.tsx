import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
import SwapIntro from 'components/swapIntro';
import SwapBox from 'components/swapBox';

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

export default function Swap() {
  return (
    <Container>
      <LayoutBox>
        <SwapIntro />
        <SwapBox />
      </LayoutBox>
    </Container>
  )
}