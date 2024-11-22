import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PaginationProps {
  currentPage: number
  pageSize: number
  totalItems?: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  isNextDisabled: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  isNextDisabled
}) => {
  const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : 1
  const pageSizes = [5, 10, 20, 50]

  const handlePageSizeChange = (value: string) => {
    onPageSizeChange(Number(value))
  }

  return (
    <div className='flex items-center justify-between mt-4'>
      <div>
        <label htmlFor='pageSize' className='mr-2 text-sm font-medium'>
          Items per page:
        </label>
        <Select onValueChange={handlePageSizeChange}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Total Items Display */}
      {totalItems && (
        <div className='text-sm text-gray-600'>
          <span>Total records: {totalItems}</span>
        </div>
      )}

      <div className='flex items-center'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 mx-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300'
        >
          Previous
        </button>
        <span className='mx-2 text-sm font-medium'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled || currentPage === totalPages}
          className='px-3 py-1 mx-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300'
        >
          Next
        </button>
      </div>
    </div>
  )
}
