import { BookingItem } from '@/types'
import React, { createContext, useState, ReactNode } from 'react'

interface BookingContextProps {
  bookings: BookingItem[]
  newBookingId: string | null
  addBooking: (booking: BookingItem) => void
}

export const BookingContext = createContext<BookingContextProps | undefined>(undefined)

interface BookingProviderProps {
  children: ReactNode
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([])
  const [newBookingId, setNewBookingId] = useState<string | null>(null)

  const addBooking = (booking: BookingItem) => {
    setBookings((prev) => [booking, ...prev])
    setNewBookingId(booking.id)
    setTimeout(() => setNewBookingId(null), 5000)
  }

  return <BookingContext.Provider value={{ bookings, addBooking, newBookingId }}>{children}</BookingContext.Provider>
}
