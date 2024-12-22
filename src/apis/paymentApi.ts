import { BASE_URL } from '@/constants'
import { PaymentItem } from '@/types'
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

interface getDataResponse {
  items: PaymentItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export interface payment {
  paymentId: string
  paymentUrl: string
}

export interface paymentPost {
  paymentContent: string
  paymentCurrency: string
  requiredAmount: number
  paymentLanguage: string
  orderId: string
  merchantId: string
  paymentDestinationId: string
  paymentDesname: string
}

export const fetchPayment = async ({
  paymentContent,
  paymentCurrency,
  requiredAmount,
  paymentLanguage,
  orderId,
  merchantId,
  paymentDestinationId,
  paymentDesname
}: paymentPost): Promise<ApiResponse<payment>> => {
  try {
    const response: AxiosResponse<ApiResponse<payment>> = await instance.post(`/api/payment/payment-url`, {
      paymentContent,
      paymentCurrency,
      requiredAmount,
      paymentLanguage,
      orderId,
      merchantId,
      paymentDestinationId,
      paymentDesname
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const getListPayment = async ({
  PageNumber,
  PageSize
}: {
  From?: string
  To?: string
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<getDataResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<getDataResponse>> = await instance.get(`/api/payment/paging`, {
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
