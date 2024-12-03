import { fetchOrder } from '@/apis/orderApi'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { OrderItem } from '@/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

type OrderDetailParams = {
  id: string
}

export const OrderDetailPage = () => {
  const { id } = useParams<OrderDetailParams>()
  const [orders, setOrders] = useState<OrderItem | null>(null)

  const fetchData = async (id: string) => {
    try {
      const response = await fetchOrder({ orderId: id })
      if (response.success) {
        console.log(response.data)
        const data = await response.data
        setOrders(data || [])
      }
    } catch (err) {
      console.error('Error fetching menu:', err)
    }
  }

  useEffect(() => {
    fetchData(id || '')
  }, [id])
  if (!orders) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='container mx-auto py-8 px-4'>
        <Link to='/order'>
          <Button className='bg-[#0765ff] hover:bg-[#0765ff]/90 my-3'>Quay lại</Button>
        </Link>
        <Card className='shadow-md'>
          <CardHeader>
            <h1 className='text-xl font-bold text-[#1f2937] text-center'>Chi tiết đơn hàng</h1>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <div>
                  <h2 className='text-lg font-semibold'>Thông tin khách hàng</h2>
                  <p className='text-[#4b5563]'>Tên: {orders.customerName}</p>
                  <p className='text-[#4b5563]'>Số điện thoại: {orders.customerPhone}</p>
                </div>
                <div>
                  <h2 className='text-lg font-semibold'>Trạng thái đơn</h2>
                  {orders.orderStatus === 'Pending' && (
                    <Badge className='text-[#facc15] border-[#facc15]'>{orders.orderStatus}</Badge>
                  )}
                  {orders.orderStatus === 'Processing' && (
                    <Badge className='text-[#22c55e] border-[#22c55e]'>{orders.orderStatus}</Badge>
                  )}
                  {orders.orderStatus === 'Completed' && (
                    <Badge className='text-[#3b82f6] border-[#3b82f6]'>{orders.orderStatus}</Badge>
                  )}
                  {orders.orderStatus === 'Cancel' && (
                    <Badge className='text-[#ef4444] border-[#ef4444]'>{orders.orderStatus}</Badge>
                  )}
                  {orders.orderStatus === 'Fail' && (
                    <Badge className='text-[#f8b4b4] border-[#f8b4b4]'>{orders.orderStatus}</Badge>
                  )}
                </div>
              </div>
              <Separator />

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <p className='text-[#4b5563]'>Loại đơn hàng:</p>
                  <p className='font-medium'>{orders.orderTypeName}</p>
                </div>
                <div>
                  <p className='text-[#4b5563]'>Ngày tạo:</p>
                  <p className='font-medium'>{new Date(orders.createdDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className='text-[#4b5563]'>Tổng tiền:</p>
                  <p className='text-lg font-bold text-[#16a34a]'>{orders.totalAmount.toLocaleString()} VND</p>
                </div>
              </div>

              <Separator />

              <h2 className='text-lg font-semibold'>Chi tiết sản phẩm</h2>
              <div className='space-y-4'>
                {orders.orderDetails.map((item) => (
                  <div key={item.id} className='flex justify-between items-center border-b py-2'>
                    <div>
                      <p className='font-medium text-[#1f2937]'>{item.productName}</p>
                      <p className='text-sm text-[#6b7280]'>
                        {item.unitName} x {item.quantity} - {item.price.toLocaleString()} VND
                      </p>
                    </div>
                    <p className='text-lg font-semibold text-[#374151]'>{item.totalPrice.toLocaleString()} VND</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
