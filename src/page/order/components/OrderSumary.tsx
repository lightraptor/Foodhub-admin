import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatToVND } from '@/constants/common'
import { OrderItem } from '@/types'
import { OrderPayment } from './OrderPayment'

interface OrderSummaryProps {
  orderItems: OrderItem
}

export default function OrderSummary({ orderItems }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tóm tắt đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='my-2 flex flex-row justify-between'>
          <p className='font-semibold'>Khách hàng:</p>
          <p className='ml-2'>{orderItems.customerName}</p>
        </div>
        <div className='my-2 flex flex-row justify-between'>
          <p className='font-semibold'>Số điện thoại:</p>
          <p className='ml-2'>{orderItems.customerPhone}</p>
        </div>
        <div className='my-2 flex flex-row justify-between'>
          <p className='font-semibold'>Trạng thái:</p>
          <p className='ml-2'>{orderItems.orderStatus}</p>
        </div>

        {orderItems.orderType === 1 && (
          <div className='my-2 flex flex-row justify-between'>
            <p className='font-semibold'>Loại đơn hàng:</p>
            <p className='ml-2'>phục vụ tại bàn</p>
          </div>
        )}

        {orderItems.orderType === 2 && (
          <div className='my-2 flex flex-row justify-between'>
            <p className='font-semibold'>Loại đơn hàng:</p>
            <p className='ml-2'>mang đi</p>
          </div>
        )}

        <ul className='space-y-4 mt-6'>
          {orderItems.orderDetails.map((item) => (
            <li key={item.id} className='flex justify-between items-center'>
              <span>
                {item.productName} x <span className='text-sm font-extralight'>{item.quantity}</span>
              </span>
              <div>
                <span className='mr-2 font-semibold'>{formatToVND(item.price * item.quantity)}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <div className='flex flex-row justify-end'>
          <p className='font-semibold mt-2 text-2xl'>Tổng cộng: {orderItems.totalAmount.toLocaleString('vi-VN')} ₫</p>
        </div>
        <div className='flex flex-row mt-3'>
          <OrderPayment orderItems={orderItems} />
        </div>
      </CardFooter>
    </Card>
  )
}
