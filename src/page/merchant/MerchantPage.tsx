import { useEffect, useState } from 'react'
import { fetchMerchantPaging } from '@/apis'

import { MerchantItem } from '@/types'
import MerchantTable from './component/MerchantTable'
import AddMerchantButton from './component/AddMerchantButton'

export const MerchantPage = () => {
  const [merchants, setMerchants] = useState<MerchantItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true)

      const response = await fetchMerchantPaging({ PageNumber: page, PageSize: size })
      if (!response.success) {
        throw new Error('Failed to fetch merchants')
      }
      const data = response.data
      setMerchants(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (err) {
      console.error('Error fetching merchants:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  useEffect(() => {
    console.log(merchants)
  }, [merchants])

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
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Quản lý cấu hình thanh toán</p>
      <div className='flex justify-end mx-10 mb-5'>
        {' '}
        <AddMerchantButton fetchData={fetchData} />{' '}
      </div>
      <MerchantTable
        merchants={merchants}
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
