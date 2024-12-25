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
import { addTable } from '@/apis'
import { Label } from '@/components/ui/label'
import { toast } from 'react-toastify'

interface Props {
  fetchData: () => Promise<void>
}

export default function AddTable({ fetchData }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [maxCapacity, setMaxCapacity] = useState(0)
  const [areaName, setAreaName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = {
      name: name,
      maxCapacity: maxCapacity,
      areaName: areaName
    }
    // Kiểm tra dữ liệu trong formData
    try {
      setLoading(true)
      setError(null)

      const response = await addTable(formData)
      toast.success('Thêm table thành công', { autoClose: 1000 })
      if (!response.success) {
        toast.error('Thêm table không thành công')
        throw new Error('Failed to add new menu')
      }

      const data = await response.data
      console.log('New menu added:', data)

      // Đóng modal và reset form
      setOpen(false)
      setName('')
      setMaxCapacity(0)
      setAreaName('')
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='text-white'>Thêm mới bàn</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm mới bàn</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mới bàn ăn. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name'>Tên bàn</Label>
              <Input id='name' value={name} onChange={(e) => setName(e.target.value)} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxCapacity'>Số người</Label>
              <Input
                type='number'
                id='maxCapacity'
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(Number(e.target.value))}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='areaName'>Khu vực</Label>
              <Input
                id='areaName'
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
            {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
