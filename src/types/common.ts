export type Category = {
  id: string
  name: string
  code: string
  description: string
  inactive: boolean
}
export type Menu = {
  id: string
  menuName: string
  description: string
  inactive: boolean
  sortOrder: number
  imageUrl: string
}

export type Users = {
  id: string
  userName: string
  email: string
  phone: any
}

export type TableItem = {
  id: string
  name: string
  maxCapacity: number
  status: string
  isAvailable: boolean
  areaName: string
}

export type CouponItem = {
  id: string
  couponCode: string
  discountPercent: number
  discountAmount: number
  quantity: number
  inactive: boolean
}

export type BookingItem = {
  id: string
  peopleCount: number
  status: string
  notes: string
  bookingDate: string
  checkinTime: string
  customerId: any
  customerName: string
  phone: string
  tables: Table[]
}

export type Table = {
  tableId: string
  name: string
  areaName: string
}

export type OrderItem = {
  id: string
  bookingId: any
  orderType: number
  orderTypeName: string
  orderStatus: string
  createdDate: string
  shippingDate: string
  customerId: string
  customerName: string
  customerPhone: string
  shippingAddress: string
  deliveryAmount: number
  depositAmount: number
  discountAmount: number
  totalAmount: number
  orderDetails: OrderDetailItem[]
}

export type OrderDetailItem = {
  id: string
  orderId: string
  productId: string
  productName: string
  unitName: string
  price: number
  quantity: number
  totalPrice: number
  createdAt: string
}
