import { AUTHENTICATION_ROUTES, ROUTES, STORAGE, UN_AUTHENTICATION_ROUTES } from 'defines'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'

const checkingAuth = (obj: Record<string, string>, str: string): boolean => {
  return Object.values(obj).some((item) => item === str)
}

const Container = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN)
  useEffect(() => {
    const stayInAuth = checkingAuth(AUTHENTICATION_ROUTES, location.pathname)
    const unStayInAuth = checkingAuth(UN_AUTHENTICATION_ROUTES, location.pathname)
    if (access_token && unStayInAuth) {
      navigate(ROUTES.Home)
      return
    }
    if (!access_token && stayInAuth) {
      navigate(ROUTES.Login)
    }
  }, [access_token])
  return <>{children}</>
}

export const useRouteRender = (node: ReactNode) => {
  return <Container>{node}</Container>
}
