import React from 'react'
import styled from 'styled-components'

const Container: React.FC = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

const StyledContainer = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1170px;

  @media ${({ theme }) => theme.devices.mobileLgUp} {
    max-width: 1200px;
    padding: 0 30px;
  }
`

export default Container
