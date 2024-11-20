import { AUTHENTICATION_ROUTES, ROUTES, STORAGE, UN_AUTHENTICATION_ROUTES } from '@/defines'
import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const checkingAuth = (obj: Record<string, { path: string }>, str: string): boolean => {
  return Object.values(obj).some((item) => item.path === str)
}

const Container = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN)
  useEffect(() => {
    const stayInAuth = checkingAuth(AUTHENTICATION_ROUTES, location.pathname)
    const unStayInAuth = checkingAuth(UN_AUTHENTICATION_ROUTES, location.pathname)
    if (access_token && unStayInAuth) {
      navigate(ROUTES.Home.path)
      return
    }
    if (!access_token && stayInAuth) {
      navigate(ROUTES.Login.path)
    }
  }, [access_token])
  return <>{children}</>
}

export const useRouteRender = (node: ReactNode) => {
  return <Container>{node}</Container>
}
