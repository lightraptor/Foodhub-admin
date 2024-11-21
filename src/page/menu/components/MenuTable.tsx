import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Pagination } from '@/components'
import { fetchMenu } from '@/apis'
import { Menu } from '@/types'
import { EditMenuButton } from './EditMenuButton'
import { DeleteMenuButton } from './DeleteMenuButton'

export default function MenuTable() {
  const [menu, setMenu] = useState<Menu[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetchMenu({
        PageNumber: currentPage,
        PageSize: pageSize
      })
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.data
      setMenu(data?.items || [])
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

  const isNextDisabled = menu.length < pageSize

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
    <div className='container mx-auto py-10'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead className='w-[200px]'>Menu Name</TableHead>
            <TableHead>Soft Order</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-center'>Inactive</TableHead>
            <TableHead className='text-right'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menu.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={item.imageUrl} alt={item.menuName} className='h-10 w-10 rounded-full' />
              </TableCell>
              <TableCell className='font-medium'>{item.menuName}</TableCell>
              <TableCell>{item.sortOrder}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className='text-center'>
                <Switch checked={item.inactive} />
              </TableCell>
              <TableCell className='text-right'>
                <EditMenuButton menu={item} fetchData={fetchData} />
                <DeleteMenuButton menu={item} fetchData={fetchData} />
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
        isNextDisabled={isNextDisabled}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
