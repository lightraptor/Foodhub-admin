import { BASE_URL } from '@/constants'
import { Menu } from '@/types'
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

interface MenuResponse {
  items: Menu[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

interface MenuAdd {
  MenuName: string
  SoftOrder: number
  description: string
  inactive: boolean
  File: File
}

export const fetchMenu = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<MenuResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<MenuResponse>> = await instance.get(
      `/api/Menu?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const addMenu = async (menu: Partial<MenuAdd>): Promise<ApiResponse<MenuResponse>> => {
  try {
    const formData = new FormData()

    // Thêm các trường vào formData
    formData.append('MenuName', menu.MenuName || '')
    formData.append('SoftOrder', menu.SoftOrder?.toString() || '0')
    formData.append('Description', menu.description || '')
    formData.append('Inactive', menu.inactive ? 'true' : 'false')

    // Kiểm tra và thêm file hình ảnh vào formData nếu có
    if (menu.File) {
      formData.append('File', menu.File)
    }

    // Gửi yêu cầu POST với nội dung formData
    const response: AxiosResponse<ApiResponse<MenuResponse>> = await instance.post('/api/Menu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Đảm bảo rằng header là multipart/form-data
      }
    })

    return response.data
  } catch (error) {
    console.error('Error adding menu:', error)
    throw error
  }
}

export const updateMenu = async (
  menu: Partial<{ Id: string; MenuName: string; SortOrder: number; Description: string; Inactive: boolean; File: File }>
): Promise<
  ApiResponse<{
    data: { id: string; menuName: string; description: string; inactive: boolean; sortOrder: number; imageUrl: string }
    message: string
    success: boolean
  }>
> => {
  try {
    const formData = new FormData()

    // Thêm các trường vào formData
    formData.append('Id', menu.Id || '')
    formData.append('MenuName', menu.MenuName || '')
    formData.append('SortOrder', menu.SortOrder?.toString() || '0')
    formData.append('Description', menu.Description || '')
    formData.append('Inactive', menu.Inactive ? 'true' : 'false')

    // Kiểm tra và thêm file hình ảnh vào formData nếu có
    if (menu.File) {
      formData.append('File', menu.File)
    }
    const response: AxiosResponse<
      ApiResponse<{
        data: {
          id: string
          menuName: string
          description: string
          inactive: boolean
          sortOrder: number
          imageUrl: string
        }
        message: string
        success: boolean
      }>
    > = await instance.put(`/api/Menu`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Đảm bảo rằng header là multipart/form-data
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating menu:', error)
    throw error
  }
}

export const deleteMenu = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/Menu/id:${id}?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
}

export const fetchActiveMenu = async (): Promise<ApiResponse<Menu[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Menu[]>> = await instance.get(`/api/Menu/active`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
