export const AUTHENTICATION_ROUTES = {
  Home: { path: '/', label: 'Home' },
  //Account: { path: '/account', label: 'Account' },
  Category: { path: '/category', label: 'Category' },
  Menu: { path: '/menu', label: 'Menu' },
  Product: { path: '/product', label: 'Product' },
  Order: { path: '/order', label: 'Order' }
  //Table: { path: '/table', label: 'Table' },
}

export const UN_AUTHENTICATION_ROUTES = {
  Login: { path: '/login', label: 'Login' }
}

export const ROUTES = {
  ...AUTHENTICATION_ROUTES,
  ...UN_AUTHENTICATION_ROUTES
}
