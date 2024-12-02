import { fetchBookingById } from '@/apis'
import { fetchOrderStaff } from '@/apis/orderApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookingItem, OrderItem } from '@/types'
import { formatDate } from 'date-fns'
import React from 'react'
import { useNavigate, useParams } from 'react-router'

type ProductDetailParams = {
  id: string
}
export const BookingDetailPage = () => {
  const navgigate = useNavigate()
  const [booking, setBooking] = React.useState<BookingItem | null>(null)
  const [order, setOrder] = React.useState<OrderItem | null>(null)
  const { id } = useParams<ProductDetailParams>()
  const fetchData = async () => {
    try {
      const response = await fetchBookingById(id ?? '')
      setBooking(response.data)
    } catch (error) {
      console.error('Error fetching menus:', error)
    }
  }

  const fetchOrder = async () => {
    try {
      const response = await fetchOrderStaff({ bookingId: id ?? '' })
      setOrder(response.data)
    } catch (error) {
      console.error('Error fetching menus:', error)
    }
  }
  React.useEffect(() => {
    fetchOrder()
    fetchData()
  }, [id])
  return (
    <div className='mx-auto container'>
      <Button className='bg-[#0765ff] hover:bg-[#0765ff]/90' onClick={() => navgigate(-1)}>
        Return
      </Button>
      <h1 className='text-3xl font-bold my-4 text-center'>Booking Detail</h1>
      {booking && (
        <>
          <div className='mx-auto'>
            <div className='flex flex-row justify-around'>
              <div className='flex flex-col w-1/2'>
                <p className='font-semibold text-xl mb-1'>Customer Name</p>
                <p>{booking.customerName}</p>
              </div>
              <div className='flex flex-col w-1/2'>
                <p className='font-semibold text-xl mb-1'>Phone Number</p>
                <p>{booking.phone}</p>
              </div>
            </div>
            <div className='flex flex-row justify-around my-5'>
              <div className='flex flex-col w-1/2'>
                <p className='font-semibold text-xl mb-1'>People</p>
                <p>{booking.peopleCount}</p>
              </div>
              <div className='flex flex-col w-1/2'>
                <p className='font-semibold text-xl mb-1'>Checkin Time</p>
                <p>
                  {' '}
                  {formatDate(booking.checkinTime, 'HH:mm')} - {formatDate(booking.checkinTime, 'dd/MM/yyyy')}
                </p>
              </div>
            </div>
            <div className='flex flex-row justify-start gap-3 my-5'>
              <p className='font-semibold text-xl mb-1'>Status</p>
              {booking.status === 'Pending' && (
                <Badge className='text-[#facc15] border-[#facc15]'>{booking.status}</Badge>
              )}
              {booking.status === 'Accept' && (
                <Badge className='text-[#22c55e] border-[#22c55e]'>{booking.status}</Badge>
              )}
              {booking.status === 'Complete' && (
                <Badge className='text-[#3b82f6] border-[#3b82f6]'>{booking.status}</Badge>
              )}
              {booking.status === 'Cancel' && (
                <Badge className='text-[#ef4444] border-[#ef4444]'>{booking.status}</Badge>
              )}
              {booking.status === 'Fail' && <Badge className='text-[#f8b4b4] border-[#f8b4b4]'>{booking.status}</Badge>}
            </div>
          </div>
          <div className='p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg'>
            <h1 className='text-2xl font-bold mb-4'>Order Details</h1>
            <div className='bg-white p-4 rounded-lg shadow'>
              <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Order Information</h2>
                <p>
                  <strong>Order Type:</strong> {order?.orderTypeName}
                </p>
                <p>
                  <strong>Status:</strong> {order?.orderStatus}
                </p>
                <p>
                  <strong>Created Date:</strong> {new Date(order?.createdDate as any).toLocaleString()}
                </p>
                <p>
                  <strong>Total Amount:</strong> {order?.totalAmount.toLocaleString()} VND
                </p>
              </div>
              <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Order Items</h2>
                <table className='w-full table-auto border-collapse border border-gray-300'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='border border-gray-300 px-4 py-2'>Product</th>
                      <th className='border border-gray-300 px-4 py-2'>Unit</th>
                      <th className='border border-gray-300 px-4 py-2'>Price</th>
                      <th className='border border-gray-300 px-4 py-2'>Quantity</th>
                      <th className='border border-gray-300 px-4 py-2'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderDetails.map((item) => (
                      <tr key={item.id}>
                        <td className='border border-gray-300 px-4 py-2'>{item.productName}</td>
                        <td className='border border-gray-300 px-4 py-2'>{item.unitName}</td>
                        <td className='border border-gray-300 px-4 py-2'>{item.price.toLocaleString()} VND</td>
                        <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                        <td className='border border-gray-300 px-4 py-2'>{item.totalPrice.toLocaleString()} VND</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
