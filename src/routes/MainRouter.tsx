import { Layout } from '@/components'
import { ROUTES } from '@/defines'
import { useRouteRender } from '@/hooks'
import { HomePage, LoginPage } from '@/page'
import { CategoryPage } from '@/page'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.Home.path,
      element: useRouteRender(
        <Layout>
          <HomePage />
        </Layout>
      )
    },
    {
      path: ROUTES.Category.path,
      element: useRouteRender(
        <Layout>
          <CategoryPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Login.path,
      element: useRouteRender(
        <Layout>
          <LoginPage />
        </Layout>
      )
    }
  ])
  return <RouterProvider router={router} />
}
