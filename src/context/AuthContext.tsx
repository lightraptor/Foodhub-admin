import { useAuth } from '@/hooks'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    return !!localStorage.getItem('accessToken')
  })

  const { checkAndRefreshToken } = useAuth()

  useEffect(() => {
    checkAndRefreshToken()
  }, [checkAndRefreshToken])

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
