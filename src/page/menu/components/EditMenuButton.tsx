import { useRef, useState } from 'react'
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
import { updateMenu } from '@/apis'
import { Menu } from '@/types'
import { Edit } from 'lucide-react'
import { ButtonInputFile } from '@/components/button-input-file/ButtonInputFile'

interface EditMenuButtonProps {
  menu: Menu
  fetchData: () => Promise<void>
}

export function EditMenuButton({ menu, fetchData }: EditMenuButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [File, setFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [editedMenu, setEditedMenu] = useState({
    Id: menu.id,
    MenuName: menu.menuName,
    SortOrder: menu.sortOrder,
    description: menu.description,
    inactive: menu.inactive,
    imageUrl: menu.imageUrl
  })

  const handleFileSelect = (file: File) => {
    setFile(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    setPreviewImage(null) // Xóa preview
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Xóa tên file trong input
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      Id: editedMenu.Id,
      MenuName: editedMenu.MenuName,
      SortOrder: editedMenu.SortOrder,
      Description: editedMenu.description,
      Inactive: editedMenu.inactive,
      File: File as File | undefined
    }
    console.log(payload)
    try {
      const response = await updateMenu(payload)
      if (response.success) {
        toast.success('Cập nhật menu thành công!')
        setOpen(false)
        fetchData()
      }
    } catch (err) {
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
          <span className='sr-only'>Edit {menu.menuName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Menu</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin menu. Nhấn lưu để cập nhật.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='menuName'>Tên Menu</Label>
              <Input
                id='menuName'
                value={editedMenu.MenuName}
                onChange={(e) => setEditedMenu({ ...editedMenu, MenuName: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description'>Mô tả</Label>
              <Input
                id='description'
                value={editedMenu.description}
                onChange={(e) => setEditedMenu({ ...editedMenu, description: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='sortOrder'>Thứ tự</Label>
              <Input
                id='sortOrder'
                type='number'
                value={editedMenu.SortOrder}
                onChange={(e) => setEditedMenu({ ...editedMenu, SortOrder: parseInt(e.target.value) })}
                className='col-span-3'
              />
            </div>
            <div className='flex flex-row gap-4'>
              <Label htmlFor='imageFile' className='col-span-1'>
                Hình ảnh
              </Label>
              <div className=' view-img flex flex-col'>
                <ButtonInputFile onFileSelect={handleFileSelect} buttonText='Thay thế hình' />
                {previewImage ? (
                  <div className='w-full flex justify-center items-center mt-6'>
                    <div className='relative group w-full max-w-xs'>
                      <img src={previewImage} alt='Preview' className='w-full h-auto max-w-xs rounded border' />
                      <button
                        onClick={handleRemoveImage}
                        className='absolute top-2 right-2 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex justify-center items-center mt-6'>
                    <div className='relative group w-full max-w-xs'>
                      {editedMenu.imageUrl !== '' || editedMenu.imageUrl === null ? (
                        <img
                          src={editedMenu.imageUrl}
                          alt='Preview'
                          className='w-full h-auto max-w-xs rounded border'
                        />
                      ) : (
                        <>
                          <p>hình đại diện hiện trống</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='grid grid-cols-4 items-center space-x-2'>
              <Label htmlFor='inactive'>Trạng thái</Label>
              <Switch
                id='inactive'
                checked={editedMenu.inactive}
                onCheckedChange={(checked) => setEditedMenu({ ...editedMenu, inactive: checked })}
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
