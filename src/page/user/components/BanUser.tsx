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
import { putBanUser } from '@/apis'
import { Users } from '@/types'

interface BanUserButtonProps {
  user: Users
  fetchData: () => Promise<void>
}

export function BanUser({ user, fetchData }: BanUserButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleBanUser = async () => {
    setIsDeleting(true)
    try {
      const response = await putBanUser({ id: user.id })
      if (!response) {
        throw new Error('Failed to ban user')
      }
      fetchData()
      toast(`${user.userName} has been successfully banned.`, {
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
        <span className='sr-only'>Ban {user.userName}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>Bạn có chắc chắn muốn cấm người dung "{user.userName}"?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpen(false)} disabled={isDeleting}>
              Hủy
            </Button>
            <Button variant='destructive' onClick={handleBanUser} disabled={isDeleting}>
              {isDeleting ? 'Đang cấm...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
