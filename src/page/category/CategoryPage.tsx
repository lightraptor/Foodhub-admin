import { useEffect, useState } from 'react'
import CategoryTable from './components/CategoryTable'
import AddCategoryButton from './components/AddCategoryButton'

export const CategoryPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://192.168.12.210:7143/api/Category') // Thay bằng API thật
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
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
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Category page</p>
      <div className='flex justify-end mx-10 mb-5'>
        <AddCategoryButton fetchData={fetchData} />
      </div>
      <CategoryTable />
    </>
  )
}
