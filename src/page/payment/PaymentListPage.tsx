import React, { useEffect, useState } from 'react'
import { getListPayment } from '@/apis/paymentApi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components' // Import Pagination component
import 'tailwindcss/tailwind.css'
import { PaymentItem } from '@/types'
import { formatDateToDDMMYYYY, formatToVND } from '@/constants/common'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

export const PaymentListPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Phân trang
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalItems, setTotalItems] = useState<number>(0)

  // Lọc theo ngày
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  // Trạng thái hiển thị dialog và chi tiết payment
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const formattedFromDate = fromDate ? formatDateToDDMMYYYY(fromDate) : undefined
      const formattedToDate = toDate ? formatDateToDDMMYYYY(toDate) : undefined
      const response = await getListPayment({
        PageNumber: currentPage,
        PageSize: pageSize,
        From: formattedFromDate,
        To: formattedToDate
      })
      if (!response.success || response.message === 'No record available') {
        setPayments([])
        setTotalItems(0)
      } else {
        const data = await response.data
        setPayments(data.items)
        setTotalItems(data.totalRecord || 0)
      }
    } catch (error) {
      console.error(error)
      setPayments([])
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleFilter = () => {
    setCurrentPage(1)
    fetchData()
  }

  const handleDetailClick = (payment: PaymentItem) => {
    setSelectedPayment(payment)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  return (
    <div className='p-6 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Danh sách thanh toán</h1>

      {/* Bộ lọc */}
      <div className='mb-6 flex flex-col md:flex-row items-center gap-4'>
        <div className='flex items-center gap-2'>
          <label htmlFor='fromDate' className='text-gray-700'>
            Từ ngày:
          </label>
          <input
            type='date'
            id='fromDate'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label htmlFor='toDate' className='text-gray-700'>
            Đến ngày:
          </label>
          <input
            type='date'
            id='toDate'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2'
          />
        </div>
        <button
          onClick={handleFilter}
          className='bg-blue-500 text-[#fff] px-4 py-2 rounded-lg hover:bg-blue-600 transition'
        >
          Lọc danh sách
        </button>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500'></div>
        </div>
      ) : (
        <>
          {payments.length === 0 ? (
            <div className='flex justify-center items-center h-64 text-gray-500'>No result found.</div>
          ) : (
            <>
              <div className='overflow-x-auto'>
                <Table className='w-full border border-gray-200 shadow-lg rounded-lg bg-white'>
                  <TableHeader>
                    <TableRow className='bg-gray-200'>
                      <TableHead className='py-3 px-6 text-gray-700'>Giá tiền</TableHead>
                      <TableHead className='py-3 px-6 text-gray-700'>Mô tả</TableHead>
                      <TableHead className='py-3 px-6 text-gray-700'>Ngày thanh toán</TableHead>
                      <TableHead className='py-3 px-6 text-gray-700'>Trạng thái</TableHead>
                      <TableHead className='py-3 px-6 text-gray-700'>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id} className='hover:bg-gray-50 transition duration-150 ease-in-out'>
                        <TableCell className='py-2 px-6'>{formatToVND(Number(payment.requiredAmount))}</TableCell>
                        <TableCell className='py-2 px-6'>{payment.paymentDes}</TableCell>
                        <TableCell className='py-2 px-6'>
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          className={`py-2 px-6 ${
                            payment.paymentStatus === 'Completed' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {payment.paymentStatus}
                        </TableCell>
                        <TableCell className='py-2 px-6'>
                          <Button
                            className='bg-blue-600 text-[#fff] hover:bg-blue-700'
                            onClick={() => handleDetailClick(payment)}
                          >
                            Chi tiết
                          </Button>
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
        </>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-[400px]'>
          <DialogHeader>
            <DialogTitle className='text-center'>Payment Detail</DialogTitle>
            <DialogDescription>
              {selectedPayment ? (
                <div className='space-y-2'>
                  <p>
                    <strong>Id:</strong> {selectedPayment.id}
                  </p>
                  <p>
                    <strong>Amount:</strong> {formatToVND(Number(selectedPayment.requiredAmount))}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedPayment.paymentDes}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(selectedPayment.paymentDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`py-2 px-6 ${
                        selectedPayment.paymentStatus === 'Completed' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {selectedPayment.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Content:</strong> {selectedPayment.paymentContent}
                  </p>
                </div>
              ) : (
                <p>No detail available</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PaymentListPage
