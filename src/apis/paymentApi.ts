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
