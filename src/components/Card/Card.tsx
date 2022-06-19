import React from 'react'
import styled from 'styled-components'

interface Style {}

interface Props extends Style {
  title: string
  category: string
}

const Card: React.VFC<Props> = ({ title, category }) => {
  return (
    <StyledCard>
      <StyledCardTitle>{title}</StyledCardTitle>
      <StyledCardText>{category}</StyledCardText>
    </StyledCard>
  )
}

export default React.memo(Card)

const StyledCard = styled.div<Style>`
  width: 100%;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.greySecondary};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  padding: 33px 22px;
  @media ${({ theme }) => theme.devices.mobileMdUp} {
    width: auto;
    -ms-flex-preferred-size: 48.5%;
    flex-basis: 48.5%;
  }
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    text-align: left;
  }
  @media ${({ theme }) => theme.devices.ipadBigUp} {
    -ms-flex-preferred-size: 31.1%;
    flex-basis: 31.5%;
  }
  @media ${({ theme }) => theme.devices.noteUp} {
    padding: 33px 34px;
  }
`

const StyledCardTitle = styled.p`
  height: 40px;
  ${({ theme }) => theme.mixins.textLink};
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryDark};
  @media ${({ theme }) => theme.devices.mobileMdUp} {
    ${({ theme }) => theme.mixins.H5};
  }
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    margin-bottom: 29px;
  }
`

const StyledCardText = styled.div`
  ${({ theme }) => theme.mixins.textSmall};
`
