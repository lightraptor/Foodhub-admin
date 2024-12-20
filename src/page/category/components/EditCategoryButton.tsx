import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Edit } from 'lucide-react'
import { Category } from './CategoryTable'
import { toast } from 'react-toastify'
import { updateCategory } from '@/apis'

interface EditCategoryButtonProps {
  category: Category
  fetchData: () => Promise<void>
}

export function EditCategoryButton({ category, fetchData }: EditCategoryButtonProps) {
  const [open, setOpen] = useState(false)
  const [editedCategory, setEditedCategory] = useState(category)
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = async () => {
    setIsEditing(true)
    try {
      const response = await updateCategory(editedCategory)
      if (!response.success) {
        throw new Error('Failed to update category')
      }
      fetchData()
      toast(`${editedCategory.name} has been successfully updated.`, {
        type: 'success',
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      console.error('Error updating category:', error)
      toast(`Failed to update category. Please try again.`, {
        type: 'error',
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } finally {
      setIsEditing(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
        <Edit className='h-4 w-4' />
        <span className='sr-only'>Edit {category.name}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Category</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Tên
              </Label>
              <Input
                id='name'
                value={editedCategory.name}
                onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='code' className='text-right'>
                Mã
              </Label>
              <Input
                id='code'
                value={editedCategory.code}
                onChange={(e) => setEditedCategory({ ...editedCategory, code: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Mô tả
              </Label>
              <Input
                id='description'
                value={editedCategory.description}
                onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='flex items-center space-x-2'>
              <Switch
                id='inactive'
                checked={editedCategory.inactive}
                onCheckedChange={(checked) => setEditedCategory({ ...editedCategory, inactive: checked })}
              />
              <Label htmlFor='inactive'>Inactive</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpen(false)} disabled={isEditing}>
              Hủy
            </Button>
            <Button onClick={handleEdit} disabled={isEditing}>
              {isEditing ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
