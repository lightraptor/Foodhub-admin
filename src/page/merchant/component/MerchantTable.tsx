import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { MerchantItem } from '@/types'
//import { EditMerchantButton } from './EditMerchantButton'
// import { DeleteMerchantButton } from './DeleteMerchantButton'
import ErrorResult from '@/components/error-result/ErrorResult'
import { Switch } from '@/components/ui/switch'
import { EditMerchantButton } from './EditMerchantButton'
import { DeleteMerchantButton } from './DeleteMerchantButton'

type MerchantTableProps = {
  merchants: MerchantItem[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export default function MerchantTable({
  merchants,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: MerchantTableProps) {
  return (
    <div className='container mx-auto py-10'>
      <Table className='mx-1'>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead className=''>Merchant Name</TableHead>
            <TableHead>Merchant Return URL</TableHead>
            <TableHead className=''>Active</TableHead>
            <TableHead className=''>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchants && merchants.length > 0 ? (
            merchants.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                <TableCell className='font-medium'>{item.merchantName}</TableCell>
                <TableCell>{item.merchantReturnUrl}</TableCell>
                <TableCell className=''>
                  <Switch checked={item.isActive} />
                </TableCell>
                <TableCell className=''>
                  <EditMerchantButton merchant={item} fetchData={fetchData} />
                  <DeleteMerchantButton merchant={item} fetchData={fetchData} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className='h-24 text-xl text-center'>
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
