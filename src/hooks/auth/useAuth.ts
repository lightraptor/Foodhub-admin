import { api } from 'apis/api'
import { jwtDecode } from 'jwt-decode'
import { AuthenApis } from 'apis/authentication'
import { ROUTES, STORAGE } from 'defines'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { FormLogin, FormRegister } from 'types'
import { userActions } from 'store/user'
import { toast } from 'react-toastify'

export const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = async (params: FormLogin) => {
    // call api to set
    try {
      const res = await AuthenApis.doLoginRequest(params)
      const token = `Bearer ${res?.data?.accessToken}`
      localStorage.setItem(STORAGE.ACCESS_TOKEN, token)
      api.setToken(res?.data?.accessToken)
      dispatch(userActions.setAccessToken(res?.data?.accessToken))
      const decoded: any = jwtDecode(res?.data?.accessToken)
      localStorage.setItem('user', decoded?.email)
      localStorage.setItem('role', decoded?.role)

      localStorage.setItem(STORAGE.REFRESH_TOKEN, res?.data?.refreshToken)
      toast.success(res?.data?.message, { autoClose: 3000 })
      navigate(ROUTES.Home)
    } catch (error: any) {
      //console.error('Login error:', error)
      toast.error(error?.response?.data, { autoClose: 3000 })
    }
  }

  const signup = async (params: FormRegister) => {
    try {
      const res = await AuthenApis.doRegisterRequest(params)

      if (res?.data?.success) {
        toast.success(res?.data?.message, { autoClose: 3000 })
        //console.log('Registration successful:', res?.data?.message)
        navigate(ROUTES.Login)
      } else {
        console.error('Registration failed:', res?.data?.message)
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error?.response?.data, { autoClose: 3000 })
    }
  }

  const logout = () => {
    api.removeToken()
    localStorage.removeItem(STORAGE.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE.REFRESH_TOKEN)
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    navigate(ROUTES.Login)
    dispatch(userActions.clearToken())
  }
  return {
    login,
    signup,
    logout
  }
}
