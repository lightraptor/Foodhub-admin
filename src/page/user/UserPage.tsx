import { useEffect, useState } from 'react'
import { Users } from '@/types'
import { fetchUsers } from '@/apis/userApi'
import UserTable from './components/UserTable'

export const UserPage = () => {
  const [user, setUser] = useState<Users[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchUsers({ PageNumber: page, PageSize: size })
      if (!response.success) {
        throw new Error('Failed to fetch menu')
      }
      const data = response.data
      setUser(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }

  if (loading) return <p className='text-center text-lg'>Loading...</p>
  if (error) return <p className='text-center text-lg text-red-500'>Error: {error}</p>

  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>User list</p>
      <div className='flex justify-end mx-10 mb-5'>{/* <AddMenuButton fetchData={fetchData} /> */}</div>
      <UserTable
        user={user}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        fetchData={fetchData}
      />
    </>
  )
}
