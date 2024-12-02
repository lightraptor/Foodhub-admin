import {
  Home,
  LayoutGrid,
  ListOrderedIcon,
  ShoppingBasket,
  ShoppingCart,
  SquareMenu,
  Users,
  Utensils
} from 'lucide-react'

export const AUTHENTICATION_MENUS = {
  Home: { path: '/', label: 'Home', icon: Home },
  Category: { path: '/category', label: 'Category', icon: LayoutGrid },
  Menu: { path: '/menu', label: 'Menu', icon: SquareMenu },
  Product: { path: '/product', label: 'Product', icon: ShoppingBasket },
  Table: { path: '/table', label: 'Table', icon: Utensils },
  Users: { path: '/users', label: 'Users', icon: Users },
  Order: { path: '/order', label: 'Order', icon: ShoppingCart },
  Booking: { path: '/booking', label: 'Booking', icon: ListOrderedIcon }
}

export const UN_AUTHENTICATION_MENUS = {
  Login: { path: '/login', label: 'Login' }
}
