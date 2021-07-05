import React, { useState } from 'react';
import styled from 'styled-components';
import MuiAccordion from '@material-ui/core/Accordion';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import RightArrow from 'assets/icons/rightArrow.svg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { capitalizeFirstLetter, makeShortAddress } from 'utils/stringUtil'
import { dateToFormatted } from 'utils/dateFormat'
import { SwapHistory, SwapResult } from 'types/graphql'

type Props = {
  history: SwapHistory
}

const Accordion = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff',
    border: 'none',
    marginBottom: -1,
    minHeight: 42,
    '&$expanded': {
      minHeight: 42,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    paddingTop: '0px',
  },
}))(MuiAccordionDetails);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  margin: 0px 4px 0px 4px;

  @media (max-width: 1024px) {
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    margin: 0px 2px 0px 2px;
  }
`;

const statusColor = {
  fail: '#FF4D4F',
  pending: '#FAAD13',
  success: '#1B90FF'
}

const StatusBadge = styled.div<{ status: 'fail' | 'pending' | 'success' }>`
  padding: 4px 10px 4px 10px;
  display: flex;
  font-size: 10px;
  line-height: 12px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  border-radius: 18px;
  color: ${(props) => statusColor[props.status]};
  border: 1px solid ${(props) => statusColor[props.status]};
  @media (max-width: 1024px) {
    padding: 2px 4px 2px 4px;
    font-size: 8px;
    margin-left: 4px;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 12px;
`;

const DetailTitleBox = styled.div`
  flex: 0 0 180px;

  @media (max-width: 1024px) {
    flex: 0 0 140px;
  }
`;

const DetailValueBox = styled.div`
  flex: 1;
`;

const DetailTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;

  @media (max-width: 1024px) {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }
`;

const DetailValue = styled.div`
  font-size: 14px;
  line-height: 22px;

  @media (max-width: 1024px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

const DetailLinkValue = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #4C74B9;
  text-decoration: underline;
  cursor: pointer;

  @media (max-width: 1024px) {
    font-size: 12px;
    line-height: 16px;
  }
`;


export default function SwapHistoryRow({ history }: Props) {
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange = (panelId: number) => (_: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panelId : false);
  };

  let status: 'pending' | 'success' | 'fail' = 'pending'

  if (history.result === SwapResult.Success) {
    status = 'success'
  } else if (history.result === SwapResult.Fail) {
    status = 'fail'
  }

  return (
    <Accordion square expanded={expanded === history.id} onChange={handleChange(history.id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
        <Container>
          <TitleText>
            {history.from.name}
            <Icon src={RightArrow} />
            {history.to.name}
            <StatusBadge status={status}>
              {capitalizeFirstLetter(status)}
            </StatusBadge>
          </TitleText>
          <TitleText style={{ fontWeight: 400 }}>
            {`+ ${history.amount} ${typeof window !== 'undefined' && window.innerWidth > 1023 ? history.to.name : ''}`}
          </TitleText>
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <DetailContainer>
          <DetailTitleBox>
            <DetailTitle>Transaction ID</DetailTitle>
            <DetailTitle style={{ marginTop: '8px' }} >Swap Date</DetailTitle>
          </DetailTitleBox>
          <DetailValueBox>
            <DetailLinkValue onClick={() => window.open(`https://testnet.bscscan.com/tx/${history.transaction}`, '_blank')} >{makeShortAddress(history.transaction)}</DetailLinkValue>
            <DetailValue style={{ marginTop: '8px' }}>{dateToFormatted(new Date(history.createdAt))}</DetailValue>
          </DetailValueBox>
        </DetailContainer>
      </AccordionDetails>
    </Accordion>
  )
}