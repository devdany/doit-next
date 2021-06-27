import React from 'react';
import styled from 'styled-components';
import { SwapHistory as SwapHistoryType } from 'types/graphql'
import SwapHistoryRow from './row';
import { HashLoader } from 'react-spinners'
import theme from 'theme'

type Props = {
  histories: SwapHistoryType[]
  loading?: boolean
}

const Container = styled.div`
  overflow-y: auto;
  flex: 0 0 358px;
`;

const LoadingContainer = styled.div`
  flex: 0 0 358px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SwapHistory({ histories, loading }: Props) {
  return (
    loading ? (
      <LoadingContainer>
        <HashLoader color={theme.color.sub} />
      </LoadingContainer>
    ) : (
      <Container>
        {histories.map((history) => <SwapHistoryRow key={`history-${history.id}`} history={history} />)}
      </Container>
    )
  );
}