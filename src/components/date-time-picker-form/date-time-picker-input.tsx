import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { TimePicker } from './time-picker'

type DateTimePickerInputProps = {
  value?: string // ISO string
  onChange: (value: string) => void
}

const DateTimePickerInput = ({ value, onChange }: DateTimePickerInputProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(value)

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return
    const newDate = format(date, "yyyy-MM-dd'T'HH:mm:ssXXX") // Giữ múi giờ
    setInternalValue(newDate)
    onChange(newDate)
  }

  const handleTimeChange = (date: Date | undefined) => {
    if (!date) return
    const newDate = format(date, "yyyy-MM-dd'T'HH:mm:ssXXX") // Giữ múi giờ
    setInternalValue(newDate)
    onChange(newDate)
  }

  return (
    <div className='flex flex-col items-start'>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'w-[300px] flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer',
              !internalValue && 'text-muted-foreground border-dashed'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {internalValue
              ? format(parseISO(internalValue), 'PPP HH:mm:ss')
              : typeof value === 'string'
                ? format(parseISO(value), 'PPP HH:mm:ss')
                : 'No value'}
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={internalValue ? parseISO(internalValue) : undefined}
            onSelect={handleDateChange}
            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            initialFocus
          />
          <div className='p-3 border-t border-border'>
            <TimePicker date={internalValue ? parseISO(internalValue) : undefined} setDate={handleTimeChange} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateTimePickerInput
