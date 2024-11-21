import React from 'react'

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

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value))
  }

  return (
    <div className='flex items-center justify-between mt-4'>
      <div>
        <label htmlFor='pageSize' className='mr-2 text-sm font-medium'>
          Items per page:
        </label>
        <select
          id='pageSize'
          value={pageSize}
          onChange={handlePageSizeChange}
          className='px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
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
