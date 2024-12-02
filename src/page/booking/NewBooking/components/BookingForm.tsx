import { TableItem } from '@/types'
import { useState } from 'react'

type Props = {
  selectedTables: TableItem[]
  onBook: (formData: any) => void
  onCancel: () => void
}

export default function BookingForm({ selectedTables, onBook, onCancel }: Props) {
  const [formData, setFormData] = useState({
    peopleCount: 0,
    notes: '',
    checkinTime: '',
    customerName: '',
    phone: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onBook(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 min-w-[300px]'>
      <h2 className='text-xl font-bold mb-6'>Thông tin đặt bàn</h2>

      <div>
        <label htmlFor='customerName' className='block text-sm font-medium text-[#374151] mb-1'>
          Tên khách hàng:
        </label>
        <input
          type='text'
          id='customerName'
          name='customerName'
          value={formData.customerName}
          onChange={handleChange}
          required
          className='w-full p-2 border border-[#d1d5db] rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6]'
        />
      </div>

      <div>
        <label htmlFor='phone' className='block text-sm font-medium text-[#374151] mb-1'>
          Số điện thoại:
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          required
          className='w-full p-2 border border-[#d1d5db] rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6]'
        />
      </div>

      <div>
        <label htmlFor='peopleCount' className='block text-sm font-medium text-[#374151] mb-1'>
          Số người:
        </label>
        <input
          type='number'
          id='peopleCount'
          name='peopleCount'
          value={formData.peopleCount}
          onChange={handleChange}
          required
          min='1'
          className='w-full p-2 border border-[#d1d5db] rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6]'
        />
      </div>

      <div>
        <label htmlFor='checkinTime' className='block text-sm font-medium text-[#374151] mb-1'>
          Thời gian check-in:
        </label>
        <input
          type='datetime-local'
          id='checkinTime'
          name='checkinTime'
          value={formData.checkinTime}
          onChange={handleChange}
          required
          className='w-full p-2 border border-[#d1d5db] rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6]'
        />
      </div>

      <div>
        <label htmlFor='notes' className='block text-sm font-medium text-[#374151] mb-1'>
          Ghi chú:
        </label>
        <textarea
          id='notes'
          name='notes'
          value={formData.notes}
          onChange={handleChange}
          className='w-full p-2 border border-[#d1d5db] rounded-md focus:ring-[#3b82f6] focus:border-[#3b82f6]'
          rows={3}
        ></textarea>
      </div>

      <div className='mt-6'>
        <h3 className='font-bold text-lg mb-2'>Bàn đã chọn:</h3>
        <ul className='space-y-1'>
          {selectedTables.map((table) => (
            <li key={table.id} className='bg-[#dbeafe] text-[#1e40af] w-fit px-3 py-1 rounded-full text-sm'>
              {table.name} - {table.areaName}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex justify-between mt-8'>
        <button
          type='submit'
          className='px-6 py-2 bg-[#3b82f6] text-[#ffffff] rounded-md hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2'
        >
          Đặt bàn
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='px-6 py-2 bg-[#d1d5db] text-[#374151] rounded-md hover:bg-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:ring-offset-2'
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
