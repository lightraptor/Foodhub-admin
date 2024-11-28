import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { Menu } from '@/types'
import { EditMenuButton } from './EditMenuButton'
import { DeleteMenuButton } from './DeleteMenuButton'
import { Switch } from '@/components/ui/switch'
import ErrorResult from '@/components/error-result/ErrorResult'

type MenuTableProps = {
  menu: Menu[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export default function MenuTable({
  menu,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: MenuTableProps) {
  return (
    <div className='container mx-auto py-10'>
      <Table className='mx-1'>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead className='w-[200px]'>Menu Name</TableHead>
            <TableHead>Sort Order</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-center'>Inactive</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menu && menu.length > 0 ? (
            menu.map((item) => (
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
