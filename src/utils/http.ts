import axios from 'axios'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

export const api = axios.create({ baseURL: API_URL })

export interface IResponse {
  status: number
  success: boolean
  event?: string
}

type Access = 'x-access-token' | 'x-refresh-token'

export type THeaders = {
  [token in Access]: string
}
