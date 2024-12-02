import { fetchProduct } from '@/apis'
import { Pagination } from '@/components'
import { ProductItem } from '@/page/product'
import { useEffect, useState } from 'react'
import FoodCard from './FoodCard'

interface OrderListProps {
  addToOrder: (productId: string, quantity: number) => void
}

export const OrderList = ({ addToOrder }: OrderListProps) => {
  const [orderList, setOrderList] = useState<ProductItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)

  const fetchData = async () => {
    try {
      const response = await fetchProduct({
        PageNumber: currentPage,
        PageSize: pageSize
      })
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch categories')
      }
      const data = await response.data
      setOrderList(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
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

  return (
    <>
      <div className='container mx-auto'>
        <div className='w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {orderList.map((item) => (
              <FoodCard key={item.id} item={item} onAddToCart={(quantity) => addToOrder(item.id, quantity)} />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </>
  )
}
