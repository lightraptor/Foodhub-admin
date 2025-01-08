import { BookingItem, OrderItem } from '@/types'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { AUTHENTICATION_ROUTES, AUTHENTICATION_MENUS, ROUTES, STORAGE, UN_AUTHENTICATION_ROUTES } from '@/defines'
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { useContext, useEffect, useState } from 'react'
import connection from '@/constants/signalRConnection'
import { toast } from 'react-toastify'
import { NotiContext } from '@/context/NotiContext'

export function AppSidebar() {
  const notiContext = useContext(NotiContext)
  if (!notiContext) {
    throw new Error('NotiContext is not provided')
  }
  const { setBookings, setOrders } = notiContext
  const navigate = useNavigate()
  const { logout } = useAuth()
  const location = useLocation()

  const [notifications, setNotifications] = useState<any[]>([]) // Danh sách thông báo cho booking
  const [orderNotifications, setOrderNotifications] = useState<any[]>([]) // Danh sách thông báo cho order
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasUnread, setHasUnread] = useState(false) // Trạng thái có thông báo chưa đọc
  //const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false) // Trạng thái mở dialog thông báo
  useEffect(() => {
    const startConnection = async () => {
      if (connection.state === 'Connected') {
        console.log('SignalR is already connected')
        return
      }
      try {
        await connection.start()
        console.log('SignalR connected!')
        // disable
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        //console.error('Error connecting to SignalR:', error)
        setTimeout(startConnection, 5000)
      }
    }

    startConnection()

    // Lắng nghe sự kiện "NotificationBooking"
    connection.on('NotificationBooking', (data: BookingItem) => {
      console.log('Received booking notification:', data)
      const newData = { ...data, isHighlight: true }
      setBookings((prev) => [newData, ...prev])
      setNotifications((prev) => [...prev, data])
      toast.success('Có đơn đặt bàn mới', { autoClose: 5000 })
    })

    // Lắng nghe sự kiện "NotificationOrder"
    connection.on('NotificationOrder', (data: OrderItem) => {
      console.log('Received order notification:', data)
      const newData = { ...data, isHighlight: true }
      setOrders((prev) => [newData, ...prev])
      setOrderNotifications((prev) => [...prev, data])
      toast.success('Có đơn hàng mới', { autoClose: 5000 })
    })

    return () => {
      connection.off('NotificationBooking')
      connection.off('NotificationOrder')
      connection.stop()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Noti', JSON.stringify(notifications))
    localStorage.setItem('OrderNoti', JSON.stringify(orderNotifications))
  }, [notifications, orderNotifications])

  useEffect(() => {
    if (location.pathname === ROUTES.Booking.path || location.pathname === ROUTES.Order.path) {
      setHasUnread(false)
    }
  }, [location.pathname])

  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN)
  const username = localStorage.getItem('user')

  const handleNavigation = (path: string) => {
    const stayInAuth = Object.values(AUTHENTICATION_ROUTES).some((route) => route.path === path)
    const unStayInAuth = Object.values(UN_AUTHENTICATION_ROUTES).some((route) => route.path === path)

    if (access_token && unStayInAuth) {
      navigate(ROUTES.Home.path)
      return
    }
    if (!access_token && stayInAuth) {
      navigate(ROUTES.Login.path)
      return
    }
    navigate(path)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <LayoutDashboard
                    className='h-10 w-10'
                    style={{ width: '1.5rem', height: '1.5rem', fontWeight: 'bold' }}
                  />
                  <div className='grid flex-1 text-left text-sm leading-tight overflow-hidden'>
                    <span className='truncate font-semibold'>Trang quản trị</span>
                    <span className='truncate text-xs'>Foodhub</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {Object.entries(AUTHENTICATION_MENUS).map(([key, item]) => (
            <SidebarMenuItem key={key} className='p-2'>
              <SidebarMenuButton asChild tooltip={item.label} size='lg'>
                <a
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 ${location.pathname === item.path ? 'bg-[#0765ff] text-[#fff]' : ''} hover:bg-[#0765ff] hover:text-[#fff] duration-300`}
                >
                  <item.icon className='h-10 w-10 ml-2' style={{ width: '1.2rem', height: '1.2rem' }} />
                  <span className='ml-2'>{item.label}</span>
                  {item.label === 'Đặt bàn' && notifications.length > 0 && location.pathname !== item.path && (
                    <div className='p-1 px-3 rounded-full text-xs bg-red-500 text-white'>{notifications.length}</div>
                  )}
                  {item.label === 'Đơn hàng' && orderNotifications.length > 0 && location.pathname !== item.path && (
                    <div className='p-1 px-3 rounded-full text-xs bg-red-500 text-white'>
                      {orderNotifications.length}
                    </div>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User className='h-6 w-6' />
                  <span>{username}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Settings className='h-4 w-4 mr-2' />
                  Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className='h-4 w-4 mr-2' />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />

      {/* Dialog hiển thị thông báo */}
    </Sidebar>
  )
}
