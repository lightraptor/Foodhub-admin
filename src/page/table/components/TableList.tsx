import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination } from '@/components'
import { TableItem } from '@/types'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { putTableStatus } from '@/apis'
import { toast } from 'react-toastify'
import { EditTable } from './EditTable'
import { DeleteTable } from './DeleteTable'
import ErrorResult from '@/components/error-result/ErrorResult'

type TableListProps = {
  tableList: TableItem[]
  currentPage: number
  pageSize: number
  totalItems: number | undefined
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  fetchData: () => Promise<void>
}

export default function TableList({
  tableList,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  fetchData
}: TableListProps) {
  const handleStatusChange = async (tableId: string, status: string, oldStatus: string) => {
    if (oldStatus === 'Có thể đặt bàn') oldStatus = 'Free'
    else if (oldStatus === 'Bàn đã được khách đặt trước') oldStatus = 'Reverved'
    else if (oldStatus === 'Bàn đăng có khách ngồi') oldStatus = 'Occupied'
    else if (oldStatus === 'Khác') oldStatus = 'Other'
    try {
      if (oldStatus === status) return
      const response = await putTableStatus({ tableId, status })
      if (response.success) {
        toast.success(response.message, { autoClose: 2000 })
        await fetchData?.()
      } else toast.error(response.message, { autoClose: 2000 })
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className='container mx-auto py-10'>
      <Table className='mx-auto w-[95%]'>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên bàn</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Số người</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableList && tableList.length > 0 ? (
            tableList.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.areaName}</TableCell>
                <TableCell>{item.maxCapacity}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Badge
                        className={`border-${
                          item.status == 'Có thể đặt bàn'
                            ? '[#008000]'
                            : item.status == 'Bàn đã được khách đặt trước'
                              ? '[#db3944]'
                              : item.status == 'Bàn đăng có khách ngồi'
                                ? '[#ddaf0b]'
                                : item.status == 'Khác'
                                  ? '[#1eb00db]'
                                  : '[#000]'
                        } text-${
                          item.status == 'Có thể đặt bàn'
                            ? '[#008000]'
                            : item.status == 'Bàn đã được khách đặt trước'
                              ? '[#db3944]'
                              : item.status == 'Bàn đăng có khách ngồi'
                                ? '[#ddaf0b]'
                                : item.status == 'Khác'
                                  ? '[#1eb00db]'
                                  : '[#000]'
                        }`}
                        variant='outline'
                      >
                        {item.status}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Free', item.status)}>
                        Có thể đặt bàn
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Reverved', item.status)}>
                        Bàn đã được khách đặt trước
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Occupied', item.status)}>
                        Bàn đang có khách ngồi
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'Other', item.status)}>
                        Khác
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  {item.isAvailable ? (
                    <Badge className='border-[#008000] text-[#008000]' variant='outline'>
                      On
                    </Badge>
                  ) : (
                    <Badge className='border-[#ff0000] text-[#ff0000]' variant='outline'>
                      Off
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <EditTable tableItem={item} fetchData={fetchData} />
                  <DeleteTable tableItem={item} fetchData={fetchData} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className='h-24 text-xl text-center'>
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
