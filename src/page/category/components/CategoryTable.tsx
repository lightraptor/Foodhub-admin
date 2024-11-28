import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { DeleteCategoryButton } from './DeleteCategoryButton'
import { EditCategoryButton } from './EditCategoryButton'
import { Pagination } from '@/components'
import ErrorResult from '@/components/error-result/ErrorResult'

export type Category = {
  id: string
  name: string
  code: string
  description: string
  inactive: boolean
}

type CategoryTableProps = {
  categories: Category[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export default function CategoryTable({
  categories,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: CategoryTableProps) {
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
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell>{category.code}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className='text-center'>
                  <Switch checked={category.inactive} />
                </TableCell>
                <TableCell className='text-right'>
                  <EditCategoryButton category={category} fetchData={fetchData} />
                  <DeleteCategoryButton category={category} fetchData={fetchData} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='h-24 text-xl text-center'>
                <ErrorResult />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
