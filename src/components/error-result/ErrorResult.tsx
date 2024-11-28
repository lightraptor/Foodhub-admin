import React from 'react'
import errorImg from '@/assets/404-error.png'

const ErrorResult = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full my-4'>
        <img src={errorImg} alt='' className='w-[100px]' />
        <p className='text-2xl font-semibold mx-10 text-center my-5'>No results</p>
      </div>
    </>
  )
}

export default ErrorResult
