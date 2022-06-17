import { api, IResponse, THeaders } from '../utils/http'
import { useQuery } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'

export interface IGetContent extends IResponse {
  result: {}
}

export interface IGetContentTotal extends IResponse {
  result: {}
}

const contentApi = {
  getContent: (payload: THeaders) => {
    return api
      .get<IGetContent>('api/v1/content', {
        headers: payload,
      })
      .then(res => res)
  },
  getContentTotal: (payload: THeaders) => {
    return api
      .get<IGetContentTotal>('api/v1/total', {
        headers: payload,
      })
      .then(res => res)
  },
}

export default contentApi

export const useContentQuery = {
  useGetContent: (payload: THeaders) => {
    return useQuery<AxiosResponse<IGetContent>, AxiosError>(
      ['getContent'],
      () => contentApi.getContent(payload),
      {
        onError: () => {},
      },
    )
  },
  useGetContentTotal: (payload: THeaders) => {
    return useQuery<AxiosResponse<IGetContentTotal>, AxiosError>(
      ['getContentTotal'],
      () => contentApi.getContentTotal(payload),
      {
        onError: () => {},
      },
    )
  },
}
