import { NextComponentType, NextPageContext } from 'next'
import React from 'react'
import type { AppProps } from 'next/app'
import { getSession } from 'next-auth/react'
/**
 * Authentication configuration
 */
export interface AuthEnabledComponentConfig {
  auth: {
    require: boolean
    loading: React.ReactNode
    unauthorized: string
  }
}

/**
 * A component with authentication configuration
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
  AuthEnabledComponentConfig

export type AppAuthProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>
}

export const withAuthenticatedOrRedirect = async (
  context: NextPageContext,
  destination: string = '/',
  fn?: (context: NextPageContext) => object,
) => {
  const session = await getSession(context)
  const isUser = !!session?.token

  // No authenticated session
  if (!isUser) {
    return {
      redirect: {
        permanent: false,
        destination,
      },
    }
  }

  // Returned by default, when `fn` is undefined
  const defaultResponse = { props: { session } }

  return fn ? { ...defaultResponse, ...fn(context) } : defaultResponse
}
