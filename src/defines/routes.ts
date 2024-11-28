export const AUTHENTICATION_ROUTES = {
  Home: { path: '/', label: 'Home' },
  Category: { path: '/category', label: 'Category' },
  Menu: { path: '/menu', label: 'Menu' },
  Product: { path: '/product', label: 'Product' },
  Order: { path: '/order', label: 'Order' },
  Table: { path: '/table', label: 'Table' },
  Users: { path: '/users', label: 'Users' }
}

export const UN_AUTHENTICATION_ROUTES = {
  Login: { path: '/login', label: 'Login' }
}

export const ROUTES = {
  ...AUTHENTICATION_ROUTES,
  ...UN_AUTHENTICATION_ROUTES
}
