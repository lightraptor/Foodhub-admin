import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { Users } from '@/types'
import { Button } from '@/components/ui/button'
import { Ban } from 'lucide-react'

type MenuTableProps = {
  user: Users[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData?: () => Promise<void>
}

export default function UserTable({
  user,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange
}: MenuTableProps) {
  console.log(user)
  return (
    <div className='container mx-auto py-10'>
      <Table className='mx-3'>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên tài khoản</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.roleName}</TableCell>
              <TableCell>
                <Button className='bg-primary'>
                  <Ban className='w-4 h-4' /> Cấm
                </Button>
                <Button className='btn btn-danger ml-1'>Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
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
