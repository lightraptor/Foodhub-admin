import { Link, useSearchParams } from 'react-router-dom'
import check from '@/assets/check.png'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { changeStatusOrder } from '@/apis/orderApi'

export const PaymentPage = () => {
  const [searchParams] = useSearchParams()
  // const [booking, setBooking] = useState<BookingItem | null>()
  // const [orderItems, setOrderItems] = useState<OrderItem | null>()
  // Lấy các giá trị từ query parameters
  const paymentId = searchParams.get('PaymentId')
  const paymentStatus = searchParams.get('PaymentStatus')
  const paymentMessage = searchParams.get('PaymentMessage')
  const paymentDate = searchParams.get('PaymentDate')
  const amount = searchParams.get('Amount')
  const orderId = localStorage.getItem('orderId') || ''

  // const fetchOrderComplete = async () => {
  //   try {
  //     const response = await fetchOrder({
  //       orderId: orderId
  //     })
  //     if (response.success) {
  //       console.log(response.data)
  //       const data = await response.data
  //       setOrderItems(data)
  //     }
  //   } catch (err) {
  //     console.error('Error fetching menu:', err)
  //   }
  // }

  // useEffect(() => {
  //   fetchOrderComplete()
  // }, [orderId])

  const changeStatus = async () => {
    try {
      const response = await changeStatusOrder({
        id: orderId,
        status: 'Completed'
      })
      if (response.success) {
        console.log(response.message)
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  useEffect(() => {
    if (paymentStatus === '00') {
      changeStatus()
    }
  }, [paymentStatus])

  return (
    <>
      <div className='container mx-auto flex flex-col justify-center items-center'>
        <img src={check} alt='check' className='w-24 h-24 mt-10' />
        {paymentStatus === '00' ? (
          <p className='text-2xl font-bold mt-4'>Thanh toán thành công</p>
        ) : (
          <p className='text-2xl font-bold mt-4'>Thanh toán thất bại</p>
        )}
        <p className='text-3xl mt-3 font-bold'>
          {amount
            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount))
            : 'Not available'}
        </p>
        <div className='flex flex-row justify-between items-center w-1/2 mt-3 gap-3'>
          <strong>Date</strong>
          <p>{decodeURIComponent(paymentDate!)}</p>
        </div>
        <div className='flex flex-row justify-between items-center w-1/2 mt-3 gap-3'>
          <strong>Payment ID</strong>
          <p>{paymentId}</p>
        </div>
        <div className='flex flex-row justify-between items-center w-1/2 mt-3 gap-3'>
          <strong>Message:</strong>
          <p>{decodeURIComponent(paymentMessage!)}</p>
        </div>
        <Link to={'/booking'}>
          <Button className='mt-10 bg-[#0765ff] text-[#fff]'>Back to Booking</Button>
        </Link>
      </div>
    </>
  )
}
