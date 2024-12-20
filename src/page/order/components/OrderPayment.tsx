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
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  const [listMethod, setListMethod] = useState<paymentItem[]>([])
  const [payMentMethod, setPayMentMethod] = useState<string>('')
  const [merchantId, setMerchantId] = useState<string>('')
  const [transferNote, setTransferNote] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchListMethod = async () => {
    try {
      const response = await fetchPaymentDestination()
      const data = response.data
      if (data?.items) setListMethod(data.items)
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      setErrorMessage('Failed to load payment methods.')
    }
  }

  const fetchMerchantId = async () => {
    try {
      const response = await fetchMerchantPaging({ PageNumber: 1, PageSize: 10 })
      const data = response.data
      if (data?.items) {
        const merchant = data.items.find((item) => item.merchantReturnUrl.includes(baseUrl))
        if (merchant) setMerchantId(merchant.id)
      }
    } catch (error) {
      console.error('Error fetching merchant ID:', error)
      setErrorMessage('Failed to load merchant information.')
    }
  }

  useEffect(() => {
    fetchListMethod()
    fetchMerchantId()
  }, [])

  const handlePayment = async () => {
    if (!payMentMethod || !merchantId) {
      setErrorMessage('Please select a payment method and ensure merchant ID is available.')
      return
    }

    setLoading(true)
    setErrorMessage('')
    try {
      localStorage.setItem('orderId', orderItems.id)
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
      const paymentData = response.data
      if (paymentData?.paymentUrl) {
        window.location.href = paymentData.paymentUrl
      } else {
        setErrorMessage('Failed to generate payment URL.')
      }
    } catch (error) {
      console.error('Error during payment processing:', error)
      setErrorMessage('Payment processing failed. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Dialog>
        <DialogTrigger>
          <Button className='bg-[#0765ff] text-[#fff] hover:bg-[#0765ff]/90 px-4 py-2 rounded'>Thanh toán</Button>
        </DialogTrigger>
        <DialogContent className='w-[90%] max-w-md p-6 bg-[#fff] rounded-md'>
          <h2 className='text-lg font-bold mb-4'>Transfer Details</h2>
          {errorMessage && <div className='text-red-500 text-sm mb-4'>{errorMessage}</div>}
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
            className={`bg-[#22c55e] text-[#fff] px-4 py-2 rounded hover:bg-[#22c55e]/90 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
