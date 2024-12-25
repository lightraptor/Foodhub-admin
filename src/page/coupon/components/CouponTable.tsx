import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { CouponItem } from '@/types'
// import { EditMenuButton } from './EditMenuButton'
// import { DeleteMenuButton } from './DeleteMenuButton'
import { Switch } from '@/components/ui/switch'
import ErrorResult from '@/components/error-result/ErrorResult'
import { formatToVND } from '@/constants/common'
import { EditCoupon } from './EditCoupon'
import { DeleteCoupon } from './DeleteCoupon'

type CouponTableProps = {
  coupons: CouponItem[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export default function CouponTable({
  coupons,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: CouponTableProps) {
  return (
    <div className='container mx-auto py-10 px-3'>
      <Table className=''>
        <TableHeader>
          <TableRow>
            <TableHead>Số thứ tự</TableHead>
            <TableHead>Mã giảm</TableHead>
            <TableHead>Giá trị giảm giá</TableHead>
            <TableHead>Phần trăm giảm giá</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons && coupons.length > 0 ? (
            coupons.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index}</TableCell>
                <TableCell className='font-medium'>{item.couponCode}</TableCell>
                <TableCell>{formatToVND(item.discountAmount)}</TableCell>
                <TableCell>{item.discountPercent}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Switch checked={item.inactive} />
                </TableCell>
                <TableCell>
                  <EditCoupon coupon={item} fetchData={fetchData} />
                  <DeleteCoupon coupon={item} fetchData={fetchData} />
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
