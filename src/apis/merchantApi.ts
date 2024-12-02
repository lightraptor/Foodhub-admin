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

export const fetchMerchantPaging = async (): Promise<ApiResponse<Merchants>> => {
  try {
    const response: AxiosResponse<ApiResponse<Merchants>> = await instance.get(`/api/Merchant/paging`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
