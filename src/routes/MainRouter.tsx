import { ROUTES } from 'defines'
import { useRouteRender } from 'hooks'
import { AboutPage, HomePage, LoginPage } from 'page'
import { RegisterPage } from 'page/register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.Home,
      element: useRouteRender(<HomePage />)
    },
    {
      path: ROUTES.About,
      element: useRouteRender(<AboutPage />)
    },
    {
      path: ROUTES.Login,
      element: useRouteRender(<LoginPage />)
    },
    {
      path: ROUTES.Register,
      element: useRouteRender(<RegisterPage />)
    }
  ])
  return <RouterProvider router={router} />
}
