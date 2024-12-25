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
import { addCoupon } from '@/apis'
import { toast } from 'react-toastify'

interface Props {
  fetchData: () => Promise<void>
}

export default function AddCoupon({ fetchData }: Props) {
  const [open, setOpen] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [quantity, setQuantity] = useState(0) // Giá trị mặc định là 0
  const [inactive, setInactive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = {
      couponCode: couponCode,
      discountPercent: discountPercent,
      discountAmount: discountAmount,
      quantity: quantity,
      inactive: inactive
    }

    console.log('before', formData) // Kiểm tra dữ liệu trong formData
    try {
      setLoading(true)
      setError(null)

      const response = await addCoupon(formData)

      if (!response.success) {
        throw new Error('Failed to add new coupon')
      }

      const data = await response.data
      toast.success('Thêm coupon thành công', { autoClose: 1000 })
      console.log('New coupon added:', data)

      // Đóng modal và reset form
      setOpen(false)
      setCouponCode('')
      setDiscountPercent(0)
      setDiscountAmount(0)
      setQuantity(0)
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
        <Button className='text-white'>Thêm mã giảm giá</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>Thêm mới Coupon</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mới coupon. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='couponCode'>Tên Coupon</Label>
              <Input
                id='couponCode'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='discountPercent'>Phần trăm giảm giá</Label>
              <Input
                id='discountPercent'
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='discountAmount'>Số tiền giảm giá</Label>
              <Input
                id='discountAmount'
                type='number'
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='quantity'>Số lượng</Label>
              <Input
                id='quantity'
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center space-x-2'>
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
