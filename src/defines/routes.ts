export const AUTHENTICATION_ROUTES = {
  Home: '/',
  About: '/about'
}

export const UN_AUTHENTICATION_ROUTES = {
  Login: '/login',
  Register: '/register'
}

export const ROUTES = {
  ...AUTHENTICATION_ROUTES,
  ...UN_AUTHENTICATION_ROUTES
}
