import { changeStatusOrder, fetchPagingOrder } from '@/apis/orderApi'
import { OrderItem } from '@/types'
import { useContext, useEffect, useState } from 'react'
import { OrderCard } from './components/OrderCard'
import { Pagination } from '@/components'
import { useNavigate } from 'react-router'
import { NotiContext } from '@/context'
import { toast } from 'react-toastify'
import ErrorResult from '@/components/error-result/ErrorResult'

export const OrderPage = () => {
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState<OrderItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [mergedOrders, setMergedOrders] = useState<OrderItem[]>([])

  const notiContext = useContext(NotiContext)

  if (!notiContext) {
    throw new Error('NotiContext is not provided')
  }

  const { orders } = notiContext

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)
      const response = await fetchPagingOrder({ PageNumber: page, PageSize: size })
      if (!response.success) {
        setOrderList([])
        throw new Error('Failed to fetch orders')
      }
      const data = response.data
      setOrderList(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching orders:', err)
      toast.error('Lỗi tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  useEffect(() => {
    const updatedOrders = [...orders.filter((order) => !orderList.some((item) => item.id === order.id)), ...orderList]
    setMergedOrders(updatedOrders)
  }, [orders, orderList])

  const handleViewDetails = (id: string) => {
    navigate(`/order/${id}`)
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await changeStatusOrder({ id, status: newStatus })
      if (response.success) {
        toast.success(`Cập nhật trạng thái đơn hàng thành công`)
        fetchData()
      } else {
        throw new Error('Failed to update order status')
      }
    } catch (err) {
      console.error('Error updating order status:', err)
      toast.error('Lỗi cập nhật trạng thái đơn hàng')
    }
  }

  const handlePaymentOrder = (id: string) => {
    navigate(`/new-order/${id}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }

  if (loading) return <p className='text-center text-lg'>Đang tải...</p>

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl text-center font-bold mb-6 text-gray-800'>Danh sách đơn hàng</h2>
      {mergedOrders.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {mergedOrders.map((order) => {
            const isHighlighted = orders.some((b) => b.id === order.id)
            return (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={() => handleViewDetails(order.id)}
                onUpdateStatus={(newStatus) => handleUpdateStatus(order.id, newStatus)}
                onPaymentOrder={() => handlePaymentOrder(order.id)}
                isHighlight={isHighlighted}
              />
            )
          })}
        </div>
      ) : (
        <div className='flex flex-col'>
          <ErrorResult />
        </div>
      )}
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
