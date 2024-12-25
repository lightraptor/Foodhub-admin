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
import { addCategory } from '@/apis'

interface Props {
  fetchData: () => Promise<void>
}

export default function AddCategoryButton({ fetchData }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [inactive, setInactive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const newCategory = { name, code, description, inactive }
    console.log(newCategory)
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      setError('Access token is missing')
      return
    }
    // Xử lý logic thêm mới category ở đây
    try {
      setLoading(true)
      setError(null)

      const response = await addCategory(newCategory)

      if (!response.success) {
        throw new Error('Failed to add new category')
      }

      const data = await response.data
      console.log('New category added:', data)

      // Đóng modal và reset form
      setOpen(false)
      setName('')
      setCode('')
      setDescription('')
      setInactive(false)
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
        <Button className='text-white'>Thêm danh mục</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm mới Danh mục</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mới danh mục. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name'>Tên</Label>
              <Input id='name' value={name} onChange={(e) => setName(e.target.value)} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='code'>Mã</Label>
              <Input id='code' value={code} onChange={(e) => setCode(e.target.value)} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description'>Mô tả</Label>
              <Input
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='flex items-center space-x-2 gap-8'>
              <Label htmlFor='inactive'>Trạng thái</Label>
              <Switch id='inactive' checked={inactive} onCheckedChange={setInactive} />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' className='text-white' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
            {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
