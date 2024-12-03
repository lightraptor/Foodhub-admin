import { Button } from '@/components/ui/button'
import { TableItem } from '@/types'

interface Table {
  tableId: string
  name: string
  areaName: string
}

interface Booking {
  id: string
  peopleCount: number
  status: string
  notes: string
  bookingDate: string
  checkinTime: string
  customerId: string | null
  customerName: string
  phone: string
  tables: Table[]
}

interface BookingInfoProps {
  booking: Booking
  selectedTables: TableItem[]
  onSubmit: () => void
}

export default function BookingInfo({ booking, selectedTables, onSubmit }: BookingInfoProps) {
  return (
    <div className='space-y-4'>
      <h2 className='text-xl sm:text-2xl font-bold'>Thông tin đặt bàn</h2>
      <p>
        <strong>Khách hàng:</strong> {booking.customerName}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {booking.phone}
      </p>
      <p>
        <strong>Số người:</strong> {booking.peopleCount}
      </p>
      <p>
        <strong>Ngày:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Giờ:</strong> {new Date(booking.checkinTime).toLocaleTimeString()}
      </p>
      <p>
        <strong>Trạng thái:</strong> {booking.status}
      </p>
      <p>
        <strong>Ghi chú:</strong> {booking.notes}
      </p>
      <div>
        <h3 className='font-bold'>Bàn đã chọn:</h3>
        <ul className='list-inside text-sm sm:text-base'>
          {selectedTables.map((table) => (
            <li key={table.id} className='bg-[#dbeafe] text-[#1e40af] w-fit px-3 py-1 rounded-full text-sm my-2'>
              {table.name} - {table.areaName}
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={onSubmit} className='bg-[#0765ff] hover:bg-[#0765ff]/90'>
        Cập nhật đặt bàn
      </Button>
    </div>
  )
}
