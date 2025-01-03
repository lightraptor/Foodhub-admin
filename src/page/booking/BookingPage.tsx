import { useContext, useEffect, useState } from 'react'
import { changeStatusBooking, editBooking, fetchBooking, putTableStatus } from '@/apis'
import { BookingItem } from '@/types'
import { BookingCard } from './components/BookingCard'
import { Pagination } from '@/components'
import { useNavigate } from 'react-router'
import { EditBookingDialog } from './components'
import { toast } from 'react-toastify'
import ErrorResult from '@/components/error-result/ErrorResult'
import { Button } from '@/components/ui/button'
import { BookingContext } from '@/context'
import { fetchOrderStaff, postOrderStaff } from '@/apis/orderApi'

export const BookingPage = () => {
  const [bookingList, setBookingList] = useState<BookingItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mergedBookings, setMergedBookings] = useState<BookingItem[]>([])

  const bookingContext = useContext(BookingContext)

  if (!bookingContext) {
    throw new Error('BookingContext is not provided')
  }

  const { bookings } = bookingContext
  const navigate = useNavigate()

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)
      const response = await fetchBooking({ PageNumber: page, PageSize: size })
      if (!response.success) {
        setBookingList([])
        throw new Error('Failed to fetch bookings')
      }
      const data = response.data
      setBookingList(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch booking list whenever currentPage or pageSize changes
  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  // Update mergedBookings whenever bookingList or bookings change
  useEffect(() => {
    const updatedBookings = [
      ...bookings.filter((booking) => !bookingList.some((item) => item.id === booking.id)),
      ...bookingList
    ]
    setMergedBookings(updatedBookings)
  }, [bookings, bookingList])

  const handleEdit = (booking: BookingItem) => {
    setSelectedBooking(booking)
    setDialogOpen(true)
  }

  const handleCheckin = async (booking: BookingItem) => {
    try {
      const response = await changeStatusBooking({ bookingId: booking.id, status: 'Processing' })
      if (response.success) {
        const makeOrderId = await postOrderStaff({ BookingId: booking.id })
        const orderData = await makeOrderId.data
        console.log(orderData)
        const tableIds = booking.tables.map((table) => table.tableId)
        for (const tableId of tableIds) {
          await putTableStatus({ tableId, status: 'Occupied' })
        }
        toast.success('Booking accepted successfully', { autoClose: 2000 })
        fetchData()
      } else {
        throw new Error('Failed to accept booking')
      }
    } catch (error) {
      console.error('Error accepting booking:', error)
    }
  }

  const handleChangeStatus = async (booking: BookingItem, status: string, tableStatus: string | null = null) => {
    try {
      const response = await changeStatusBooking({ bookingId: booking.id, status })
      if (response.success) {
        if (tableStatus) {
          const tableIds = booking.tables.map((table) => table.tableId)
          for (const tableId of tableIds) {
            await putTableStatus({ tableId, status: tableStatus })
          }
        }
        toast.success(`Booking status updated to ${status}`, { autoClose: 2000 })
        fetchData()
      } else {
        throw new Error('Failed to change booking status')
      }
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error)
    }
  }

  const handleViewDetails = (booking: BookingItem) => {
    navigate(`/booking/${booking.id}`)
  }

  const handleChangeTable = (id: string) => {
    navigate(`/change-table/${id}`)
  }

  const handleMoreOrder = async (booking: BookingItem) => {
    try {
      const response = await fetchOrderStaff({ bookingId: booking.id })
      if (response.success) {
        navigate(`/new-order/${response.data?.id}`)
      }
    } catch (error) {
      console.error('Error fetching additional order:', error)
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedBooking(null)
  }

  const handleEditSave = async (updatedBooking: BookingItem) => {
    try {
      const response = await editBooking(updatedBooking)
      if (response.success) {
        toast.success('Booking updated successfully', { autoClose: 2000 })
        fetchData()
      } else {
        throw new Error('Failed to update booking')
      }
    } catch (error) {
      console.error('Error saving updated booking:', error)
    }
  }

  if (loading) return <p className='text-center text-lg'>Đang tải...</p>

  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Quản lý đặt bàn</p>
      <div className='flex flex-row justify-end'>
        <Button
          className='mx-10 my-3 bg-[#3b82f6] text-[#fff] hover:bg-[#3b82ff]'
          onClick={() => navigate('/new-booking')}
        >
          Đặt bàn mới
        </Button>
      </div>
      {mergedBookings.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-10'>
          {mergedBookings.map((booking) => {
            const isHighlighted = bookings.some((b) => b.id === booking.id)
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                isHighlight={isHighlighted}
                onAccept={() => handleChangeStatus(booking, 'Accept', 'Reserved')}
                onComplete={() => handleChangeStatus(booking, 'Complete', 'Free')}
                onCancel={() => handleChangeStatus(booking, 'Cancel', 'Free')}
                onCheckin={() => handleCheckin(booking)}
                onViewDetails={() => handleViewDetails(booking)}
                onChangeTable={() => handleChangeTable(booking.id)}
                onEdit={() => handleEdit(booking)}
                onMoreOrder={() => handleMoreOrder(booking)}
              />
            )
          })}
        </div>
      ) : (
        <div className='flex flex-col'>
          <ErrorResult />
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
      />

      <EditBookingDialog
        booking={selectedBooking}
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleEditSave}
      />
    </>
  )
}
