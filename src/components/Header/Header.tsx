import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
/**
 * context
 */
import { useAppDispatch, useAppState } from '../../context/app'
/**
 * ui
 */
import StyledContainer from '../Layout/Container'
import Icon from '../Icon'
import Button, { ButtonSize, ButtonStyle } from '../Button'
import { TModal } from '../Modal'
import Avatar, { AvatarSize } from '../Avatar'
import List from '../List'
/**
 * hooks
 */
import { useClickOutside } from '../../hook/useClickOutside'

export interface IHeader {}

const Header = React.forwardRef<HTMLHeadElement, IHeader>((props, ref) => {
  const router = useRouter()
  const { modalShown } = useAppState()
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  const [isMenuOpen, setMenuBtn] = useState(false)

  const ListRef = React.useRef<HTMLDivElement>(null)
  const AvatarRef = React.useRef<HTMLDivElement>(null)

  useClickOutside([ListRef, AvatarRef], () => {
    setMenuBtn(false)
  })

  const setModal = useCallback(
    (): void =>
      dispatch({
        type: 'SET_MODAL',
        modalShown: !modalShown,
        modalType: TModal.LOGIN,
      }),
    [dispatch, modalShown],
  )

  const onClickMenu = useCallback(() => {
    setMenuBtn(!isMenuOpen)
  }, [isMenuOpen])

  const onClickMain = useCallback(() => router.push('/'), [router])

  return (
    <StyledHeader ref={ref}>
      <StyledContainer>
        <StyledHeaderInner>
          {/* Brand */}
          <StyledHeaderBrand>
            <StyledHeaderLogo onClick={onClickMain}>
              <Icon name='logo' width='98' height='22' />
            </StyledHeaderLogo>
          </StyledHeaderBrand>
          {/* Right side */}
          <StyledHeaderNavContainer>
            <StyledHeaderNav>
              {!session && (
                <StyledHeaderNavList>
                  <Button
                    onClick={setModal}
                    type='button'
                    buttonStyle={ButtonStyle.FILLED}
                    size={ButtonSize.PADDING}
                  >
                    Вход
                  </Button>
                </StyledHeaderNavList>
              )}
              {session && (
                <Avatar
                  ref={AvatarRef}
                  checked={isMenuOpen}
                  size={AvatarSize.SMALL}
                  onClick={onClickMenu}
                />
              )}
            </StyledHeaderNav>
          </StyledHeaderNavContainer>

          <List clicked={isMenuOpen} ref={ListRef} />
        </StyledHeaderInner>
      </StyledContainer>
    </StyledHeader>
  )
})

Header.displayName = 'Header'
export default Header

const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 999;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primaryDark};
`

const StyledHeaderInner = styled.div`
  padding: 16px 0;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  position: relative;
`

const StyledHeaderBrand = styled.div`
  justify-content: start;
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    display: flex;
    align-items: center;
  }
`

const StyledHeaderLogo = styled.div`
  cursor: pointer;
`

const StyledHeaderNavContainer = styled.nav``

const StyledHeaderNav = styled.nav``

const StyledHeaderNavList = styled.ul`
  display: flex;
`
