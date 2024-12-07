import { fetchFilterProduct, fetchProduct } from '@/apis'
import { Pagination } from '@/components'
import { ProductItem } from '@/page/product'
import { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import { FilterOrderList } from './FilterOrderList'

interface OrderListProps {
  addToOrder: (item: ProductItem) => void
}

export const OrderList = ({ addToOrder }: OrderListProps) => {
  const [orderList, setOrderList] = useState<ProductItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [isFiltered, setIsFiltered] = useState(false)
  const [filterOrderList, setFilterOrderList] = useState<ProductItem[]>([])
  // disable

  const [filters, setFilters] = useState({})

  const applyFilter = async (newFilters: {
    SearchText?: string
    PriceFrom?: number
    PriceTo?: number
    CategoryId?: string
    MenuId?: string
    PageNumber?: number
  }) => {
    setFilters(newFilters) // Lưu bộ lọc hiện tại
    setCurrentPage(1) // Reset về trang đầu tiên
    try {
      const response = await fetchFilterProduct({
        Inactive: true,
        ...newFilters,
        PageNumber: 1,
        PageSize: pageSize
      })
      if (response && response.success) {
        const data = await response.data
        if (data.items.length > 0) {
          setFilterOrderList(data.items)
          setTotalItems(data.totalRecord) // Cập nhật tổng số sản phẩm
        } else {
          setFilterOrderList([])
        }
        setIsFiltered(true)
      } else {
        setFilterOrderList([])
        setIsFiltered(true)
      }
    } catch (err) {
      console.error('Error fetching filtered products:', err)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (isFiltered) {
      applyFilter({ ...filters, PageNumber: page })
    } else {
      fetchData()
    }
  }

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

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }

  return (
    <>
      <FilterOrderList onApplyFilter={applyFilter} />
      <h2 className='text-xl font-semibold'>All Products:</h2>
      <div className='container mx-auto'>
        <div className='w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {isFiltered
              ? filterOrderList.map((item) => (
                  <FoodCard key={item.id} item={item} onAddToCart={() => addToOrder(item)} />
                ))
              : orderList.map((item) => <FoodCard key={item.id} item={item} onAddToCart={() => addToOrder(item)} />)}
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
