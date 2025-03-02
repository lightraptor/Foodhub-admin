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
  roleName: 'Customer' | 'Staff' | 'Admin'
  isBanned: boolean
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
  isHighlight?: boolean // Add this line
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
  isHighlight?: boolean
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

export interface DashboardData {
  totalUsers: number
  totalOrder: number
  totalRevenueAdmount: ProductsGroupedByCategory[]
  totalRevenue: any[]
  productsGroupedByCategory: ProductsGroupedByCategory[]
  productsGroupedByMenu: ProductsGroupedByMenu[]
}

export interface ProductsGroupedByCategory {
  label: string
  value: number
}

export interface ProductsGroupedByMenu {
  label: string
  value: number
}

export interface Merchant {
  items: MerchantItem[]
  pageNumber: number
  pageSize: number
  totalRecord: number
  pageCount: number
}

export interface MerchantItem {
  id: string
  merchantName: string
  merchantWebLink: string
  merchantIpnUrl: string
  merchantReturnUrl: string
  secretKey: any
  isActive: boolean
}

export interface UserItem {
  email: string
  password: string
  roleName: string
  firstName: string
  lastName: string
  gender: string
  birthday: string
  phoneNumber: string
  address: string
  bank: string
  bankBranch: string
  bankNumber: string
}

export interface PaymentItem {
  id: string
  paymentContent: string
  paymentCurrency: string
  paymentDes: string
  requiredAmount: number
  paymentDate: string
  paymentStatus: string
  paymentLastMessage: any
}
