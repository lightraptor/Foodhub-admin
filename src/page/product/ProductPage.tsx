import { useEffect, useState } from 'react'
import { ProductTable } from './components'
import { fetchProduct } from '@/apis'
import AddProduct from './components/AddProduct'
import ImportButton from './components/ImportButton'

interface ProductItem {
  id: string
  code: string
  name: string
  description: string
  price: number
  sellingPrice: number
  unitName: string
  thumbnail: string
  inactive: boolean
  menuDto: MenuDto
  categoryDto: CategoryDto
  productImagesDto: any
}

export interface MenuDto {
  id: string
  menuName: string
  description: string
}

export interface CategoryDto {
  id: string
  code: string
  name: string
  description: string
}

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchProduct({
        PageNumber: currentPage,
        PageSize: pageSize
      })
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch categories')
      }
      const data = await response.data
      setProduct(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
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

  if (loading) return <p className='text-center text-lg'>Loading...</p>

  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Product page</p>
      <div className='flex flex-row justify-end'>
        <AddProduct fetchData={fetchData} />
        <ImportButton fetchData={fetchData} />
      </div>
      <div className='container mx-auto py-5'>
        <ProductTable
          data={product}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          fetchData={fetchData}
        />
      </div>
    </>
  )
}
