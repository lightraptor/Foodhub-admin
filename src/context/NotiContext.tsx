import { BookingItem, OrderItem } from '@/types'
import React, { createContext, useState, ReactNode } from 'react'

interface NotiContextProps {
  orders: OrderItem[]
  bookings: BookingItem[]
  newBookingId: string | null
  newOrderId: string | null
  addBooking: (booking: BookingItem) => void
  addOrder: (order: OrderItem) => void
}

export const NotiContext = createContext<NotiContextProps | undefined>(undefined)

interface NotiProviderProps {
  children: ReactNode
}

export const NotiProvider: React.FC<NotiProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([])
  const [newBookingId, setNewBookingId] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [newOrderId, setNewOrderId] = useState<string | null>(null)

  const addBooking = (booking: BookingItem) => {
    setBookings((prev) => [booking, ...prev])
    setNewBookingId(booking.id)
    setTimeout(() => setNewBookingId(null), 5000)
  }

  const addOrder = (order: OrderItem) => {
    setOrders((prev) => [order, ...prev])
    setNewOrderId(order.id)
    setTimeout(() => setNewOrderId(null), 5000)
  }

  return (
    <NotiContext.Provider
      value={{
        bookings,
        addBooking,
        newBookingId,
        orders,
        addOrder,
        newOrderId
      }}
    >
      {children}
    </NotiContext.Provider>
  )
}
