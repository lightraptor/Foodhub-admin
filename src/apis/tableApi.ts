import { BASE_URL } from '@/constants'
import { TableItem } from '@/types'
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

export interface TableResponse {
  items: TableItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export const fetchGetAllTable = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<TableResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<TableResponse>> = await instance.get(`api/Table/get-all`, {
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

export const fetchGetTable = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<TableResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<TableResponse>> = await instance.get(`api/Table`, {
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

export const putTableStatus = async ({
  tableId,
  status
}: {
  tableId: string
  status: string
}): Promise<ApiResponse<TableResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<TableResponse>> = await instance.put(`api/Table/status`, {
      tableId,
      status
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const addTable = async ({
  name,
  maxCapacity,
  areaName
}: {
  name: string
  maxCapacity: number
  areaName: string
}): Promise<ApiResponse<TableItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<TableItem>> = await instance.post(`api/Table`, {
      name,
      maxCapacity,
      areaName
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const updateTable = async ({
  name,
  maxCapacity,
  areaName,
  isAvailable,
  id
}: {
  id: string
  name: string
  maxCapacity: number
  areaName: string
  isAvailable: boolean
}): Promise<ApiResponse<TableItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<TableItem>> = await instance.put(`api/Table`, {
      name,
      maxCapacity,
      areaName,
      isAvailable,
      id
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const deleteTable = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/Table/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
}
