import { BASE_URL } from '@/constants'
import { DashboardData } from '@/types'
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

export const fetchDashboard = async ({ criteria }: { criteria: string }): Promise<ApiResponse<DashboardData>> => {
  try {
    const response: AxiosResponse<ApiResponse<DashboardData>> = await instance.get(`/api/dashboard/${criteria}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
