import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, ShoppingBag, User, Phone, Calendar } from 'lucide-react'
import { OrderItem } from '@/types'

interface OrderCardProps {
  order: OrderItem
  onViewDetails: (id: string) => void
  onUpdateStatus: (id: string, status: string) => void
  onDeleteOrder: (id: string) => void
}

export function OrderCard({ order, onViewDetails, onUpdateStatus, onDeleteOrder }: OrderCardProps) {
  return (
    <Card className='w-full max-w-md hover:shadow-lg transition-shadow duration-300'>
      <CardContent className='p-6'>
        <div className='flex justify-between items-center mb-4'>
          {order.orderStatus === 'Pending' && (
            <Badge className='text-[#facc15] border-[#facc15]'>{order.orderStatus}</Badge>
          )}
          {order.orderStatus === 'Processing' && (
            <Badge className='text-[#22c55e] border-[#22c55e]'>{order.orderStatus}</Badge>
          )}
          {order.orderStatus === 'Completed' && (
            <Badge className='text-[#3b82f6] border-[#3b82f6]'>{order.orderStatus}</Badge>
          )}
          {order.orderStatus === 'Cancel' && (
            <Badge className='text-[#ef4444] border-[#ef4444]'>{order.orderStatus}</Badge>
          )}
          {order.orderStatus === 'Fail' && (
            <Badge className='text-[#f8b4b4] border-[#f8b4b4]'>{order.orderStatus}</Badge>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {order.orderStatus === 'Pending' && (
              <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'Completed')}>
                Hoàn thành đơn hàng
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'Cancelled')}>Hủy đơn hàng</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteOrder(order.id)}>Xóa đơn hàng</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
