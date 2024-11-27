import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PaginationProps {
  currentPage: number
  pageSize: number
  totalItems?: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems = 0,
  onPageChange,
  onPageSizeChange
}) => {
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1) // Tổng số trang
  const pageSizes = [5, 10, 20, 50]

  const handlePageSizeChange = (value: string) => {
    const size = Number(value)
    onPageSizeChange(size)
    onPageChange(1) // Reset về trang đầu khi thay đổi pageSize
  }

  return (
    <div className='flex items-center justify-around mt-4'>
      {/* Select Page Size */}
      <div className='flex items-center'>
        <label htmlFor='pageSize' className='mr-2 text-sm font-medium'>
          Items per page:
        </label>
        <Select onValueChange={handlePageSizeChange}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder={`${pageSize}`} />
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
      <div className='text-sm text-gray-600'>
        <span>
          Total records: <strong>{totalItems}</strong>
        </span>
      </div>

      {/* Pagination Controls */}
      <div className='flex items-center space-x-2'>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 text-sm font-medium text-[#fff] bg-[#3b82f6] rounded hover:bg-[#2563eb] disabled:bg-[#d1d5db] disabled:cursor-not-allowed'
        >
          Previous
        </button>

        {/* Page Buttons */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm font-medium rounded ${
              page === currentPage ? 'bg-[#2563eb] text-[#fff]' : 'bg-[#e5e7eb] text-[#374151] hover:bg-[#d1d5db]'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-1 text-sm font-medium text-[#fff] bg-[#3b82f6] rounded hover:bg-[#2563eb] disabled:bg-[#d1d5db] disabled:cursor-not-allowed'
        >
          Next
        </button>
      </div>
    </div>
  )
}
