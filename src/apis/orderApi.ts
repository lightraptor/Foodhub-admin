import { BASE_URL } from '@/constants'
import { OrderItem } from '@/types'
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

interface OrderResponse {
  items: OrderItem[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

export const fetchPagingOrder = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<OrderResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderResponse>> = await instance.get(`/api/order/get-orders-paging`, {
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

export const fetchOrderStaff = async ({ bookingId }: { bookingId: string }): Promise<ApiResponse<OrderItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderItem>> = await instance.get(`/api/order/staff/${bookingId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postOrderStaff = async ({ BookingId }: { BookingId: string }): Promise<ApiResponse<OrderItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderItem>> = await instance.post(
      `/api/order/staff/order?BookingId=${BookingId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postOrderDetail = async ({
  orderId,
  productId,
  quantity
}: {
  orderId: string
  productId: string
  quantity: number
}): Promise<ApiResponse<OrderItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderItem>> = await instance.post(`/api/order/staff/order-detail`, {
      orderId,
      productId,
      quantity
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
