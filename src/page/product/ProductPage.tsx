import { ProductCard } from '@/components'
// import { useEffect, useState } from 'react'

export const ProductPage = () => {
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)

  const sampleProduct = {
    id: 1,
    name: 'Wireless Headphones',
    image: 'https://via.placeholder.com/150',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    rating: 4.5,
    reviews: 120
  }
  // const fetchData = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch('https://192.168.12.210:7143/api/')
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch categories')
  //     }
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Unknown error')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // })
  // if (loading) return <p className='text-center text-lg'>Loading...</p>
  // if (error) return <p className='text-center text-lg text-red-500'>Error: {error}</p>
  return (
    <>
      <>
        <p className='text-2xl font-semibold mx-10 text-center my-5'>Product page</p>
        <div className='flex justify-end mx-10 mb-5'>
          <ProductCard {...sampleProduct} />
        </div>
      </>
    </>
  )
}
