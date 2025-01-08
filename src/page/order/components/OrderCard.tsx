import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  MoreHorizontal,
  ShoppingBag,
  User,
  Phone,
  Calendar,
  ShoppingCart,
  CircleDollarSign,
  CircleCheckBig,
  CircleX
} from 'lucide-react'
import { OrderItem } from '@/types'
import { useNavigate } from 'react-router'
import { useContext, useState } from 'react'
import { NotiContext } from '@/context'

interface OrderCardProps {
  order: OrderItem
  onViewDetails: (id: string) => void
  onUpdateStatus: (id: string, status: string) => void
  onPaymentOrder: (id: string) => void
  isHighlight: boolean
}

export function OrderCard({ order, onViewDetails, onUpdateStatus, onPaymentOrder }: OrderCardProps) {
  const [highlight, setHighlight] = useState<boolean>(order.isHighlight || false)
  const navigate = useNavigate()
  const notiContext = useContext(NotiContext)

  if (!notiContext) {
    throw new Error('BookingContext is not provided')
  }
  const { setOrders } = notiContext

  return (
    <Card
      className='w-full max-w-md hover:shadow-lg transition-shadow duration-300'
      onClick={() => {
        setHighlight(false)
        console.log(highlight)
        setOrders((prev) => prev.map((ord) => (ord.id === order.id ? { ...ord, isHighlight: false } : ord)))
      }}
    >
      <CardContent className='relative p-6'>
        {highlight && (
          <span className='absolute text-xs rounded-full bg-red-500  text-white py-1 px-2 top-0 right-0'>New</span>
        )}
        <div className='flex justify-between items-center mb-4'>
          {order.orderStatus === 'Pending' && (
            <Badge className='text-[#facc15] border-[#facc15] bg-white hover:bg-white'>Chờ xử lý</Badge>
          )}
          {order.orderStatus === 'Processing' && (
            <Badge className='text-[#22c55e] border-[#22c55e] bg-white hover:bg-white'>Đang xử lý</Badge>
          )}
          {order.orderStatus === 'Complete' && (
            <Badge className='text-[#3b82f6] border-[#3b82f6] bg-white hover:bg-white'>Hoàn thành</Badge>
          )}
          {order.orderStatus === 'Completed' && (
            <Badge className='text-[#3b82f6] border-[#3b82f6] bg-white hover:bg-white'>Hoàn thành</Badge>
          )}
          {order.orderStatus === 'Cancel' && (
            <Badge className='text-[#ef4444] border-[#ef4444] bg-white hover:bg-white'>Đã Hủy</Badge>
          )}
          {order.orderStatus === 'Fail' && (
            <Badge className='text-[#f8b4b4] border-[#f8b4b4] bg-white hover:bg-white'>Thất bại</Badge>
          )}
          <span className='text-sm text-gray-500'>ID: {order.id.slice(0, 8)}...</span>
        </div>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <ShoppingBag className='mr-2 h-5 w-5 text-gray-400' />
              <span className='font-semibold'>{order.orderTypeName}</span>
            </div>
            <span className='font-bold text-lg'>{order.totalAmount.toLocaleString('vi-VN')} ₫</span>
          </div>
          <div className='flex items-center'>
            <User className='mr-2 h-5 w-5 text-gray-400' />
            <span>{order.customerName}</span>
          </div>
          <div className='flex items-center'>
            <Phone className='mr-2 h-5 w-5 text-gray-400' />
            <span>{order.customerPhone}</span>
          </div>
          <div className='flex items-center'>
            <Calendar className='mr-2 h-5 w-5 text-gray-400' />
            <span>{new Date(order.createdDate).toLocaleString('vi-VN')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='bg-gray-50 p-4 flex justify-between items-center rounded-b-lg'>
        <Button variant='outline' size='sm' onClick={() => onViewDetails(order.id)}>
          Xem chi tiết
        </Button>
        {(order.orderStatus === 'Pending' || order.orderStatus === 'Processing') && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {order.orderStatus === 'Processing' && (
                <>
                  {/* <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'Complete')}>
                    <Check className='mr-1 h-5 w-5' />
                    Hoàn thành đơn hàng
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => onPaymentOrder(order.id)}>
                    <CircleDollarSign className='mr-1 h-5 w-5' /> Thanh toán đơn hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/new-order/${order.id}`)}>
                    <ShoppingCart className='mr-1 h-5 w-5' />
                    Chọn thêm món
                  </DropdownMenuItem>
                </>
              )}
              {order.orderStatus === 'Pending' && (
                <>
                  <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'Processing')}>
                    <CircleCheckBig className='mr-1 h-5 w-5' />
                    Chấp nhận đơn hàng
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'Cancelled')}>
                    <CircleX className='mr-1 h-5 w-5' />
                    Hủy đơn hàng
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardFooter>
    </Card>
  )
}
