import { useEffect, useState } from 'react'
import CategoryTable from './components/CategoryTable'
import AddCategoryButton from './components/AddCategoryButton'
import { fetchCategory } from '@/apis'
import { Category } from '@/types'

export const CategoryPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [categories, setCategories] = useState<Category[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchCategory({
        PageNumber: currentPage,
        PageSize: pageSize
      })
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.data
      setCategories(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (error) {
      console.error('Error fetching categories:', error)
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
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Category</p>
      <div className='flex justify-end mx-10 mb-5'>
        <AddCategoryButton fetchData={fetchData} />
      </div>
      <CategoryTable
        categories={categories}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        fetchData={fetchData}
      />
    </>
  )
}
