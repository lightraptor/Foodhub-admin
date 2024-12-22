import {
  Home,
  LayoutGrid,
  ListOrderedIcon,
  SettingsIcon,
  ShoppingBasket,
  ShoppingCart,
  SquareMenu,
  TicketPercent,
  Users,
  Utensils
} from 'lucide-react'

export const AUTHENTICATION_MENUS = {
  Home: { path: '/', label: 'Home', icon: Home },
  Booking: { path: '/booking', label: 'Booking', icon: ListOrderedIcon },
  Order: { path: '/order', label: 'Order', icon: ShoppingCart },
  Coupon: { path: '/coupon', label: 'Coupon', icon: TicketPercent },
  Category: { path: '/category', label: 'Category', icon: LayoutGrid },
  Menu: { path: '/menu', label: 'Menu', icon: SquareMenu },
  Product: { path: '/product', label: 'Product', icon: ShoppingBasket },
  Table: { path: '/table', label: 'Table', icon: Utensils },
  Users: { path: '/users', label: 'Users', icon: Users },
  Merchant: { path: '/merchant', label: 'Merchant', icon: SettingsIcon },
  Payment: { path: '/payment', label: 'Payment', icon: ShoppingBasket }
}

export const UN_AUTHENTICATION_MENUS = {
  Login: { path: '/login', label: 'Login' }
}
