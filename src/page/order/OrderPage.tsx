import { changeStatusOrder, fetchPagingOrder } from '@/apis/orderApi'
import { OrderItem } from '@/types'
import { useEffect, useState } from 'react'
import { OrderCard } from './components/OrderCard'
import { Pagination } from '@/components'
import { useNavigate } from 'react-router'

export const OrderPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)

      const response = await fetchPagingOrder({ PageNumber: page, PageSize: size })
      if (!response.success) {
        throw new Error('Failed to fetch menu')
      }
      const data = response.data
      console.log(data)
      setOrders(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching menu:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for order: ${id}`)
    // Implement view details logic here
    navigate(`/order/${id}`)
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    console.log(`Updating status for order: ${id} to ${newStatus}`)
    // Implement update status logic here
    const response = await changeStatusOrder({ id, status: newStatus })
    if (response.success) {
      fetchData()
    }
  }

  const handlePaymentOrder = (id: string) => {
    navigate(`/new-order/${id}`)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }

  if (loading) return <p className='text-center text-lg'>Loading...</p>

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl text-center font-bold mb-6 text-gray-800'>Danh sách đơn hàng</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
            onPaymentOrder={handlePaymentOrder}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
