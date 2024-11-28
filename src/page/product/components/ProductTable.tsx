'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { Badge } from '@/components/ui/badge'
import { formatToVND } from '@/constants/common'
import { EditProduct } from './EditProduct'
import { DeleteProduct } from './DeleteProduct'
import ErrorResult from '@/components/error-result/ErrorResult'

export interface ProductItem {
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

interface MenuDto {
  id: string
  menuName: string
  description: string
}

interface CategoryDto {
  id: string
  code: string
  name: string
  description: string
}

interface DataTableProps {
  data: ProductItem[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export function ProductTable({
  data,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: DataTableProps) {
  return (
    <div className='container mx-auto py-10'>
      <Table className='mx-1'>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead className='w-[200px]'>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className='text-center'>Inactive</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell className='font-medium flex gap-3 items-center'>
                  <img src={item.thumbnail} alt={item.name} className='h-12 w-12 rounded-md' />
                  {item.name}
                </TableCell>
                <TableCell>{formatToVND(item.price)}</TableCell>
                <TableCell>{item.unitName}</TableCell>
                <TableCell className='text-center'>
                  {item.inactive ? (
                    <Badge className='border-[#008000] text-[#008000]' variant='default'>
                      Available
                    </Badge>
                  ) : (
                    <Badge className='border-[#ff0000] text-[#ff0000]' variant='default'>
                      Unavailable
                    </Badge>
                  )}
                </TableCell>
                <TableCell className='text-right'>
                  <EditProduct product={item} fetchData={fetchData} />
                  <DeleteProduct product={item} fetchData={fetchData} />
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
