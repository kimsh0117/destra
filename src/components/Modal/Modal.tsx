import React, { useState } from 'react'
import styled from 'styled-components'
/**
 * context
 */
import { useAppDispatch, useAppState } from '../../context/app'
/**
 * ui
 */

import ModalLogin from './ModalLogin'
/**
 * hooks
 */
import { useClickOutside } from '../../hook/useClickOutside'

export enum TModal {
  LOGIN = 'login',
  BLANK = 'blank',
}

const ModalOption = {
  login: <ModalLogin />,
  blank: '',
}

const Modal = () => {
  const { modalShown, modalType } = useAppState()
  const dispatch = useAppDispatch()
  const [blockClickOutside] = useState<boolean>(false)

  const setModal = () => {
    dispatch({
      type: 'SET_MODAL',
      modalShown: !modalShown,
      modalType: TModal.BLANK,
    })
  }
  const modalRef = React.useRef<HTMLDivElement>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  useClickOutside([modalRef, formRef], () => {
    setModal()
  })

  if (!modalShown) {
    return null
  }

  return (
    <StyledWrapper>
      <StyledModalBody ref={blockClickOutside ? null : modalRef}>
        {ModalOption[modalType]}
      </StyledModalBody>
    </StyledWrapper>
  )
}

export default Modal

const StyledWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(237, 242, 237, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  z-index: 9990;
`

const StyledModalBody = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 54px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  margin: auto;
  position: relative;
  padding: 35px 24px;
  width: 100%;
  max-width: 100%;
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    padding: 68px 97px;
    max-width: 555px;
  }
`
