import { MENU } from 'defines'
import { Link } from 'react-router-dom'

export const AboutPage = () => {
  return (
    <>
      <p>About</p>
      <Link to={MENU.Home}>Home page</Link>
    </>
  )
}
