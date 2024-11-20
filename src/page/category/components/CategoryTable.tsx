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

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://192.168.12.210:7143/api/Category/')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      setCategories(data?.data)
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
                <EditCategoryButton category={category} onEdit={handleEdit} />
                <DeleteCategoryButton category={category} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
