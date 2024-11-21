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
import { toast } from 'react-toastify'
import { deleteMenu } from '@/apis'
import { Menu } from '@/types'

interface DeleteMenuButtonProps {
  menu: Menu
  fetchData: () => Promise<void>
}

export function DeleteMenuButton({ menu, fetchData }: DeleteMenuButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await deleteMenu(menu.id)
      if (!response) {
        throw new Error('Failed to delete menu')
      }
      fetchData()
      toast(`${menu.menuName} has been successfully deleted.`, {
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
      console.error('Error deleting menu:', error)
      toast('Failed to delete menu. Please try again.', {
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
        <span className='sr-only'>Delete {menu.menuName}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>Bạn có chắc chắn muốn xóa category "{menu.menuName}"?</DialogDescription>
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
