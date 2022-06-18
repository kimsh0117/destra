import { api, IResponse, THeaders } from '../utils/http'
import { useQuery } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'

export interface IGetContent extends IResponse {
  result: {
    _id: string
    name: string
    category: string
  }[]
}

export interface IGetContentTotal extends IResponse {
  result: {
    count: number
  }
}

const contentApi = {
  getContent: (payload: THeaders) => {
    return api.get<IGetContent>('api/v1/content', {
      headers: payload,
      params: {
        page: 1,
        limit: 6,
      },
    })
  },
  getContentTotal: (payload: THeaders) => {
    return api.get<IGetContentTotal>('api/v1/content/total', {
      headers: payload,
    })
  },
}

export default contentApi

export const useContentQuery = {
  useGetContent: (payload: THeaders) => {
    return useQuery<AxiosResponse<IGetContent>, AxiosError>(
      ['getContent'],
      () => contentApi.getContent(payload),
      {
        enabled: !!payload['x-access-token'],
        onError: () => {
          console.log('Failed to get content /api/v1/content ')
        },
      },
    )
  },
  useGetContentTotal: (payload: THeaders) => {
    return useQuery<AxiosResponse<IGetContentTotal>, AxiosError>(
      ['getContentTotal'],
      () => contentApi.getContentTotal(payload),
      {
        enabled: !!payload['x-access-token'],
        onError: () => {
          console.log('Failed to get content /api/v1/total')
        },
      },
    )
  },
}
