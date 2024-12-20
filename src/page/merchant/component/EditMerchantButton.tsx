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
import { toast } from 'react-toastify'
import { updateMerchant } from '@/apis'
import { MerchantItem } from '@/types'
import { Edit } from 'lucide-react'

interface EditMerchantButtonProps {
  merchant: MerchantItem
  fetchData: () => Promise<void>
}

export function EditMerchantButton({ merchant, fetchData }: EditMerchantButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editedMerchant, setEditedMerchant] = useState({
    id: merchant.id,
    merchantName: merchant.merchantName,
    merchantWebLink: merchant.merchantWebLink,
    merchantIpnUrl: merchant.merchantIpnUrl,
    merchantReturnUrl: merchant.merchantReturnUrl,
    secretKey: merchant.secretKey
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await updateMerchant(editedMerchant)
      if (response.success) {
        toast.success('Cập nhật merchant thành công!')
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
          <span className='sr-only'>Edit {merchant.merchantName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Merchant</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin merchant. Nhấn lưu để cập nhật.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantName' className='text-right'>
                Tên Merchant
              </Label>
              <Input
                id='merchantName'
                value={editedMerchant.merchantName}
                onChange={(e) => setEditedMerchant({ ...editedMerchant, merchantName: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantWebLink' className='text-right'>
                Merchant Web Link
              </Label>
              <Input
                id='merchantWebLink'
                value={editedMerchant.merchantWebLink}
                onChange={(e) => setEditedMerchant({ ...editedMerchant, merchantWebLink: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantIpnUrl' className='text-right'>
                Merchant IPN URL
              </Label>
              <Input
                id='merchantIpnUrl'
                value={editedMerchant.merchantIpnUrl}
                onChange={(e) => setEditedMerchant({ ...editedMerchant, merchantIpnUrl: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantReturnUrl' className='text-right'>
                Merchant Return URL
              </Label>
              <Input
                id='merchantReturnUrl'
                value={editedMerchant.merchantReturnUrl}
                onChange={(e) => setEditedMerchant({ ...editedMerchant, merchantReturnUrl: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='secretKey' className='text-right'>
                Secret Key
              </Label>
              <Input
                id='secretKey'
                value={editedMerchant.secretKey}
                onChange={(e) => setEditedMerchant({ ...editedMerchant, secretKey: e.target.value })}
                className='col-span-3'
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
