import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { DeleteCategoryButton } from './DeleteCategoryButton'
import { EditCategoryButton } from './EditCategoryButton'
import { toast } from 'react-toastify'
import { Pagination } from '@/components'
import { fetchCategory } from '@/apis'

export type Category = {
  id: string
  name: string
  code: string
  description: string
  inactive: boolean
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)

  useEffect(() => {
    fetchCategories()
  }, [currentPage, pageSize])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
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
      toast('Failed to load categories. Please refresh the page.', {
        type: 'error',
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to the first page when pageSize changes
  }

  if (isLoading) {
    return <div>Loading categories...</div>
  }

  return (
    <div className='container mx-auto py-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Category Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-center'>Inactive</TableHead>
            <TableHead className='text-right'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium'>{category.name}</TableCell>
              <TableCell>{category.code}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className='text-center'>
                <Switch checked={category.inactive} />
              </TableCell>
              <TableCell className='text-right'>
                <EditCategoryButton category={category} fetchData={fetchCategories} />
                <DeleteCategoryButton category={category} fetchData={fetchCategories} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
