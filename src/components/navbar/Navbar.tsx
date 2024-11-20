import { AUTHENTICATION_ROUTES, ROUTES, STORAGE, UN_AUTHENTICATION_ROUTES } from '@/defines'
import { useAuth } from '@/hooks'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const username = localStorage.getItem('user')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN)

  const handleNavigation = (path: string) => {
    const stayInAuth = Object.values(AUTHENTICATION_ROUTES).some((route) => route.path === path)
    const unStayInAuth = Object.values(UN_AUTHENTICATION_ROUTES).some((route) => route.path === path)

    if (access_token && unStayInAuth) {
      navigate(ROUTES.Home.path) // Điều hướng về Home nếu không cần login
      return
    }
    if (!access_token && stayInAuth) {
      navigate(ROUTES.Login.path) // Điều hướng về Login nếu yêu cầu login
      return
    }
    navigate(path) // Điều hướng đến path nếu hợp lệ
  }

  return (
    <nav className='bg-baseBackground text-primary'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo */}
          <div className='flex items-center'>
            <span className='text-xl font-bold'>Foodhub Admin</span>
          </div>
          {/* Menu for larger screens */}
          <div className='hidden md:flex space-x-6'>
            {Object.values(access_token ? AUTHENTICATION_ROUTES : UN_AUTHENTICATION_ROUTES).map(({ path, label }) => (
              <button key={path} onClick={() => handleNavigation(path)} className='hover:text-base duration-300'>
                {label}
              </button>
            ))}
            {access_token && (
              <>
                <button
                  className='px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700'
                  onClick={logout}
                >
                  Logout
                </button>
                <button>{username}</button>
              </>
            )}
          </div>

          {/* Hamburger menu for smaller screens */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-300 hover:text-white focus:outline-none'
            >
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                {isMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {Object.values(access_token ? AUTHENTICATION_ROUTES : UN_AUTHENTICATION_ROUTES).map(({ path, label }) => (
              <button
                key={path}
                onClick={() => {
                  setIsMenuOpen(false) // Đóng menu trước khi điều hướng
                  handleNavigation(path)
                }}
                className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700'
              >
                {label}
              </button>
            ))}
            {access_token && (
              <>
                <button
                  className='px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700'
                  onClick={logout}
                >
                  Logout
                </button>
                <button>{username}</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
