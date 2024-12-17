import { BASE_URL } from '@/constants'
import { CouponItem } from '@/types'
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

export interface Response {
  items: CouponItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export interface ResponseAdd {
  items: CouponItem
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

interface PostCoupon {
  couponCode: string
  discountPercent: number
  discountAmount: number
  quantity: number
  inactive: boolean
}

export const fetchGetCoupon = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<Response>> => {
  try {
    const response: AxiosResponse<ApiResponse<Response>> = await instance.get(`api/Coupon/admin/get-list`, {
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

export const addCoupon = async (payload: PostCoupon): Promise<ApiResponse<ResponseAdd>> => {
  try {
    const response: AxiosResponse<ApiResponse<ResponseAdd>> = await instance.post(`/api/Coupon`, payload)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const updateCoupon = async (payload: CouponItem): Promise<ApiResponse<ResponseAdd>> => {
  try {
    const response: AxiosResponse<ApiResponse<ResponseAdd>> = await instance.put(`/api/Coupon`, payload)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const deleteCoupon = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/Coupon/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
}
