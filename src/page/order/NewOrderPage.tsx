import { fetchOrderStaff, postOrderDetail } from '@/apis/orderApi'
import { OrderItem } from '@/types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { OrderList } from './components/OrderList'
import OrderSummary from './components/OrderSumary'

export type OrderDetailParams = {
  id: string
}

export const NewOrderPage = () => {
  const { id } = useParams<OrderDetailParams>()
  const [loading, setLoading] = React.useState(false)
  const [order, setOrder] = useState<OrderItem>()
  const fetchData = async () => {
    const bookingId = id ?? ''
    try {
      setLoading(true)
      const response = await fetchOrderStaff({ bookingId })
      if (!response.success) {
        throw new Error('Failed to fetch bookings')
      }
      const data = response.data
      setOrder(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToOrder = async (item: string, quantity: number) => {
    try {
      setLoading(true)
      const response = await postOrderDetail({
        orderId: order?.id ?? '',
        productId: item,
        quantity: quantity
      })
      if (!response.success) {
        throw new Error('Failed to fetch bookings')
      }
      const data = response.data
      setOrder(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <div>Loading...</div>
  return (
    <>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-2/3'>
          <OrderList addToOrder={addToOrder} />
        </div>
        <div className='w-full md:w-1/3'>{order !== undefined && <OrderSummary orderItems={order} />}</div>
      </div>
    </>
  )
}
