import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-toastify'
import { updateTable } from '@/apis'
import { TableItem } from '@/types'
import { Edit } from 'lucide-react'

interface EditMenuButtonProps {
  tableItem: TableItem
  fetchData: () => Promise<void>
}

export function EditTable({ tableItem, fetchData }: EditMenuButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editedTable, setEditedTable] = useState({
    id: tableItem.id,
    name: tableItem.name,
    maxCapacity: tableItem.maxCapacity,
    isAvailable: tableItem.isAvailable,
    areaName: tableItem.areaName
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      id: editedTable.id,
      name: editedTable.name,
      maxCapacity: editedTable.maxCapacity,
      isAvailable: editedTable.isAvailable,
      areaName: editedTable.areaName
    }
    try {
      const response = await updateTable(payload)
      if (response.success) {
        toast.success('Cập nhật table thành công!', { autoClose: 1700 })
        setOpen(false)
        fetchData()
      }
    } catch (err) {
      toast.error('Cập nhật table không thành công!', { autoClose: 1700 })
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Edit className='h-4 w-4' />
          <span className='sr-only'>Edit {tableItem.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa bàn</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin bàn ăn. Nhấn lưu để cập nhật.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name'>Tên</Label>
              <Input
                id='name'
                value={editedTable.name}
                onChange={(e) => setEditedTable({ ...editedTable, name: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxCapacity'>Số người</Label>
              <Input
                id='maxCapacity'
                value={editedTable.maxCapacity}
                onChange={(e) => setEditedTable({ ...editedTable, maxCapacity: Number(e.target.value) })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='areaName'>Khu vực</Label>
              <Input
                id='areaName'
                value={editedTable.areaName}
                onChange={(e) => setEditedTable({ ...editedTable, areaName: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center space-x-2'>
              <Label htmlFor='inactive'>Trạng thái</Label>
              <Switch
                id='inactive'
                checked={editedTable.isAvailable}
                onCheckedChange={(checked) => setEditedTable({ ...editedTable, isAvailable: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={loading}>
              Hủy
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
          {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
