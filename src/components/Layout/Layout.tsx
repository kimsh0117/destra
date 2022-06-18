/**
 * vendor
 */
import React from 'react'
import styled, { css } from 'styled-components'
/**
 * ui
 */
import Header from '../Header'
import Modal from '../Modal'

export enum MainStyle {
  MAIN = 'main',
}

interface Style {
  mainStyle: MainStyle
}

interface Props extends Style {}

const Layout: React.FC<Props> = ({ children, mainStyle }) => {
  return (
    <StyledContainer>
      <Header />
      <StyledMain mainStyle={mainStyle}>{children}</StyledMain>
      <Modal />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const StyledMain = styled.main<Style>`
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  padding-top: 108px;
  overflow-x: hidden;
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    padding-top: 138px;
  }
  ${({ mainStyle }) => {
    switch (mainStyle) {
      case MainStyle.MAIN:
        return css`
          -webkit-box-flex: 1;
          -ms-flex: 1 0 auto;
          flex: 1 0 auto;
          padding-top: 108px;
          @media ${({ theme }) => theme.devices.mobileLgUp} {
            padding-top: 138px;
          }
        `
      default:
        break
    }
  }}
`

export default Layout
