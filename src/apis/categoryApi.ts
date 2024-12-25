import { BASE_URL } from '@/constants'
import { Category } from '@/types'
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

interface CategoryResponse {
  items: Category[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

export const fetchCategory = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<CategoryResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<CategoryResponse>> = await instance.get(
      `/api/Category?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const addCategory = async (category: Partial<Category>): Promise<ApiResponse<CategoryResponse>> => {
  try {
    const payload = {
      name: category.name,
      code: category.code,
      description: category.description,
      inactive: category.inactive
    }
    const response: AxiosResponse<ApiResponse<CategoryResponse>> = await instance.post('/api/Category', payload)
    return response.data
  } catch (error) {
    console.error('Error adding menu:', error)
    throw error
  }
}

export const updateCategory = async (category: Partial<Category>): Promise<ApiResponse<Category>> => {
  try {
    const response: AxiosResponse<ApiResponse<Category>> = await instance.put(`/api/Category`, category)
    return response.data
  } catch (error) {
    console.error('Error updating menu:', error)
    throw error
  }
}

export const deleteCategory = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/Category/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
}

export const fetchActiveCategory = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Category[]>> = await instance.get(`/api/Category/active`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
