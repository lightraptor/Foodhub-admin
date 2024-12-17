import { fetchGetCoupon } from '@/apis'
import { CouponItem } from '@/types'
import { useEffect, useState } from 'react'
import CouponTable from './components/CouponTable'
import AddCoupon from './components/AddCoupon'

export const CouponPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [coupons, setCoupons] = useState<CouponItem[]>([])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to page 1
  }
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchGetCoupon({
        PageNumber: currentPage,
        PageSize: pageSize
      })
      if (!response.success) {
        throw new Error('Failed to fetch coupons')
      }
      const data = await response.data
      setCoupons(data?.items || [])
      setTotalItems(data?.totalRecord || undefined)
    } catch (error) {
      console.error('Error fetching coupons:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  useEffect(() => {
    console.log(coupons)
  }, [coupons])
  if (loading) return <p className='text-center text-lg'>Loading...</p>

  return (
    <>
      <p className='text-2xl font-semibold mx-10 text-center my-5'>Menu</p>
      <div className='flex justify-end mx-10 mb-5'>
        <AddCoupon fetchData={fetchData} />
      </div>
      <CouponTable
        coupons={coupons}
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
