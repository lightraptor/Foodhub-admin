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

export function AppSidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const location = useLocation()

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
                    <span className='truncate font-semibold'>Dashboard</span>
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
                  <item.icon className=' h-10 w-10 ml-2' style={{ width: '1.2rem', height: '1.2rem' }} />
                  <span className='ml-2'>{item.label}</span>
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
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className='h-4 w-4 mr-2' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
