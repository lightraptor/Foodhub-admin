import { TableItem } from '@/types'
import { useState } from 'react'
import TableSelection from './components/TableSelection'
import BookingForm from './components/BookingForm'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { postBookingStaff, putTableStatus } from '@/apis'
import { postOrderStaff } from '@/apis/orderApi'

export default function NewBookingPage() {
  const [selectedTables, setSelectedTables] = useState<TableItem[]>([])
  const navigate = useNavigate()

  const handleTableSelect = async (table: TableItem) => {
    if (selectedTables.some((t) => t.id === table.id)) {
      setSelectedTables(selectedTables.filter((t) => t.id !== table.id))
      const response = await putTableStatus({ tableId: table.id, status: 'Free' })
      const data = response.data
      console.log(data)
    } else {
      setSelectedTables([...selectedTables, table])
      const response = await putTableStatus({ tableId: table.id, status: 'Occupied' })
      const dataFalse = response.data
      console.log(dataFalse)
    }
  }

  const handleBooking = async (formData: any) => {
    // Here you would typically send this data to your backend
    const handleIds = selectedTables.map((table) => table.id)
    console.log('Booking data:', { ...formData, handleIds: handleIds })
    try {
      // Here you would typically send this data to your backend
      const response = await postBookingStaff({
        ...formData,
        tableIds: handleIds
      })
      const data = await response.data
      const makeOrderId = await postOrderStaff({ BookingId: data.id })
      const orderData = await makeOrderId.data
      console.log(data)
      console.log('orderData', orderData)
      navigate(`/booking`)
    } catch (error) {
      console.error('Error sending booking data:', error)
    }
  }

  const handleCancel = () => {
    console.log('Booking cancelled')
    // Here you would typically redirect to the main booking page
    navigate('/booking')
  }

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='w-full md:w-2/3 p-4 overflow-auto'>
        <h1 className='text-2xl font-bold mb-4'>Chọn bàn</h1>
        <Button className='bg-[#3b82f6] text-[#fff] hover:bg-[#0765ff] my-3' onClick={() => navigate('/booking')}>
          Return
        </Button>
        <TableSelection onSelectTable={handleTableSelect} selectedTables={selectedTables} />
      </div>
      <div className='w-full md:w-1/3 p-4 bg-[#f3f4f6] overflow-auto'>
        <BookingForm selectedTables={selectedTables} onBook={handleBooking} onCancel={handleCancel} />
      </div>
    </div>
  )
}
