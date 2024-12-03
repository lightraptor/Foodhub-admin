'use client'

import { useState, useEffect } from 'react'
import TableList from './TableList'
import BookingInfo from './BookingInfo'
import { TableItem } from '@/types'
import { changeTableBooking, fetchBookingById, fetchGetTable, putTableStatus } from '@/apis'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@/components/ui/button'

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

export const ChangeTablePage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [allTables, setAllTables] = useState<TableItem[]>([])
  const [selectedTables, setSelectedTables] = useState<TableItem[]>([])
  const [selectedTableIds, setSelectedTableIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBookingData()
  }, [])

  useEffect(() => {
    setSelectedTables(allTables.filter((table) => selectedTableIds.includes(table.id)))
  }, [selectedTableIds])
  const handleTableSelect = async (table: TableItem) => {
    if (selectedTables.some((t) => t.id === table.id)) {
      setSelectedTables(selectedTables.filter((t) => t.id !== table.id))
      const response = await putTableStatus({ tableId: table.id, status: 'Free' })
      const data = response.data
      console.log(data)
    } else {
      setSelectedTables([...selectedTables, table])
      const response = await putTableStatus({ tableId: table.id, status: 'Reverved' })
      const dataFalse = response.data
      console.log(dataFalse)
    }
  }

  const fetchBookingData = async () => {
    try {
      setIsLoading(true)
      // Trong ứng dụng thực tế, bạn sẽ gọi API của mình ở đây
      const bookingResponse = await fetchBookingById(id ?? '')
      const tablesResponse = await fetchGetTable({ PageNumber: 1, PageSize: 100 })

      const bookingData = await bookingResponse.data
      const tablesData = await tablesResponse.data

      setBooking(bookingData)
      setAllTables(tablesData.items)
      setSelectedTableIds(bookingData.tables.map((table: Table) => table.tableId))
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Không tìm thấy thông tin đặt bàn')
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    const handleIds = selectedTables.map((table) => table.id)
    try {
      const response = await changeTableBooking({ bookingId: id ?? '', tableIds: handleIds })
      const data = await response.data
      console.log(data)
      fetchBookingData()
    } catch (err) {
      console.error('Error updating booking:', err)
      setError('Không thể cập nhật đặt bàn')
    }
  }
  // try {
  //   // Trong ứng dụng thực tế, bạn sẽ gọi API của mình ở đây
  //   const response = await fetch('/api/updateBooking', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ tableIds: selectedTableIds })
  //   })

  //   if (!response.ok) {
  //     throw new Error('Không thể cập nhật đặt bàn')
  //   }

  //   // Tải lại dữ liệu sau khi cập nhật thành công
  //   await fetchBookingData()
  // } catch (err) {
  //   console.error('Error updating booking:', err)
  //   setError('Đã xảy ra lỗi khi cập nhật đặt bàn')
  // }

  if (isLoading) return <div>Đang tải...</div>
  if (error) return <div>Đã xảy ra lỗi: {error}</div>
  if (!booking) return <div>Không tìm thấy thông tin đặt bàn</div>

  return (
    <>
      <Button onClick={() => navigate('/booking')} className='mb-4 bg-[#0765ff] hover:bg-[#0765ff]/90 text-[#fff]'>
        Quay lại
      </Button>
      <div className='flex flex-col lg:flex-row min-h-screen'>
        <div className='w-full lg:w-2/3 p-4 overflow-y-auto'>
          <TableList selectedTables={selectedTables} onSelectTable={handleTableSelect} />
        </div>
        <div className='w-full lg:w-1/3 p-4 bg-gray-100'>
          <BookingInfo booking={booking} selectedTables={selectedTables} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}
