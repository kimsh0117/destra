import React from 'react'
import styled, { css } from 'styled-components'

export enum InputStyle {
  DEFAULT = 'default',
  ROUNDED = 'round',
}

interface Style {
  inputStyle: InputStyle
}

interface Props extends Style {
  label?: string
  errorMessage?: string
  disabled?: boolean
  name?: string
  type?: string
  placeholder?: string
  id?: string
}

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label = '',
      errorMessage = '',
      disabled = false,
      name,
      type,
      placeholder,
      inputStyle,
      id,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledContainer>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <StyledInput
          error={errorMessage}
          disabled={disabled}
          type={type}
          name={name}
          placeholder={placeholder}
          inputStyle={inputStyle}
          {...rest}
          ref={ref}
          id={id}
        />
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
      </StyledContainer>
    )
  },
)

Input.displayName = 'Input'
export default React.memo(Input)

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.mixins.textSmall};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 12px;
  text-align: left;
  display: inline-block;
`

const StyledInput = styled.input<{
  error: string
  disabled: boolean
  inputStyle: InputStyle
}>`
  height: 45px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.greySecondary};
  text-indent: 21px;
  ${({ theme }) => theme.mixins.textSmall};
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    font-size: 1rem;
  }
  &:focus,
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  ${({ error }) => {
    if (error) {
      return css`
        border: 1px solid ${({ theme }) => theme.colors.error};

        &:focus,
        &:active {
          border: 1px solid ${({ theme }) => theme.colors.error};
        }
      `
    }
    return css``
  }}

  ${({ disabled }) => {
    if (disabled) {
      return css`
        cursor: not-allowed;
        pointer-events: none;
      `
    }
    return css``
  }}
  
  ${({ inputStyle }) => {
    switch (inputStyle) {
      case InputStyle.DEFAULT:
        return css`
          border-radius: 0.2083rem;
        `
      case InputStyle.ROUNDED:
        return css`
          border-radius: 50px;
          border: 1px solid ${({ theme }) => theme.colors.primary};
        `
      default:
        break
    }
  }}
`

const StyledError = styled.div`
  margin-top: 14px;
  ${({ theme }) => theme.mixins.textSmall};
  color: ${({ theme }) => theme.colors.error};
`
