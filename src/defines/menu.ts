import {
  Home,
  LayoutGrid,
  ListOrderedIcon,
  ShoppingBasket,
  ShoppingCart,
  SquareMenu,
  TicketPercent,
  Users,
  Utensils
} from 'lucide-react'

export const AUTHENTICATION_MENUS = {
  Home: { path: '/', label: 'Trang chủ', icon: Home },
  Booking: { path: '/booking', label: 'Đặt bàn', icon: ListOrderedIcon },
  Order: { path: '/order', label: 'Đơn hàng', icon: ShoppingCart },
  Coupon: { path: '/coupon', label: 'Mã giảm giá', icon: TicketPercent },
  Category: { path: '/category', label: 'Danh mục', icon: LayoutGrid },
  Menu: { path: '/menu', label: 'Thực đơn', icon: SquareMenu },
  Product: { path: '/product', label: 'Sản phẩm', icon: ShoppingBasket },
  Table: { path: '/table', label: 'Danh sách bàn', icon: Utensils },
  Users: { path: '/users', label: 'Thành viên', icon: Users },
  Payment: { path: '/payment', label: 'Danh sách thanh toán', icon: ShoppingBasket }
}

export const UN_AUTHENTICATION_MENUS = {
  Login: { path: '/login', label: 'Login' }
}
