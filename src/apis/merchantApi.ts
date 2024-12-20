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

export interface Merchants {
  items: MerchantItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export interface MerchantItem {
  id: string
  merchantName: string
  merchantWebLink: string
  merchantIpnUrl: string
  merchantReturnUrl: string
  secretKey: any
  isActive: boolean
}

interface UpdateMerchant {
  id: string
  merchantName: string
  merchantWebLink: string
  merchantIpnUrl: string
  merchantReturnUrl: string
  secretKey: any
}

interface AddMerchantProp {
  merchantName: string
  merchantWebLink: string
  merchantIpnUrl: string
  merchantReturnUrl: string
}

export const fetchMerchantPaging = async ({
  PageNumber,
  PageSize
}: {
  PageNumber: number
  PageSize: number
}): Promise<ApiResponse<Merchants>> => {
  try {
    const response: AxiosResponse<ApiResponse<Merchants>> = await instance.get(`/api/Merchant/paging`, {
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

export const addMerchant = async (payload: AddMerchantProp): Promise<ApiResponse<MerchantItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<MerchantItem>> = await instance.post(`/api/merchant`, payload)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const updateMerchant = async (payload: UpdateMerchant): Promise<ApiResponse<MerchantItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<MerchantItem>> = await instance.put(`/api/merchant`, payload)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const deleteMerchant = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/merchant/${id}?id=${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
}
