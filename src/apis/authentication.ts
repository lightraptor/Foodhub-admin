import { FormLogin, FormRegister } from 'types'
import { api, Api } from './api'

export class AuthenticationApi {
  instance: Api

  constructor(param: Api) {
    this.instance = param
  }
  public doLoginRequest = (payload: FormLogin) => {
    return this.instance.caller.post('https://192.168.12.210:7143/api/Account/login', payload)
  }

  public doRegisterRequest = (payload: FormRegister) => {
    return this.instance.caller.post('https://192.168.12.210:7143/api/Account/register', payload)
  }
  public doRefreshAccessToken = () => {
    const payload = {
      refreshToken: localStorage.getItem('refreshToken'),
      accessToken: localStorage.getItem('accessToken')
    }
    return this.instance.caller.post('https://192.168.12.210:7143/api/Account/refresh-access-token', payload)
  }
}

export const AuthenApis = new AuthenticationApi(api)
