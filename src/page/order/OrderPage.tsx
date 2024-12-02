import { fetchPagingOrder } from '@/apis/orderApi'
import { OrderItem } from '@/types'
import { useEffect, useState } from 'react'
import { OrderCard } from './components/OrderCard'
import { Pagination } from '@/components'

export const OrderPage = () => {
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
  }

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, orderStatus: newStatus } : order)))
  }

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Updates the current page state to the specified page number.
   *
   * @param page - The new page number to set as the current page.
   */
  /******  84dcf72c-98db-4c8d-93cf-926d1fdb8515  *******/
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
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>Danh sách đơn hàng</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
            onDeleteOrder={handleDeleteOrder}
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
