import React from 'react'
import styled, { css } from 'styled-components'

export enum AvatarSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  MIDDLE = 'middle',
  LARGE = 'large',
}

interface Style {
  size: AvatarSize
  checked?: boolean
}

interface Props extends Style {
  onClick?: () => void
}

const Avatar = React.forwardRef<HTMLDivElement, Props>(
  ({ size, checked, onClick, children }, ref) => {
    return (
      <StyledWrapper size={size} checked={checked} onClick={onClick} ref={ref}>
        {children}
      </StyledWrapper>
    )
  },
)

const StyledWrapper = styled.div<Style>`
  position: relative;
  border-radius: 100%;
  transition: all 0.275s;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  ${({ size, theme }) => {
    if (size === AvatarSize.SMALL) {
      return css`
        width: 45px;
        height: 45px;
      `
    }
    if (size === AvatarSize.MEDIUM) {
      return css`
        width: 75px;
        height: 75px;
      `
    }
    if (size === AvatarSize.MIDDLE) {
      return css`
        width: 150px;
        height: 150px;
      `
    }
    if (size === AvatarSize.LARGE) {
      return css`
        z-index: 1;
        width: 158px;
        height: 158px;

        @media ${theme.devices.mobileLgUp} {
          width: 278px;
          height: 278px;
        }
      `
    }
  }}
  ${({ checked }) => {
    if (checked) {
      return css`
        transform: scale(1.05);
      `
    }
    return css``
  }}
`
Avatar.displayName = 'Avatar'
export default Avatar
