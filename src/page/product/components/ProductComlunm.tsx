'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ProductItem } from './ProductTable'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { EditProduct } from './EditProduct'
import { DeleteProduct } from './DeleteProduct'

export const columns = (onRefresh: () => void): ColumnDef<ProductItem>[] => [
  {
    accessorKey: 'name',
    header: 'Product name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      // const amount = row.getValue('amount')
      const amount = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount)
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original

      return (
        <>
          <EditProduct product={product} onClose={onRefresh} fetchData={onRefresh} />
          <DeleteProduct product={product} fetchData={onRefresh} />
        </>
      )
    }
  }
]
