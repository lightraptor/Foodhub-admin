import { BASE_URL } from '@/constants'
import { OrderItem } from '@/types'
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

interface orderPost {
  mealId: string
  tableId: null
  orderType: number
  customerName: string
  customerPhone: string
  shippingAddress: string
  discountAmount: number
}

interface OrderResponse {
  items: OrderItem[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

export interface OrderPostResponse {
  id: string
  bookingId: any
  orderType: number
  orderTypeName: string
  orderStatus: string
  createdDate: string
  shippingDate: string
  customerId: string
  customerName: string
  customerPhone: string
  shippingAddress: string
  deliveryAmount: number
  depositAmount: number
  discountAmount: number
  totalAmount: number
  orderDetails: OrderDetail[]
}

export interface OrderDetail {
  id: string
  orderId: string
  productId: string
  productName: string
  unitName: string
  price: number
  quantity: number
  totalPrice: number
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
  products
}: {
  orderId: string
  products: {
    productId: string
    quantity: number
  }[]
}): Promise<ApiResponse<OrderItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderItem>> = await instance.post(`/api/order/staff/order-detail`, {
      orderId,
      products
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const fetchOrder = async ({ orderId }: { orderId: string }): Promise<ApiResponse<OrderItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderItem>> = await instance.get(`/api/order/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postOrder = async ({
  mealId,
  tableId,
  orderType,
  customerName,
  customerPhone,
  shippingAddress,
  discountAmount
}: orderPost): Promise<ApiResponse<OrderPostResponse>> => {
  const paypoad = {
    mealId,
    tableId,
    orderType,
    customerName,
    customerPhone,
    shippingAddress,
    discountAmount
  }
  try {
    const response: AxiosResponse<ApiResponse<OrderPostResponse>> = await instance.post(`/api/order`, paypoad)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const changeStatusOrder = async ({
  id,
  status
}: {
  id: string
  status: string
}): Promise<ApiResponse<OrderPostResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<OrderPostResponse>> = await instance.put(`/api/order/status`, {
      id,
      status
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
