import { FormLogin, FormRegister } from '@/types'
import { api, Api } from './api'
import { BASE_URL } from '@/constants'

const base_url = BASE_URL

export class AuthenticationApi {
  instance: Api

  constructor(param: Api) {
    this.instance = param
  }

  public doLoginRequest = (payload: FormLogin) => {
    return this.instance.caller.post(`${base_url}/api/Account/login`, payload)
  }

  public doRegisterRequest = (payload: FormRegister) => {
    return this.instance.caller.post(`${base_url}/api/Account/register`, payload)
  }
  public doRefreshAccessToken = () => {
    const payload = {
      refreshToken: localStorage.getItem('refreshToken'),
      accessToken: localStorage.getItem('accessToken')
    }
    return this.instance.caller.post(`${base_url}/Account/refresh-access-token`, payload)
  }
}

export const AuthenApis = new AuthenticationApi(api)
