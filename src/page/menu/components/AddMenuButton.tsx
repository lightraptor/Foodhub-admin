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
import { addMenu } from '@/apis'

interface Props {
  fetchData: () => Promise<void>
}

export default function AddMenuButton({ fetchData }: Props) {
  const [open, setOpen] = useState(false)
  const [menuName, setMenuName] = useState('')
  const [description, setDescription] = useState('')
  const [sortOrder, setSortOrder] = useState<number>(0) // Giá trị mặc định là 0
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [inactive, setInactive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setImageFile(file)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!imageFile) {
      setError('Hãy chọn một hình ảnh!')
      return
    }

    const formData = {
      MenuName: menuName,
      SoftOrder: sortOrder,
      description: description,
      inactive: inactive,
      File: imageFile
    }

    console.log(formData) // Kiểm tra dữ liệu trong formData

    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      setError('Access token is missing')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await addMenu(formData)

      if (!response.success) {
        throw new Error('Failed to add new menu')
      }

      const data = await response.data
      console.log('New menu added:', data)

      // Đóng modal và reset form
      setOpen(false)
      setMenuName('')
      setDescription('')
      setSortOrder(0)
      setImageFile(null)
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
        <Button className='text-white'>Thêm thực đơn</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm mới Menu</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mới menu. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='menuName'>Tên Menu</Label>
              <Input
                id='menuName'
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                className='col-span-3'
              />
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
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='sortOrder'>Thứ tự</Label>
              <Input
                id='sortOrder'
                type='number'
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='imageFile'>Hình ảnh</Label>
              <Input id='imageFile' type='file' accept='image/*' onChange={handleFileChange} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center space-x-2'>
              <Label htmlFor='inactive'>Trạng thái</Label>
              <Switch id='inactive' checked={inactive} onCheckedChange={setInactive} />
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
