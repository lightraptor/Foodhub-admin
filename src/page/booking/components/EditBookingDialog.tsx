// components/BookingEditDialog.tsx
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { BookingItem } from '@/types'
import DateTimePickerInput from '@/components/date-time-picker-form/date-time-picker-input'

type BookingEditDialogProps = {
  booking: BookingItem | null
  open: boolean
  onClose: () => void
  onSave: (updatedBooking: BookingItem) => void
}

export const EditBookingDialog: React.FC<BookingEditDialogProps> = ({ booking, open, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<BookingItem>>({})

  React.useEffect(() => {
    if (booking) {
      setFormData({
        customerName: booking.customerName,
        checkinTime: booking.checkinTime,
        peopleCount: booking.peopleCount,
        status: booking.status,
        notes: booking.notes
      })
    }
  }, [booking])

  const handleChange = (field: keyof BookingItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const updatedBooking = { ...booking, ...formData } as BookingItem
    onSave(updatedBooking)
    onClose()
  }

  const handleCloseDialog = () => {
    setFormData({}) // Reset formData về trạng thái ban đầu
    onClose() // Gọi hàm onClose để đóng dialog
  }
  if (!booking) return null

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className='max-w-md mx-auto'>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogDescription>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>Customer Name</label>
              <input
                type='text'
                value={formData.customerName || ''}
                onChange={(e) => handleChange('customerName', e.target.value)}
                className='w-full px-3 py-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Checkin Time</label>
              <DateTimePickerInput
                value={formData.checkinTime}
                onChange={(value) => handleChange('checkinTime', value)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium'>People Count</label>
              <input
                type='number'
                value={formData.peopleCount || ''}
                onChange={(e) => handleChange('peopleCount', parseInt(e.target.value))}
                className='w-full px-3 py-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                className='w-full px-3 py-2 border rounded'
              />
            </div>
          </div>
        </DialogDescription>
        <div className='flex justify-end mt-4 space-x-2'>
          <button onClick={handleCloseDialog} className='px-4 py-2 bg-gray-200 rounded'>
            Cancel
          </button>
          <button onClick={handleSubmit} className='px-4 py-2 bg-blue-500 text-white rounded'>
            Savex
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
