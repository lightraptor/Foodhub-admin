import React from 'react'

interface ProductProps {
  id: number
  name: string
  image: string
  price: number
  description: string
  rating: number
  reviews: number
}

export const ProductCard: React.FC<ProductProps> = ({ name, image, price, description, rating, reviews }) => {
  return (
    <div className='max-w-sm min-w-[100px] rounded overflow-hidden shadow-lg bg-white border border-gray-200'>
      <img className='w-full h-48 object-cover' src={image} alt={name} />
      <div className='px-6 py-4'>
        <h2 className='font-bold text-xl mb-2'>{name}</h2>
        <p className='text-gray-700 text-base truncate'>{description}</p>
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-lg font-semibold text-green-600'>${price.toFixed(2)}</span>
          <span className='flex items-center text-yellow-500'>
            {Array.from({ length: Math.floor(rating) }, (_, i) => (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M12 2.5l2.857 5.787 6.399.93-4.629 4.513 1.094 6.375-5.721-3.009-5.721 3.009 1.094-6.375-4.629-4.513 6.399-.93L12 2.5z' />
              </svg>
            ))}
          </span>
        </div>
        <p className='text-sm text-gray-500'>{reviews} reviews</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add to Cart</button>
      </div>
    </div>
  )
}
