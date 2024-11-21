import { useEffect, useState } from 'react'
import { fetchMenu } from '@/apis'
import MenuTable from './components/MenuTable'
import AddMenuButton from './components/AddMenuButton'

export const MenuPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchMenu({
        PageNumber: 1,
        PageSize: 10
      })
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      console.log(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <p className='text-center text-lg'>Loading...</p>
  if (error) return <p className='text-center text-lg text-red-500'>Error: {error}</p>
  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Menu</p>
      <div className='flex justify-end mx-10 mb-5'>
        <AddMenuButton fetchData={fetchData} />
      </div>
      <MenuTable />
    </>
  )
}
