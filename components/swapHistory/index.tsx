import React from 'react';
import styled from 'styled-components';
import SwapHistoryRow, { History } from './row';
 
type Props = {
  histories: History[]
}

const Container = styled.div`
  overflow-y: auto;
  flex: 0 0 358px;
`;

export default function SwapHistory({ histories }: Props) {
  return (
    <Container>
      {histories.map((history) => <SwapHistoryRow key={`history-${history.id}`} history={history} />)}
    </Container>
  );
}