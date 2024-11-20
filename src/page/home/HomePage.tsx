import { MENU } from 'defines'
import { useAuth } from 'hooks'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  const { logout } = useAuth()
  return (
    <>
      <p>Home</p>
      <Link to={MENU.About}>About</Link>
      <button onClick={logout} type='button'>
        Logout
      </button>
    </>
  )
}
