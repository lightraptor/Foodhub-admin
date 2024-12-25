import { useEffect, useState } from 'react'

import { TableItem } from '@/types'
import TableList from './components/TableList'
import { fetchGetAllTable } from '@/apis/tableApi'
import AddTable from './components/AddTable'

export const TablePage = () => {
  const [tableList, setTableList] = useState<TableItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)
      const response = await fetchGetAllTable({ PageNumber: page, PageSize: size })
      if (!response.success) {
        throw new Error('Failed to fetch menu')
      }
      const data = response.data
      setTableList(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching menu:', err)
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
  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Quản lý bàn ăn</p>
      <div className='flex justify-end mx-10 mb-5'>
        <AddTable fetchData={fetchData} />
      </div>
      <TableList
        tableList={tableList}
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
