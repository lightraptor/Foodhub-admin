import { useContext, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  CalendarClock,
  Users,
  Phone,
  User,
  MoreHorizontal,
  Eye,
  TableIcon,
  Edit,
  MapPinCheckInside,
  ShoppingCart
} from 'lucide-react'
import { BookingItem } from '@/types'
import { NotiContext } from '@/context'

interface BookingCardProps {
  booking: BookingItem
  onAccept: (id: string) => void
  onComplete: (booking: BookingItem) => void
  onCancel: (id: string) => void
  onViewDetails: (id: string) => void
  onChangeTable: (id: string) => void
  onEdit: (id: string) => void
  onMoreOrder: (id: string) => void
  onCheckin: (booking: BookingItem) => void
  isHighlight: boolean
  //onDelete: (id: string) => void
}

export function BookingCard({
  booking,
  onAccept,
  onComplete,
  onCancel,
  onViewDetails,
  onChangeTable,
  onMoreOrder,
  onEdit,
  onCheckin
  //onDelete
}: BookingCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlight, setHighlight] = useState<boolean>(booking.isHighlight || false)
  const notiContext = useContext(NotiContext)

  if (!notiContext) {
    throw new Error('BookingContext is not provided')
  }
  const { setBookings } = notiContext

  return (
    <Card
      className={`w-full max-w-md hover:shadow-lg transition-shadow duration-300`}
      onClick={() => {
        setHighlight(false)
        console.log(highlight)
        setBookings((prev) => prev.map((book) => (book.id === booking.id ? { ...book, isHighlight: false } : book)))
      }}
    >
      <CardContent className='p-6 relative'>
        {highlight && (
          <span className='absolute text-xs rounded-full bg-red-500  text-white py-1 px-2 top-0 right-0'>New</span>
        )}

        <div className='flex justify-between items-center mb-4'>
          {booking.status === 'Pending' && (
            <Badge className='text-[#facc15] border-[#facc15] bg-white hover:bg-white'>Chờ xử lý</Badge>
          )}
          {booking.status === 'Accept' && (
            <Badge className='text-[#22c55e] border-[#22c55e] bg-white hover:bg-white'>Chờ nhận bàn</Badge>
          )}
          {booking.status === 'Processing' && (
            <Badge className='text-[#1fafb7] border-[#1fafb7] bg-white hover:bg-white'>Đang phục vụ</Badge>
          )}
          {booking.status === 'Complete' && (
            <Badge className='text-[#3b82f6] border-[#3b82f6] bg-white hover:bg-white'>Hoàn thành</Badge>
          )}
          {booking.status === 'Completed' && (
            <Badge className='text-[#3b82f6] border-[#3b82f6] bg-white hover:bg-white'>Hoàn thành</Badge>
          )}
          {booking.status === 'Cancel' && (
            <Badge className='text-[#ef4444] border-[#ef4444] bg-white hover:bg-white'>Đã hủy</Badge>
          )}
          {booking.status === 'Fail' && (
            <Badge className='text-[#f8b4b4] border-[#f8b4b4] bg-white hover:bg-white'>Thất bại</Badge>
          )}
          <span className='text-sm text-gray-500'>ID: {booking.id.slice(0, 8)}...</span>
        </div>
        <div className='space-y-3'>
          <div className='flex items-center'>
            <User className='mr-2 h-5 w-5 text-gray-400' />
            <span className='font-semibold'>{booking.customerName}</span>
          </div>
          <div className='flex items-center'>
            <Phone className='mr-2 h-5 w-5 text-gray-400' />
            <span>{booking.phone}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Users className='mr-2 h-5 w-5 text-gray-400' />
              <span>{booking.peopleCount} người</span>
            </div>
            <div className='flex items-center'>
              <CalendarClock className='mr-2 h-5 w-5 text-gray-400' />
              <span>{new Date(booking.checkinTime).toLocaleString()}</span>
            </div>
          </div>
          <div className='flex'>
            <MapPinCheckInside className='mr-2 h-5 w-5 text-[#9ca3af]' />
            {booking.tables !== null &&
              booking?.tables.map((table, index) => (
                <span key={index} className='mr-2'>
                  {table.name}
                </span>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className='bg-gray-50 p-4 flex justify-between items-center rounded-b-lg'>
        <Button variant='outline' size='sm' onClick={() => onViewDetails(booking.id)}>
          <Eye className='mr-2 h-4 w-4' />
          Xem chi tiết
        </Button>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {booking.status === 'Pending' && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    onAccept(booking.id)
                    setIsOpen(false)
                  }}
                >
                  Chấp nhận
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onCancel(booking.id)
                    setIsOpen(false)
                  }}
                >
                  Hủy bỏ
                </DropdownMenuItem>
              </>
            )}
            {booking.status === 'Processing' && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    onComplete(booking)
                    setIsOpen(false)
                  }}
                >
                  Hoàn thành
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onMoreOrder(booking.id)
                    setIsOpen(false)
                  }}
                >
                  <ShoppingCart className='mr-2 h-4 w-4' />
                  Chọn thêm món
                </DropdownMenuItem>
              </>
            )}

            {booking.status === 'Accept' && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    onCheckin(booking)
                    setIsOpen(false)
                  }}
                >
                  Khách nhận bàn
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onCancel(booking.id)
                    setIsOpen(false)
                  }}
                >
                  Hủy bỏ
                </DropdownMenuItem>
              </>
            )}
            {['Processing', 'Accept'].includes(booking.status) && (
              <DropdownMenuItem
                onClick={() => {
                  onChangeTable(booking.id)
                  setIsOpen(false)
                }}
              >
                <TableIcon className='mr-2 h-4 w-4' />
                Thay đổi bàn
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                onEdit(booking.id)
                setIsOpen(false)
              }}
            >
              <Edit className='mr-2 h-4 w-4' />
              Chỉnh sửa
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => {
                onDelete(booking.id)
                setIsOpen(false)
              }}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Xóa
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
