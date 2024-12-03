import { useEffect, useState } from 'react'
import { changeStatusBooking, deleteBooking, editBooking, fetchBooking } from '@/apis'
import { BookingItem } from '@/types'
import { BookingCard } from './components/BookingCard'
import { Pagination } from '@/components'
import { useNavigate } from 'react-router'
import { EditBookingDialog } from './components'
import { toast } from 'react-toastify'
import DeleteBookingDialog from './components/DeleteBookingDialog'
import ErrorResult from '@/components/error-result/ErrorResult'
import { Button } from '@/components/ui/button'

export const BookingPage = () => {
  const [bookingList, setBookingList] = useState<BookingItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<string>('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const openDeleteDialog = (id: string) => {
    setBookingToDelete(id)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setBookingToDelete('')
    fetchData()
  }

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
      console.log(data?.items)
      setTotalItems(data?.totalRecord || undefined)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const handleEdit = (booking: BookingItem) => {
    setSelectedBooking(booking)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedBooking(null)
  }

  const handleEditSave = async (updatedBooking: BookingItem) => {
    // TODO: Implement logic to save updated booking
    console.log('Updated Booking:', updatedBooking)

    try {
      const response = await editBooking({ ...updatedBooking })
      if (response.success) {
        toast.success('Booking updated successfully', { autoClose: 2000 })
        fetchData()
      } else {
        throw new Error('Failed to update booking')
      }
    } catch (error) {
      console.error('Error updating booking:', error)
    }
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }

  const handleStatus = async (id: string, status: string) => {
    console.log(`Accepted booking with ID: ${id}`)
    // Implement accept booking logic
    try {
      const response = await changeStatusBooking({ bookingId: id, status: status })
      if (response.success) {
        fetchData()
      } else {
        throw new Error('Failed to change status')
      }
    } catch (error) {
      console.error('Error changing status:', error)
    }
  }

  const handleViewDetails = (booking: BookingItem) => {
    navigate(`/booking/${booking.id}`)
  }

  const handleChangeTable = (id: string) => {
    console.log(`Changing table for booking ID: ${id}`)
    // Implement change table logic
    navigate(`/change-table/${id}`)
  }

  const handleDelete = async (id: string) => {
    console.log(`Deleting booking with ID: ${id}`)
    try {
      const response = await deleteBooking({ id })
      if (response) {
        toast.success('Booking deleted successfully', { autoClose: 2000 })
        setBookingList((prevList) => prevList.filter((item) => item.id !== id)) // Xóa cục bộ
        await fetchData()
      } else {
        await fetchData()
        throw new Error('Failed to delete booking')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }
  // Implement delete booking logic

  if (loading) return <p className='text-center text-lg'>Loading...</p>

  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Booking Management</p>
      <Button className='mx-10 bg-[#3b82f6] text-[#fff] hover:bg-[#3b82ff]' onClick={() => navigate('/new-booking')}>
        Create Booking
      </Button>
      {bookingList && bookingList.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-10'>
          {bookingList.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAccept={() => handleStatus(booking.id, 'Accept')}
              onComplete={() => handleStatus(booking.id, 'Complete')}
              onCancel={() => handleStatus(booking.id, 'Cancel')}
              onViewDetails={() => handleViewDetails(booking)}
              onChangeTable={() => handleChangeTable(booking.id)}
              onEdit={() => handleEdit(booking)}
              onDelete={() => openDeleteDialog(booking.id)}
            />
          ))}
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
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <EditBookingDialog
        booking={selectedBooking}
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleEditSave}
      />

      <DeleteBookingDialog
        bookingId={bookingToDelete}
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onSave={handleDelete}
      />
    </>
  )
}