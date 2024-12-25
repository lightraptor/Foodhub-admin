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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { useContext, useEffect, useState } from 'react'
import connection from '@/constants/signalRConnection'
import { toast } from 'react-toastify'
import { BookingContext } from '@/context/BookingContext'
import { BookingItem } from '@/types'

export function AppSidebar() {
  const bookingContext = useContext(BookingContext)
  if (!bookingContext) {
    throw new Error('BookingContext is not provided')
  }
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { addBooking } = bookingContext
  const location = useLocation()
  const [notifications, setNotifications] = useState<any[]>([]) // Danh sách thông báo
  const [hasUnread, setHasUnread] = useState(false) // Trạng thái có thông báo chưa đọc
  console.log(hasUnread)
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false) // Trạng thái mở dialog thông báo

  useEffect(() => {
    // Kết nối đến SignalR
    console.log('before signalR')
    const startConnection = async () => {
      try {
        await connection.start()
        console.log('SignalR connected!')
      } catch (error) {
        console.error('Error connecting to SignalR:', error)
        setTimeout(startConnection, 5000) // Thử kết nối lại nếu thất bại
      }
    }

    startConnection()

    // Lắng nghe sự kiện "NotificationBooking"
    connection.on('NotificationBooking', (data: BookingItem) => {
      console.log('Received notification:', data)
      addBooking(data)
      setNotifications((prev) => [...prev, data]) // Thêm thông báo mới vào danh sách
      setHasUnread(true) // Đánh dấu có thông báo chưa đọc
      toast.success('Có đơn hàng mới', {
        autoClose: 5000
      })
    })

    // Cleanup khi component bị unmount
    return () => {
      connection.off('NotificationBooking')
      connection.stop()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Noti', JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    if (location.pathname === ROUTES.Booking.path) {
      setHasUnread(false) // Đánh dấu đã đọc khi ở trang Booking
    }
  }, [location.pathname])

  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN)
  const username = localStorage.getItem('user')

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

  const closeNotificationDialog = () => {
    setIsNotificationDialogOpen(false) // Đóng dialog thông báo
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
          <SidebarMenuItem className='p-2'></SidebarMenuItem>
          <SidebarMenuItem className='mx-auto'></SidebarMenuItem>
          {Object.entries(AUTHENTICATION_MENUS).map(([key, item]) => (
            <SidebarMenuItem key={key} className='p-2'>
              <SidebarMenuButton asChild tooltip={item.label} size='lg'>
                <a
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 ${location.pathname === item.path ? 'bg-[#0765ff] text-[#fff]' : ''} hover:bg-[#0765ff] hover:text-[#fff] duration-300`}
                >
                  <item.icon className=' h-10 w-10 ml-2' style={{ width: '1.2rem', height: '1.2rem' }} />
                  <span className='ml-2'>{item.label}</span>{' '}
                  {item.label === 'Đặt bàn' && notifications.length > 0 && location.pathname !== item.path && (
                    <div className='p-1 px-3 rounded-full text-xs bg-red-500 text-white'>{notifications.length}</div>
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
      <Dialog open={isNotificationDialogOpen} onOpenChange={closeNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông báo</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className='flex flex-col gap-2'>
            {notifications.length === 0 ? (
              <p className='text-gray-500'>Không có thông báo nào.</p>
            ) : (
              notifications.map((notification, index) => (
                <div key={index} className='p-2 border rounded-lg shadow-sm' onClick={() => navigate(`/booking`)}>
                  <p className='text-base my-3'>Nhận Booking từ {notification.customerName}</p>
                  <div className='flex gap-3'>
                    <span className='text-sm text-gray-400'>
                      <span className='font-semibold text-black'>Thời gian checkin:</span>{' '}
                      {new Date(notification.checkinTime).toLocaleString('vi-VN') || 'Không xác định'}
                    </span>
                    <span className='text-sm text-gray-400'>
                      <span className='font-semibold text-black'>Số lượng:</span>{' '}
                      {notification.peopleCount || 'Không xác định'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  )
}
