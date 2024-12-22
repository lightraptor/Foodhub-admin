import React, { useEffect, useState } from 'react'
import { getListPayment } from '@/apis/paymentApi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table' // Import Pagination component
import 'tailwindcss/tailwind.css'
import { PaymentItem } from '@/types'
import { formatToVND } from '@/constants/common'
import { Pagination } from '@/components'

export const PaymentListPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Phân trang
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalItems, setTotalItems] = useState<number>(0)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getListPayment({ PageNumber: currentPage, PageSize: pageSize })
      if (!response.success) {
        throw new Error('Failed to fetch payments')
      }
      const data = await response.data
      setPayments(data.items)
      setTotalItems(data.totalRecord || 0) // Lấy tổng số mục từ API
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset về trang đầu tiên khi thay đổi pageSize
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize]) // Gọi lại API khi currentPage hoặc pageSize thay đổi

  return (
    <div className='p-6 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Payment List</h1>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500'></div>
        </div>
      ) : (
        <>
          <div className='overflow-x-auto'>
            <Table className='w-full border border-gray-200 shadow-lg rounded-lg bg-white'>
              <TableHeader>
                <TableRow className='bg-gray-200'>
                  <TableHead className='py-3 px-6 text-gray-700'>ID</TableHead>
                  <TableHead className='py-3 px-6 text-gray-700'>Content</TableHead>
                  <TableHead className='py-3 px-6 text-gray-700'>Currency</TableHead>
                  <TableHead className='py-3 px-6 text-gray-700'>Description</TableHead>
                  <TableHead className='py-3 px-6 text-gray-700'>Amount</TableHead>
                  <TableHead className='py-3 px-6 text-gray-700'>Date</TableHead>
                  <TableHead className='py-3 px-6 text-gray-700'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className='hover:bg-gray-50 transition duration-150 ease-in-out'>
                    <TableCell className='py-2 px-6'>{payment.id}</TableCell>
                    <TableCell className='py-2 px-6'>{payment.paymentContent}</TableCell>
                    <TableCell className='py-2 px-6'>{payment.paymentCurrency}</TableCell>
                    <TableCell className='py-2 px-6'>{payment.paymentDes}</TableCell>
                    <TableCell className='py-2 px-6'>{formatToVND(Number(payment.requiredAmount))}</TableCell>
                    <TableCell className='py-2 px-6'>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell
                      className={`py-2 px-6 ${
                        payment.paymentStatus === 'Completed' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {payment.paymentStatus}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </>
      )}
    </div>
  )
}

export default PaymentListPage
