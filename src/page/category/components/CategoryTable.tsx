import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { DeleteCategoryButton } from './DeleteCategoryButton'
import { EditCategoryButton } from './EditCategoryButton'
import { toast } from 'react-toastify'

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
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5) // Kích thước trang cố định
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchCategories()
  }, [pageNumber])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://192.168.12.210:7143/api/Category?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      setCategories(data?.data || [])
      setTotalPages(data?.data?.length / pageSize)
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

  const handleDelete = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  const handleEdit = (editedCategory: Category) => {
    setCategories(categories.map((category) => (category.id === editedCategory.id ? editedCategory : category)))
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }

  const handleNextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1)
  }

  if (isLoading) {
    return <div>Loading categories...</div>
  }

  return (
    <div className='container mx-auto py-10'>
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
                <EditCategoryButton category={category} onEdit={handleEdit} fetchData={fetchCategories} />
                <DeleteCategoryButton category={category} onDelete={handleDelete} fetchData={fetchCategories} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center mt-4'>
        <button
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
          disabled={pageNumber === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
          disabled={pageNumber === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}
