import { fetchOrder, postOrderDetail } from '@/apis/orderApi'
import { OrderItem } from '@/types'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { OrderList } from './components/OrderList'
import OrderSummary from './components/OrderSumary'
import { ProductItem } from '../product'

export type OrderDetailParams = {
  id: string
}

export type SelectedItems = {
  id: string
  name: string
  price: number
  quantity: number
}

export const NewOrderPage = () => {
  const { id } = useParams<OrderDetailParams>()
  const [loading, setLoading] = React.useState(false)
  const [order, setOrder] = useState<OrderItem>()
  const [selectedItems, setSelectedItems] = useState<SelectedItems[]>([])
  const [totalItems, setTotalItems] = useState<SelectedItems[]>([])
  const fetchData = async () => {
    const orderId = id ?? ''
    try {
      setLoading(true)
      const response = await fetchOrder({ orderId })
      if (!response.success) {
        throw new Error('Failed to fetch bookings')
      }
      const data = response.data
      setOrder(data)
      const dataItems = data.orderDetails.map((item) => {
        return {
          id: item.id,
          name: item.productName,
          price: item.price,
          quantity: item.quantity
        }
      })
      setTotalItems(dataItems)
      console.log(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(totalItems)
  }, [totalItems])

  useEffect(() => {
    const dataItems = order?.orderDetails.map((item) => {
      return {
        id: item.id,
        name: item.productName,
        price: item.price,
        quantity: item.quantity
      }
    })
    setTotalItems([...selectedItems, ...(dataItems || [])])
  }, [selectedItems])

  const addToOrder = (item: ProductItem) => {
    if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) return
    setSelectedItems([...selectedItems, { id: item.id, name: item.name, price: item.price, quantity: 1 }])
  }

  const handleIncrease = (item: SelectedItems) => {
    setSelectedItems(
      selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return { ...selectedItem, quantity: selectedItem.quantity + 1 }
        }
        return selectedItem
      })
    )
  }

  const handleDecrease = (item: SelectedItems) => {
    setSelectedItems(
      selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id && selectedItem.quantity > 1) {
          return { ...selectedItem, quantity: selectedItem.quantity - 1 }
        }
        return selectedItem
      })
    )
  }

  const handleRemove = (item: SelectedItems) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id))
  }

  const handleSave = async (items: SelectedItems[]) => {
    try {
      const responses = await Promise.all(
        items.map((item) =>
          postOrderDetail({
            orderId: id ?? '',
            productId: item.id,
            quantity: item.quantity
          })
        )
      )

      const failedItems = responses.filter((response) => !response.success)
      if (failedItems.length > 0) {
        console.error('Some items failed to save:', failedItems)
        throw new Error(`${failedItems.length} items failed to save.`)
      }
      setSelectedItems([])
      fetchData()
    } catch (error) {
      console.error('Error saving items:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <div>Loading...</div>
  return (
    <>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-2/3'>
          <OrderList addToOrder={addToOrder} />
        </div>
        <div className='w-full md:w-1/3'>
          {order !== undefined && (
            <OrderSummary
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
              orderItems={order}
              totalItems={totalItems}
              selectedItems={selectedItems}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </>
  )
}
