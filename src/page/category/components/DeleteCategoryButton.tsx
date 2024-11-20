import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { Category } from './CategoryTable'
import { toast } from 'react-toastify'

interface DeleteCategoryButtonProps {
  category: Category
  onDelete: (id: string) => void
}

export function DeleteCategoryButton({ category, onDelete }: DeleteCategoryButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const accessToken = localStorage.getItem('accessToken')

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`https://192.168.12.210:7143/api/Category/${category.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to delete category')
      }
      onDelete(category.id)
      toast(`${category.name} has been successfully deleted.`, {
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
      console.error('Error deleting category:', error)
      toast('Failed to delete category. Please try again.', {
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
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
        <Trash2 className='h-4 w-4' />
        <span className='sr-only'>Delete {category.name}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>Bạn có chắc chắn muốn xóa category "{category.name}"?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpen(false)} disabled={isDeleting}>
              Hủy
            </Button>
            <Button variant='destructive' onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
