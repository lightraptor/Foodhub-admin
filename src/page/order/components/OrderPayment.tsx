import React, { useEffect, useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OrderItem } from '@/types'
import { fetchMerchantPaging, fetchPaymentDestination, paymentItem } from '@/apis'
import { fetchPayment } from '@/apis/paymentApi'

interface OrderPaymentProps {
  orderItems: OrderItem
}

export const OrderPayment: React.FC<OrderPaymentProps> = ({ orderItems }) => {
  const [listMethod, setListMethod] = React.useState<paymentItem[]>([])
  const [payMentMethod, setPayMentMethod] = React.useState<string>('')
  const [merchantId, setMerchantId] = React.useState<string>('')
  const [transferNote, setTransferNote] = useState<string>('')

  const fetchListMethod = async () => {
    try {
      const response = await fetchPaymentDestination()
      const data = await response.data
      if (!data) return
      setListMethod(data?.items)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchMerchantId = async () => {
    try {
      const response = await fetchMerchantPaging()
      const data = await response.data
      if (!data) return
      setMerchantId(data?.items[0].id)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchListMethod()
    fetchMerchantId()
  }, [])

  const handlePayment = async () => {
    localStorage.setItem('orderId', orderItems.id)
    try {
      const response = await fetchPayment({
        paymentContent: transferNote,
        paymentCurrency: 'VND',
        requiredAmount: orderItems.totalAmount,
        paymentLanguage: 'VN',
        orderId: orderItems.id,
        merchantId: merchantId,
        paymentDestinationId: payMentMethod,
        paymentDesname: listMethod.find((item) => item.id === payMentMethod)?.desName || ''
      })
      const data = await response.data
      const paymentData = await data
      console.log(paymentData)
      window.location.href = paymentData.paymentUrl
      if (!data) return
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Dialog>
        <DialogTrigger>
          <Button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Thanh toán</Button>
        </DialogTrigger>
        <DialogContent className='w-[90%] max-w-md p-6 bg-[#fff] rounded-md'>
          <h2 className='text-lg font-bold mb-4'>Transfer Details</h2>

          {/* Select Transfer Method */}
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Transfer Method</label>
            <Select onValueChange={(value) => setPayMentMethod(value)}>
              <SelectTrigger className='w-full border-gray-300 rounded-md'>
                <SelectValue placeholder='Select transfer method' />
              </SelectTrigger>
              <SelectContent>
                {listMethod.map((item: paymentItem) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.desShortName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Input Transfer Note */}
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Transfer Note</label>
            <Input
              value={transferNote}
              onChange={(e) => setTransferNote(e.target.value)}
              placeholder='Enter transfer details'
              className='w-full border-gray-300 rounded-md'
            />
          </div>

          {/* Submit Button */}
          <Button
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full'
            onClick={handlePayment}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
