import { BASE_URL } from '@/constants'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

interface ProductResponse {
  items: ProductItem[]
  pageCount: number
  pageNumber: number
  pageSize: number
  totalRecord: number
}

interface ProductItem {
  id: string
  code: string
  name: string
  description: string
  price: number
  sellingPrice: number
  unitName: string
  thumbnail: string
  inactive: boolean
  menuDto: MenuDto
  categoryDto: CategoryDto
  productImagesDto: any
}

interface ProductPost {
  code: string
  name: string
  description: string
  price: number
  sellingPrice: number
  file: File
  unitName: string
  inactive: boolean
  menuId: string
  categoryId: string
}

interface ProductPut {
  id: string
  code: string
  name: string
  description: string
  price: number
  sellingPrice: number
  file: File
  unitName: string
  inactive: boolean
  menuId: string
  categoryId: string
}

export interface MenuDto {
  id: string
  menuName: string
  description: string
}

export interface CategoryDto {
  id: string
  code: string
  name: string
  description: string
}

export const fetchProduct = async ({
  PageNumber = 1,
  PageSize = 10
}: {
  PageNumber?: number
  PageSize?: number
}): Promise<ApiResponse<ProductResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProductResponse>> = await instance.get(
      `/api/Product/get-list?PageNumber=${PageNumber}&PageSize=${PageSize}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    throw error
  }
}

export const addProduct = async (product: Partial<ProductPost>): Promise<ApiResponse<ProductItem>> => {
  try {
    const formData = new FormData()

    // Thêm các trường vào formData
    formData.append('Code', product.code || '')
    formData.append('Name', product.name || '')
    formData.append('Description', product.description || '')
    formData.append('Price', product.price?.toString() || '0')
    formData.append('SellingPrice', product.sellingPrice?.toString() || '0')
    formData.append('UnitName', product.unitName || '')
    formData.append('MenuId', product.menuId || '')
    formData.append('CategoryId', product.categoryId || '')
    formData.append('Inactive', product.inactive ? 'true' : 'false')
    formData.append('File', product.file || '')

    // Kiểm tra và thêm file hình ảnh vào formData nếu có

    // Gửi yêu cầu POST với nội dung formData
    const response: AxiosResponse<ApiResponse<ProductItem>> = await instance.post('/api/Product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Đảm bảo rằng header là multipart/form-data
      }
    })

    return response.data
  } catch (error) {
    console.error('Error adding menu:', error)
    throw error
  }
}

export const updateProduct = async (product: Partial<ProductPut>): Promise<ApiResponse<ProductItem>> => {
  try {
    const formData = new FormData()

    // Thêm các trường vào formData
    formData.append('Id', product.id || '')
    formData.append('Code', product.code || '')
    formData.append('Name', product.name || '')
    formData.append('Description', product.description || '')
    formData.append('Price', product.price?.toString() || '0')
    formData.append('SellingPrice', product.sellingPrice?.toString() || '0')
    formData.append('UnitName', product.unitName || '')
    formData.append('MenuId', product.menuId || '')
    formData.append('CategoryId', product.categoryId || '')
    formData.append('Inactive', product.inactive ? 'true' : 'false')
    formData.append('File', product.file || '')

    // Kiểm tra và thêm file hình ảnh vào formData nếu có

    // Gửi yêu cầu POST với nội dung formData
    const response: AxiosResponse<ApiResponse<ProductItem>> = await instance.put('/api/Product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Đảm bảo rằng header là multipart/form-data
      }
    })

    return response.data
  } catch (error) {
    console.error('Error adding menu:', error)
    throw error
  }
}

export const deleteProduct = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await instance.delete(`/api/Product/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
}
