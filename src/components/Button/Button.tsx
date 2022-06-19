import React from 'react'
import styled, { css } from 'styled-components'
import debounce from 'lodash/debounce'
/**
 * ui
 */
import Icon from '../Icon'
/**
 * constants
 */
import { DEBOUNCE_WAIT } from '../../constants'

export enum ButtonStyle {
  FILLED = 'filled',
  OUTLINED = 'outlined',
}

export enum ButtonSize {
  BLOCK = 'block',
  PADDING = 'padding',
}

interface Style {
  buttonStyle: ButtonStyle
  size: ButtonSize
  shadow?: string
  disabled?: boolean
  clicked?: boolean
}

interface Props extends Style {
  type: 'button' | 'submit' | 'reset'
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void
  loading?: boolean
}

const Button: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      buttonStyle,
      size,
      disabled,
      children,
      onClick,
      clicked,
      shadow,
      type,
      loading,
    },
    ref,
  ) => {
    const handler = debounce(
      (
        e:
          | React.MouseEvent<HTMLButtonElement>
          | React.TouchEvent<HTMLButtonElement>,
      ) => {
        onClick && onClick(e)
      },
      DEBOUNCE_WAIT,
    )
    return (
      <StyledContainer
        buttonStyle={buttonStyle}
        size={size}
        onClick={handler}
        onClickCapture={handler}
        disabled={disabled}
        clicked={clicked}
        shadow={shadow}
        ref={ref}
        type={type}
      >
        {loading ? <Icon name='loader' width='13' height='15' /> : children}
      </StyledContainer>
    )
  },
)

Button.displayName = 'Button'
export default Button

const StyledDefaultButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  -webkit-transition: 0.3s all;
  transition: 0.3s all;
  text-align: center;
  line-height: 1.214;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -ms-flex-item-align: center;
  align-self: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`

const StyledContainer = styled(StyledDefaultButton)<Style>`
  ${({ theme }) => theme.mixins.textSmall};
  ${({ size }) => {
    if (size === ButtonSize.BLOCK) {
      return css`
        padding: 13px 15px;
        display: block;
        width: 100%;
      `
    } else if (size === ButtonSize.PADDING) {
      return css`
        padding: 14px 30px;
        width: fit-content;
      `
    } else {
      css``
    }
  }}
  & {
    svg path,
    svg rect {
      fill: ${({ theme }) => theme.colors.primaryDark};
    }
  }
  ${({ buttonStyle }) => {
    switch (buttonStyle) {
      case ButtonStyle.FILLED:
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: #ffffff;
          border-radius: 0.2083rem;
          &:hover {
            background-color: ${({ theme }) => theme.colors.primaryLight};
          }

          &:disabled {
            background-color: ${({ theme }) => theme.colors.primaryLight};
          }
        `
      case ButtonStyle.OUTLINED:
        return css`
          color: ${({ theme }) => theme.colors.primary};
          border: 1px solid ${({ theme }) => theme.colors.primary};
          &:hover {
            border: solid 1px ${({ theme }) => theme.colors.primary};
            color: #ffffff;
            background-color: ${({ theme }) => theme.colors.primary};
          }

          &:active {
            border: solid 1px ${({ theme }) => theme.colors.primary};
            color: #ffffff;
            background-color: ${({ theme }) => theme.colors.primary};
          }

          &:disabled {
            border: 1px solid ${({ theme }) => theme.colors.grey};
            background-color: ${({ theme }) => theme.colors.grey};
            color: #ffffff;
          }
        `
      default:
        break
    }
  }}
`
