import { useAuth } from '@/hooks'

export const HomePage = () => {
  const { logout } = useAuth()
  return (
    <>
      <p>Home</p>

      <button onClick={logout} type='button'>
        Logout
      </button>
    </>
  )
}
