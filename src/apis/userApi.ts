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

interface RolesResponse {
  id: string
  name: string
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
    console.error('Error fetching:', error)
    throw error
  }
}

export const putBanUser = async ({ id }: { id: string }): Promise<boolean> => {
  try {
    const response: AxiosResponse<boolean> = await instance.put(`/api/user/ban-user/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}

export const getRoles = async (): Promise<ApiResponse<RolesResponse[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<RolesResponse[]>> = await instance.get(`/api/user/roles`)
    return response.data
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}

export const postChangeRoles = async ({
  userId,
  roleName
}: {
  userId: string
  roleName: string
}): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.post(
      `/api/user/change-role?userId=${userId}&roleName=${roleName}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching:', error)
    throw error
  }
}
