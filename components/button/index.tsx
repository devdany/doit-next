import React from 'react'
import styled from 'styled-components';
import theme from 'theme';

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${theme.color.primary};
  color: white;
  padding: 8px 12px 8px 12px;
  line-height: 22px;
  font-size: 20px;
  border-radius: 8px;
`;

export default function Button({ children, onClick, style }: Props) {
  return (
    <Container style={style} onClick={onClick}>
      {children}
    </Container>
  )
}