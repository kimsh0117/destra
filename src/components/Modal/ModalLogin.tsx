import React from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
/**
 * context
 */
import { useAppDispatch, useAppState } from '../../context/app'
/**
 * ui
 */
import Input, { InputStyle } from '../Input'
import Button, { ButtonSize, ButtonStyle } from '../Button'
import { TModal } from './Modal'

type TFormValue = {
  email: string
  password: string
}

const ModalLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { isValid, errors, isSubmitting, isDirty },
  } = useForm<TFormValue>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const dispatch = useAppDispatch()
  const { loading } = useAppState()

  const onSubmit: SubmitHandler<TFormValue> = data => {
    dispatch({
      type: 'SET_LOADING',
      loading: true,
    })
    const body = {
      ...data,
    }
    reset({
      email: '',
      password: '',
    })
    return signIn('commonLogin', {
      redirect: false,
      ...body,
    }).then(res => {
      // @ts-ignore
      if (!res.error) {
        dispatch({
          type: 'SET_LOADING',
          loading: false,
        })
        dispatch({
          type: 'SET_MODAL',
          modalShown: false,
          modalType: TModal.BLANK,
        })
      }
      //@ts-ignore
      if (res && res.error) {
        dispatch({
          type: 'SET_LOADING',
          loading: false,
        })
        setValue('email', body.email)
        setValue('password', body.password)
        setError('email', {
          type: 'manual',
          //@ts-ignore
          message: res.error,
        })
      }
    })
  }
  return (
    <StyledContainer onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>Вход</StyledTitle>
      <StyledInputWrapper>
        <Input
          errorMessage={errors?.email?.message}
          inputStyle={InputStyle.DEFAULT}
          type='text'
          label='Почта'
          {...register('email', {
            required: {
              value: true,
              message: 'поле должно быть заполнено',
            },
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'введите корректную почту',
            },
          })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          errorMessage={errors?.password?.message}
          inputStyle={InputStyle.DEFAULT}
          type='password'
          label='Пароль'
          {...register('password', {
            required: {
              value: true,
              message: 'поле должно быть заполнено',
            },
          })}
        />
      </StyledInputWrapper>
      <StyledButtonWrapper>
        <Button
          loading={loading}
          buttonStyle={ButtonStyle.FILLED}
          size={ButtonSize.BLOCK}
          disabled={!isValid || isSubmitting || !isDirty}
          type='submit'
        >
          Войти
        </Button>
      </StyledButtonWrapper>

      <StyledHr />
    </StyledContainer>
  )
}

export default ModalLogin

const StyledContainer = styled.form`
  width: 100%;
`

const StyledTitle = styled.h4`
  ${({ theme }) => theme.mixins.H4};
  text-align: center;
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    ${({ theme }) => theme.mixins.H3};
  }
`

const StyledInputWrapper = styled.div`
  margin-top: 24px;
`

const StyledButtonWrapper = styled.div`
  margin-top: 40px;

  button {
    svg path,
    svg rect {
      fill: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`

const StyledHr = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.colors.greySecondary};
  margin: 56px 0;
  @media ${({ theme }) => theme.devices.mobileLgUp} {
    margin: 31px 0;
  }
`
