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
import { toast } from 'react-toastify'
import { updateCoupon } from '@/apis'
import { CouponItem } from '@/types'
import { Edit } from 'lucide-react'

interface EditCouponProps {
  coupon: CouponItem
  fetchData: () => Promise<void>
}

export function EditCoupon({ coupon, fetchData }: EditCouponProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editedCoupon, setEditedCoupon] = useState({
    id: coupon.id,
    couponCode: coupon.couponCode,
    discountPercent: coupon.discountPercent,
    discountAmount: coupon.discountAmount,
    quantity: coupon.quantity,
    inactive: coupon.inactive
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      id: editedCoupon.id,
      couponCode: editedCoupon.couponCode,
      discountPercent: editedCoupon.discountPercent,
      discountAmount: editedCoupon.discountAmount,
      quantity: editedCoupon.quantity,
      inactive: editedCoupon.inactive
    }
    console.log(payload)
    try {
      const response = await updateCoupon(payload)
      if (response.success) {
        toast.success('Cập nhật coupon thành công!', { autoClose: 1000 })
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
          <span className='sr-only'>Edit {coupon.couponCode}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Coupon</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin coupon. Nhấn lưu để cập nhật.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='couponCode'>Mã coupon</Label>
              <Input
                id='couponCode'
                value={editedCoupon.couponCode}
                onChange={(e) => setEditedCoupon({ ...editedCoupon, couponCode: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='discountPercent'>Phần trăm giảm giá</Label>
              <Input
                id='discountPercent'
                value={editedCoupon.discountPercent}
                onChange={(e) => setEditedCoupon({ ...editedCoupon, discountPercent: parseInt(e.target.value) })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='discountAmount'>Phần trăm giá trị</Label>
              <Input
                id='discountAmount'
                type='number'
                value={editedCoupon.discountAmount}
                onChange={(e) => setEditedCoupon({ ...editedCoupon, discountAmount: parseInt(e.target.value) })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='quantity'>Số lượng</Label>
              <Input
                id='quantity'
                type='number'
                value={editedCoupon.quantity}
                onChange={(e) => setEditedCoupon({ ...editedCoupon, quantity: parseInt(e.target.value) })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center space-x-2'>
              <Label htmlFor='inactive'>Trạng thái</Label>
              <Switch
                id='inactive'
                checked={editedCoupon.inactive}
                onCheckedChange={(checked) => setEditedCoupon({ ...editedCoupon, inactive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={loading}>
              Hủy
            </Button>
            <Button className='text-white' type='submit' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
          {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
