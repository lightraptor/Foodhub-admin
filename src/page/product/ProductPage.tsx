import { useEffect, useState } from 'react'
import { columns, ProductTable } from './components'
import { fetchProduct } from '@/apis'
import AddProduct from './components/AddProduct'
// import { useEffect, useState } from 'react'

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
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchProduct({
        PageNumber: 1,
        PageSize: 10
      })
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.data
      setProduct(data?.items || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <p className='text-center text-lg'>Loading...</p>
  if (error) return <p className='text-center text-lg text-red-500'>Error: {error}</p>
  return (
    <>
      <>
        <p className='text-2xl font-semibold mx-10 text-center my-5'>Product page</p>
        <AddProduct fetchData={fetchData} />
        <div className='container mx-auto py-5'>
          <ProductTable data={product} columns={columns(fetchData)} />
        </div>
      </>
    </>
  )
}
