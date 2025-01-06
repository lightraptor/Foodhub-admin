import axios, { AxiosInstance } from 'axios'
import { AuthenApis } from './authentication'

export class Api {
  caller!: AxiosInstance
  static instance: Api
  static getInstance = () => {
    if (!Api.instance) {
      Api.instance = new Api()
    }
    return Api.instance
  }
  constructor() {
    const api = axios.create()
    this.caller = api

    this.caller.interceptors.response.use(
      (response) => response, // Trả về response nếu không lỗi
      async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            const res = await AuthenApis.doRefreshAccessToken()
            const newAccessToken = res.data.accessToken
            localStorage.setItem('accessToken', newAccessToken)
            this.setToken(newAccessToken)
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return this.caller(originalRequest)
          } catch (refreshError) {
            console.error('Failed to refresh token', refreshError)
            throw refreshError
          }
        }
        return Promise.reject(error)
      }
    )
  }

  setToken(token: string) {
    this.caller.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  removeToken() {
    this.caller.defaults.headers.common.Authorization = ''
  }
}

export const api = Api.getInstance()
