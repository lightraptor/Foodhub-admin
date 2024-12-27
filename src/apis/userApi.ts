import { BASE_URL } from '@/constants'
import { Users, UserItem } from '@/types'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'ngrok-skip-browser-warning': 'true'
  }
})

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

interface UsersResponse {
  items: Users[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

export const fetchUsers = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<UsersResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<UsersResponse>> = await instance.get('/api/user/paging', {
      params: {
        PageNumber,
        PageSize
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postUsers = async (payload: UserItem): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.post('/api/user', payload)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const putUnbanUser = async ({ id }: { id: string }): Promise<boolean> => {
  try {
    const response: AxiosResponse<boolean> = await instance.put(`/api/user/unban/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const putBanUser = async ({ id }: { id: string }): Promise<boolean> => {
  try {
    const response: AxiosResponse<boolean> = await instance.put(`/api/user/ban-user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
