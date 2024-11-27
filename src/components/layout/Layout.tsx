import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar'
import { useAuthContext } from '@/context'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAuthContext()

  return (
    <SidebarProvider>
      {isLoggedIn && <AppSidebar />}
      <div className='w-full'>
        {isLoggedIn && <SidebarTrigger />}
        {children}
      </div>
    </SidebarProvider>
  )
}
