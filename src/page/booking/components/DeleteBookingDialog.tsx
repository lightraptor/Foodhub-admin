import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type BookingDelectDialogProps = {
  bookingId: string
  open: boolean
  onClose: () => void
  onSave: (id: string) => void
}

const DeleteBookingDialog = ({ bookingId, open, onClose, onSave }: BookingDelectDialogProps) => {
  const handleDelete = () => {
    onSave(bookingId)
    onClose()
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBookingDialog
