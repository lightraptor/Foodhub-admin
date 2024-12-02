import { BASE_URL } from '@/constants'
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

export const importExcelProduct = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response: AxiosResponse<ApiResponse<any>> = await instance.post('/api/Product/insert-from-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error importing product:', error)
    throw error
  }
}
