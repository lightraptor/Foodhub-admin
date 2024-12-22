import { useAuth } from '@/hooks'
import { Charts } from './compoments'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const HomePage = () => {
  const { logout } = useAuth()
  return (
    <>
      <h1 className='text-2xl font-bold m-4'>Dashboard</h1>
      <Tabs defaultValue='Month' className='w-full'>
        <TabsList className='grid grid-cols-2 w-[600px] mx-auto'>
          <TabsTrigger value='Month'>Month</TabsTrigger>
          <TabsTrigger value='Week'>Week</TabsTrigger>
        </TabsList>
        <TabsContent value='Month'>
          <Charts criteria='Month' />
        </TabsContent>
        <TabsContent value='Week'>
          <Charts criteria='Week' />
        </TabsContent>
      </Tabs>
      <button onClick={logout} type='button'>
        Logout
      </button>
    </>
  )
}
