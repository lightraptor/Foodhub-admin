import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormRegister } from 'types'
import { useAuth } from 'hooks'

const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required')
})

export const RegisterPage: React.FC = () => {
  const { signup } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormRegister>({
    resolver: yupResolver(signupSchema)
  })

  const onSubmit: SubmitHandler<FormRegister> = (data) => {
    console.log('Form Data:', data)
    signup(data)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='max-w-md w-full bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email')}
              placeholder='Enter your email'
              className={`mt-1 block w-full p-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password')}
              placeholder='Enter your password'
              className={`mt-1 block w-full p-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              type='password'
              {...register('confirmPassword')}
              placeholder='Re-enter your password'
              className={`mt-1 block w-full p-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.confirmPassword && <p className='mt-1 text-sm text-red-500'>{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
