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
import { addMerchant } from '@/apis'
import { toast } from 'react-toastify'

interface Props {
  fetchData: () => Promise<void>
}

export default function AddMerchantButton({ fetchData }: Props) {
  const [open, setOpen] = useState(false)
  const [merchantName, setMerchantName] = useState('')
  const [merchantReturnUrl, setMerchantReturnUrl] = useState('')
  const merchantIpnUrl = 'none'
  const [merchantWebLink, setMerchantWebLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!merchantName || !merchantReturnUrl) {
      setError('Vui lòng điền đầy đủ thông tin!')
      return
    }

    const formData = {
      merchantName,
      merchantReturnUrl,
      merchantIpnUrl,
      merchantWebLink
    }

    try {
      setLoading(true)
      setError(null)

      const response = await addMerchant(formData)

      if (!response.success) {
        throw new Error('Failed to add new merchant')
      }

      const data = await response.data
      console.log('New merchant added:', data)
      toast.success('Thêm merchant thành công', { autoClose: 1000 })

      // Đóng modal và reset form
      setOpen(false)
      setMerchantName('')
      setMerchantReturnUrl('')
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
        <Button className='text-white bg-black'>Add Merchant</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Thêm mới Merchant</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mới merchant. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantName' className='text-right'>
                Merchant Name
              </Label>
              <Input
                id='merchantName'
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantReturnUrl' className='text-right'>
                Merchant Return URL
              </Label>
              <Input
                id='merchantReturnUrl'
                value={merchantReturnUrl}
                onChange={(e) => setMerchantReturnUrl(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='merchantReturnUrl' className='text-right'>
                Merchant Weblink
              </Label>
              <Input
                id='merchantWebLink'
                value={merchantWebLink}
                onChange={(e) => setMerchantWebLink(e.target.value)}
                className='col-span-3'
              />
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
