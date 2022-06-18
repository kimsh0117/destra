import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AppProvider from '../context'
import Reset from '../styles/reset'
import Normalize from '../styles/normalize'
import GlobalStyle from '../styles/globalStyle'
import theme from '../styles/themes/theme'
import { AppAuthProps } from '../utils/auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Auth = ({ children }: any) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = !!session?.token

  React.useEffect(() => {
    if (status === 'loading') return
    // Если требуется не авторизованног на страницу protect
    // redirect to '/?modal=login'
    if (!isUser) {
      router.push('/?modal=login')
    }
  }, [isUser, status, router])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>...loading</div>
}

const MyApp = ({ Component, pageProps }: AppAuthProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  )
  return (
    <SessionProvider
      session={pageProps.session}
      basePath='auth'
      refetchOnWindowFocus={false}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppProvider>
            <ThemeProvider theme={theme}>
              <Reset />
              <Normalize />
              <GlobalStyle />
              {Component.auth?.require ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </ThemeProvider>
          </AppProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
