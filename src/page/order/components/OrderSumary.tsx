import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatToVND } from '@/constants/common'
import { OrderItem } from '@/types'
import { OrderPayment } from './OrderPayment'
import { Button } from '@/components/ui/button'
import { SelectedItems } from '../NewOrderPage'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface OrderSummaryProps {
  orderItems: OrderItem
  totalItems: SelectedItems[]
  selectedItems: SelectedItems[]
  onIncrease: (item: SelectedItems) => void
  onDecrease: (item: SelectedItems) => void
  onRemove: (item: SelectedItems) => void
  onSave: (item: SelectedItems[]) => void
}

export default function OrderSummary({
  orderItems,
  totalItems,
  selectedItems,
  onIncrease,
  onDecrease,
  onRemove,
  onSave
}: OrderSummaryProps) {
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
          {orderItems.orderDetails.length > 0 && (
            <>
              {orderItems.orderDetails.map((item) => (
                <li key={item.id} className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <span>
                      {item.productName} x <span className='text-sm font-extralight'>{item.quantity}</span>
                    </span>
                    <span className='text-xs text-gray-400'>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className='mr-2 font-semibold'>{formatToVND(item.price * item.quantity)}</span>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
        {selectedItems.length > 0 && (
          <ul className='space-y-4 mt-6'>
            {orderItems.orderDetails.length > 0 ? <p>Danh sách chọn thêm</p> : <p>Danh sách món ăn</p>}
            {selectedItems.map((item) => (
              <li key={item.id} className='flex justify-between items-center'>
                <span>{item.name}</span>
                <div className='flex items-center'>
                  <span className='mr-2 font-semibold'>{formatToVND(item.price * item.quantity)}</span>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-full'
                    onClick={() => onDecrease(item)}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <span className='mx-2'>{item.quantity}</span>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-full'
                    onClick={() => onIncrease(item)}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-full ml-2'
                    onClick={() => onRemove(item)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className='flex flex-col'>
        <div className='flex flex-row justify-end'>
          <p className='font-semibold mt-2 text-2xl'>
            Tổng cộng: {formatToVND(totalItems?.reduce((total, item) => total + item.price * item.quantity, 0))}
          </p>
        </div>
        <div className='flex flex-row mt-3'>
          {selectedItems.length > 0 && (
            <Button
              className='bg-[#48c229] hover:bg-[#48c229]/9 text-[#fff] mx-3'
              onClick={() => onSave(selectedItems)}
            >
              Lưu lại
            </Button>
          )}
          <OrderPayment orderItems={orderItems} />
          <Button
            className='ml-2 border-[#0765ff] border hover:bg-white bg-white text-[#0765ff]'
            onClick={() => window.history.back()}
          >
            Quay lại
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
