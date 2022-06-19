import { api, IResponse, THeaders } from '../utils/http'
import { useQuery } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'
import { IUsePaginationState } from '../hook/usePagination'

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
  getContent: ({ headers, options }: IUseGetContentPayload) => {
    return api.get<IGetContent>('api/v1/content', {
      headers,
      params: {
        page: options?.page,
        limit: options?.limit,
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

export interface IUseGetContentPayload {
  headers: THeaders
  options?: Pick<IUsePaginationState, 'page' | 'limit'>
}

export const useContentQuery = {
  useGetContent: ({
    headers,
    options = {
      page: 0,
      limit: 6,
    },
  }: IUseGetContentPayload) => {
    return useQuery<AxiosResponse<IGetContent>, AxiosError>(
      ['getContent', options?.page, options?.limit],
      () => contentApi.getContent({ headers, options }),
      {
        enabled: !!headers['x-access-token'],
        keepPreviousData: true,
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
