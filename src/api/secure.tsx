import { api, IResponse, THeaders } from '../utils/http'

export type TLoginBody = {
  email: string
  password: string
}

export interface IPostLogin extends IResponse {
  result: {
    refresh_token: string
    access_token: string
  }
}

const secureApi = {
  postLogin: ({ password, email }: TLoginBody) => {
    return api.post<IPostLogin>('api/v1/login', {
      email,
      password,
    })
  },
  postRefresh: (payload: THeaders) => {
    return api.post('api/v1/refresh', null, {
      headers: payload,
    })
  },
}

export default secureApi
