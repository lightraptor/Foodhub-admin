import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchActiveCategory, fetchActiveMenu, updateProduct } from '@/apis'
import { ProductItem } from './ProductTable'
import { Category, Menu } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Edit } from 'lucide-react'
import { toast } from 'react-toastify'

export const EditProduct = ({ product, fetchData }: { product: ProductItem; fetchData: () => void }) => {
  const [open, setOpen] = useState(false)
  //const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listCategory, setListCategory] = useState<Category[]>([])
  const [listMenu, setListMenu] = useState<Menu[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [editedProduct, setEditedProduct] = useState({
    id: product.id,
    code: product.code,
    name: product.name,
    description: product.description,
    price: product.price,
    sellingPrice: product.sellingPrice,
    unitName: product.unitName,
    inactive: product.inactive,
    file: null as File | null,
    menuId: product.menuDto.id,
    categoryId: product.categoryDto.id
  })

  const fetchCategories = async () => {
    try {
      const response = await fetchActiveCategory()
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      setListCategory(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchMenus = async () => {
    try {
      const response = await fetchActiveMenu()
      if (!response.success) {
        throw new Error('Failed to fetch menus')
      }
      setListMenu(response.data)
    } catch (error) {
      console.error('Error fetching menus:', error)
    }
  }

  useEffect(() => {
    if (open) {
      fetchCategories()
      fetchMenus()
    }
  }, [open])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setEditedProduct({ ...editedProduct, file: file as File | null })
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null) // Xóa preview
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Xóa tên file trong input
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!editedProduct.file) {
      setError('Hãy chọn một hình ảnh!')
      return
    }
    const payload = {
      id: product.id,
      code: editedProduct.code,
      name: editedProduct.name,
      description: editedProduct.description,
      price: editedProduct.price,
      sellingPrice: editedProduct.sellingPrice,
      unitName: editedProduct.unitName,
      file: editedProduct.file,
      inactive: editedProduct.inactive,
      categoryId: editedProduct.categoryId,
      menuId: editedProduct.menuId
    }

    try {
      setLoading(true)
      setError(null)

      const response = await updateProduct(payload)
      if (!response.success) throw new Error('Failed to update product')
      console.log(response)
      toast.success('Chỉnh sửa thành công', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      // Đóng dialog và làm mới dữ liệu
      setOpen(false)
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      toast.error('Chînh sửa thất bại', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Edit className='h-4 w-4' />
            <span className='sr-only'>Edit</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[800px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>Điền thông tin để chỉnh sửa sản phẩm. Nhấn Lưu khi hoàn tất.</DialogDescription>
          </DialogHeader>
          {product && (
            <form onSubmit={handleSubmit}>
              <div className='grid gap-4 py-4'>
                {/* Cột 1: Tên, Mã, Giá, Giá bán */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='grid gap-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-left'>
                        Tên
                      </Label>
                      <Input
                        id='name'
                        value={editedProduct.name}
                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='code' className='text-left'>
                        Mã
                      </Label>
                      <Input
                        id='code'
                        value={editedProduct.code}
                        onChange={(e) => setEditedProduct({ ...editedProduct, code: e.target.value })}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='price' className='text-left'>
                        Giá
                      </Label>
                      <Input
                        id='price'
                        value={editedProduct.price}
                        type='number'
                        onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='sellingPrice' className='text-left'>
                        Giá bán
                      </Label>
                      <Input
                        id='sellingPrice'
                        value={editedProduct.sellingPrice}
                        type='number'
                        onChange={(e) => setEditedProduct({ ...editedProduct, sellingPrice: Number(e.target.value) })}
                        className='col-span-3'
                      />
                    </div>
                  </div>

                  {/* Cột 2: Đơn vị, Category, Menu, Thumbnail */}
                  <div className='grid gap-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='unitName' className='text-left'>
                        Đơn vị
                      </Label>
                      <Input
                        id='unitName'
                        value={editedProduct.unitName}
                        onChange={(e) => setEditedProduct({ ...editedProduct, unitName: e.target.value })}
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-left'>Danh mục</Label>
                      <Select onValueChange={(e) => setEditedProduct({ ...editedProduct, categoryId: e })}>
                        <SelectTrigger className='w-full col-span-3'>
                          <SelectValue placeholder={product.categoryDto.name} defaultValue={product.categoryDto.id} />
                        </SelectTrigger>
                        <SelectContent>
                          {listCategory.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-left'>Thực đơn</Label>
                      <Select onValueChange={(e) => setEditedProduct({ ...editedProduct, menuId: e })}>
                        <SelectTrigger className='w-full col-span-3'>
                          <SelectValue placeholder={product.menuDto.menuName} defaultValue={product.menuDto.id} />
                        </SelectTrigger>
                        <SelectContent>
                          {listMenu.map((menu) => (
                            <SelectItem key={menu.id} value={menu.id}>
                              {menu.menuName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='file' className='text-left'>
                        Hình đại diện
                      </Label>
                      <Input
                        id='file'
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='col-span-3'
                      />
                    </div>
                  </div>
                </div>
                {/* Phần preview ảnh */}
                {previewImage && (
                  <div className='w-full flex justify-center items-center mt-6'>
                    <div className='relative group w-full max-w-xs'>
                      <img src={previewImage} alt='Preview' className='w-full h-auto max-w-xs rounded border' />
                      <button
                        onClick={handleRemoveImage}
                        className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
                {/* Phần mô tả nằm dưới */}
                <div className='grid grid-cols-4 items-center gap-4 mt-4'>
                  <Label htmlFor='description' className='text-left'>
                    Mô tả
                  </Label>
                  <ReactQuill
                    theme='snow'
                    value={editedProduct.description}
                    onChange={(value) => setEditedProduct({ ...editedProduct, description: value })}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image']
                      ]
                    }}
                    className='rounded-md border border-gray-300 w-full col-span-4 min-h-20'
                  />
                </div>

                {/* Switch Inactive */}
                <div className='flex items-center space-x-2 mt-4'>
                  <Label htmlFor='inactive'>Trạng thái</Label>
                  <Switch
                    id='inactive'
                    checked={editedProduct.inactive}
                    onCheckedChange={(checked) => setEditedProduct({ ...editedProduct, inactive: checked })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type='submit' disabled={loading}>
                  {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
                {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
