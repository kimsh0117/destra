import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { api } from 'src/utils/http'
import { AxiosError } from 'axios'
import getConfig from 'next/config'
import jwt_decode from 'jwt-decode'

const {
  publicRuntimeConfig: { NODE_ENV },
} = getConfig()

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
  try {
    const { data, status } = await api.post('api/v1/refresh', null, {
      headers: {
        'x-refresh-token': token.refreshToken as string,
      },
    })

    if (status !== 200) {
      throw data
    }
    const decoded = jwt_decode(data.result.access_token as string)
    return {
      ...token,
      accessToken: data.result.access_token,
      // @ts-ignore
      accessTokenExpires: decoded.exp,
      refreshToken: data.result.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, {
    providers: [
      Credentials({
        id: 'commonLogin',
        name: 'commonLogin',
        credentials: {
          email: { type: 'text', label: 'Почта' },
          password: { type: 'text', Почта: 'Пароль' },
        },
        async authorize(credentials) {
          try {
            const { data } = await api.post('api/v1/login', {
              email: credentials!.email,
              password: credentials!.password,
            })

            if (data.status === 200) {
              return data.result
            }
          } catch (error) {
            const err = error as AxiosError
            throw new Error(err!.response?.data.event)
          }
        },
      }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
      maxAge: 24 * 60 * 60 * 7, // 1 week
    },
    callbacks: {
      jwt: async ({ token, user, account }) => {
        // Initial sign in
        if (account && user) {
          const decoded = jwt_decode(user.access_token as string)
          return {
            accessToken: user.access_token,
            // @ts-ignore
            accessTokenExpires: decoded.exp,
            refreshToken: user.refresh_token,
          }
        }
        // Return previous token if the access token has not expired yet
        // @ts-ignore
        if (Date.now() < token.accessTokenExpires) {
          return token
        }
        // Access token has expired, try to update it
        return refreshAccessToken(token)
      },
      session: async ({ session, token }) => {
        delete session.user

        session.accessToken = token.accessToken
        session.error = token.error

        return session
      },
    },
    pages: {
      signIn: '/',
    },
    debug: NODE_ENV === 'development',
  })
}
