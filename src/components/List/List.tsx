/**
 * vendor
 */
import React from 'react'
import styled, { css } from 'styled-components'
import { useSession, signOut } from 'next-auth/react'

interface Style {
  clicked: boolean
}

interface Props extends Style {}

const List = React.forwardRef<HTMLDivElement, Props>(({ clicked }, ref) => {
  const { data: session } = useSession()

  return (
    <StyledWrapper clicked={clicked} ref={ref}>
      <StyledLinkList>
        {session && (
          <StyledListItem onClick={() => signOut({ callbackUrl: '/' })}>
            Выход
          </StyledListItem>
        )}
      </StyledLinkList>
    </StyledWrapper>
  )
})

List.displayName = 'List'
export default React.memo(List)

const StyledWrapper = styled.div<Style>`
  ${({ clicked }) => {
    if (clicked) {
      return css`
        display: flex;
        background: ${({ theme }) => theme.colors.black};
        backdrop-filter: blur(3px);
        border-radius: 10px 0px 10px 10px;
        padding-top: 16px;
        padding-bottom: 16px;
        position: absolute;
        right: 0;
        top: 70px;
        width: 100%;
        @media ${({ theme }) => theme.devices.mobileLgUp} {
          width: 152px;
        }
      `
    }
    return css`
      display: none;
    `
  }}
`

const StyledLinkList = styled.ul`
  width: 100%;
`

const StyledListItem = styled.li`
  padding-left: 26px;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  height: 26px;
  display: flex;
  align-items: center;
  transition: 0.1s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
  ${({ theme }) => theme.mixins.textSmall};
  color: white;
  a {
    color: white;
    text-decoration: none;
    ${({ theme }) => theme.mixins.textSmall};
  }
`
