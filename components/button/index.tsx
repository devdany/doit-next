import React from 'react'
import styled from 'styled-components';
import theme from 'theme';
import { BeatLoader } from 'react-spinners'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: (e: any) => void
  activeStatus?: 'active' | 'inactive' | 'loading'
  inactiveMessage?: string
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

export default function Button({ children, onClick, style, activeStatus = 'active', inactiveMessage = 'This button is inactive!' }: Props) {
  const handleClick = (e: any) => {
    if (activeStatus === 'active' && onClick) {
      onClick(e)
    } else if (activeStatus === 'inactive') {
      alert(inactiveMessage)
    }
  }

  const handledStyle = {
    ...style
  }

  if (activeStatus === 'inactive') {
    handledStyle.backgroundColor = '#ddd'
    handledStyle.cursor = 'not-allowed'
  }
  return (
    <Container style={handledStyle} onClick={handleClick}>
      {activeStatus === 'loading' ? (
        <BeatLoader color='#ffffff' />
      ) : (
        children
      )}
    </Container>
  )
}