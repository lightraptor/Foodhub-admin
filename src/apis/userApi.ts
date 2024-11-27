import { BASE_URL } from '@/constants'
import { Users } from '@/types'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
