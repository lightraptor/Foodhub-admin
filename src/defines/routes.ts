export const AUTHENTICATION_ROUTES = {
  Home: { path: '/', label: 'Home' },
  Category: { path: '/category', label: 'Category' },
  Menu: { path: '/menu', label: 'Menu' },
  Product: { path: '/product', label: 'Product' },
  Order: { path: '/order', label: 'Order' },
  Table: { path: '/table', label: 'Table' },
  Users: { path: '/users', label: 'Users' },
  Booking: { path: '/booking', detail: (id: string) => `/product/${id}`, label: 'Booking' },
  NewBooking: { path: '/new-booking', label: 'New Booking' },
  ChangeTable: { path: '/change-table', label: 'Change Table' },
  NewOrder: { path: '/new-order', detail: (id: string) => `/new-order/${id}`, label: 'New Order' },
  BookingDetail: { path: '/booking-detail', detail: (id: string) => `/booking-detail/${id}`, label: 'Booking Detail' },
  PaymentConfirm: {
    path: '/payment/confirm',
    label: 'PaymentConfirm'
  },
  Coupon: { path: '/coupon', label: 'Coupon' },
  Merchant: { path: '/merchant', label: 'Merchant' }
}

export const UN_AUTHENTICATION_ROUTES = {
  Login: { path: '/login', label: 'Login' }
}

export const ROUTES = {
  ...AUTHENTICATION_ROUTES,
  ...UN_AUTHENTICATION_ROUTES
}
