import { BASE_URL } from '@/constants'
import { BookingItem } from '@/types'
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

interface BookingResponse {
  items: BookingItem[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

interface PostBooking {
  tableIds: string[]
  peopleCount: number
  notes: string
  checkinTime: string
  customerName: string
  phone: string
}

export const fetchBooking = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<BookingResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingResponse>> = await instance.get(
      `/api/booking?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const fetchBookingById = async (id: string): Promise<ApiResponse<BookingItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingItem>> = await instance.get(`/api/booking/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const postBookingStaff = async ({
  tableIds,
  peopleCount,
  notes,
  checkinTime,
  customerName,
  phone
}: PostBooking): Promise<ApiResponse<BookingItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingItem>> = await instance.post(`/api/booking/staff`, {
      tableIds,
      peopleCount,
      notes,
      checkinTime,
      customerName,
      phone
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const changeStatusBooking = async ({
  bookingId,
  status
}: {
  bookingId: string
  status: string
}): Promise<ApiResponse<BookingResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingResponse>> = await instance.put(`/api/booking/status`, {
      bookingId,
      status
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const editBooking = async ({
  id,
  peopleCount,
  notes,
  checkinTime,
  customerName,
  phone
}: BookingItem): Promise<ApiResponse<BookingItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingItem>> = await instance.put(`/api/booking`, {
      id,
      peopleCount,
      notes,
      checkinTime,
      customerName,
      phone
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const deleteBooking = async ({ id }: { id: string }): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/booking/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const changeTableBooking = async ({
  bookingId,
  tableIds
}: {
  bookingId: string
  tableIds: string[]
}): Promise<ApiResponse<BookingResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<BookingResponse>> = await instance.put(`/api/booking/change-table`, {
      bookingId,
      tableIds
    })
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}
