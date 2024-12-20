import { Layout } from '@/components'
import { ROUTES } from '@/defines'
import { useRouteRender } from '@/hooks'
import {
  BookingDetailPage,
  BookingPage,
  ChangeTablePage,
  CouponPage,
  HomePage,
  LoginPage,
  MenuPage,
  MerchantPage,
  NewOrderPage,
  OrderDetailPage,
  OrderPage,
  PaymentPage,
  ProductPage,
  TablePage,
  UserPage
} from '@/page'
import { CategoryPage } from '@/page'
import NewBookingPage from '@/page/booking/NewBooking/NewBookingPage'

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
      path: ROUTES.Product.path,
      element: useRouteRender(
        <Layout>
          <ProductPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Menu.path,
      element: useRouteRender(
        <Layout>
          <MenuPage />
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
    },
    {
      path: ROUTES.Users.path,
      element: useRouteRender(
        <Layout>
          <UserPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Table.path,
      element: useRouteRender(
        <Layout>
          <TablePage />
        </Layout>
      )
    },
    {
      path: ROUTES.Coupon.path,
      element: useRouteRender(
        <Layout>
          <CouponPage />
        </Layout>
      )
    },
    {
      path: ROUTES.NewBooking.path,
      element: useRouteRender(
        <Layout>
          <NewBookingPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Order.path,
      children: [
        {
          index: true,
          element: useRouteRender(
            <Layout>
              <OrderPage />
            </Layout>
          )
        },
        {
          path: ':id',
          element: useRouteRender(
            <Layout>
              <OrderDetailPage />
            </Layout>
          )
        }
      ]
    },
    {
      path: ROUTES.NewOrder.path,
      children: [
        {
          index: false
        },
        {
          path: ':id',
          element: useRouteRender(
            <Layout>
              <NewOrderPage />
            </Layout>
          )
        }
      ]
    },
    {
      path: ROUTES.BookingDetail.path,
      children: [
        {
          index: false
        },
        {
          path: ':id',
          element: useRouteRender(
            <Layout>
              <BookingDetailPage />
            </Layout>
          )
        }
      ]
    },
    {
      path: ROUTES.ChangeTable.path,
      children: [
        {
          index: false
        },
        {
          path: ':id',
          element: useRouteRender(
            <Layout>
              <ChangeTablePage />
            </Layout>
          )
        }
      ]
    },
    {
      path: ROUTES.PaymentConfirm.path,
      element: useRouteRender(
        <Layout>
          <PaymentPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Merchant.path,
      element: useRouteRender(
        <Layout>
          <MerchantPage />
        </Layout>
      )
    },
    {
      path: ROUTES.Booking.path,
      children: [
        {
          index: true,
          element: useRouteRender(
            <Layout>
              <BookingPage />
            </Layout>
          )
        },
        {
          path: ':id',
          element: useRouteRender(
            <Layout>
              <BookingDetailPage />
            </Layout>
          )
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
