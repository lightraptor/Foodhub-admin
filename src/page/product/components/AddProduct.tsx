import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { addProduct, fetchActiveCategory, fetchActiveMenu } from '@/apis'
import { Category, Menu } from '@/types'
import ReactQuill from 'react-quill'
const AddProduct = ({ fetchData }: { fetchData: () => void }) => {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [unitName, setUnitName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [inactive, setInactive] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [menuId, setMenuId] = useState('')
  const [listCategory, setListCategory] = useState<Category[]>([])
  const [listMenu, setListMenu] = useState<Menu[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const fetchCategories = async () => {
    try {
      const response = await fetchActiveCategory()
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      const categories = await response.data
      setListCategory(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  const fetchMenus = async () => {
    try {
      const response = await fetchActiveMenu()
      if (!response.success) {
        throw new Error('Failed to fetch categories')
      }
      const menu = await response.data
      setListMenu(menu)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchMenus()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFile(file)
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

    const newCategory = {
      name,
      code,
      description,
      price,
      sellingPrice,
      unitName,
      file: file || undefined,
      categoryId,
      menuId,
      inactive
    }

    // Xử lý logic thêm mới category ở đây
    try {
      setLoading(true)
      setError(null)
      const response = await addProduct(newCategory)

      if (!response.success) {
        throw new Error('Failed to add new category')
      }

      const data = await response.data
      console.log('New data added:', data)

      // Đóng modal và reset form
      setOpen(false)
      setName('')
      setCode('')
      setDescription('')
      setPrice(0)
      setSellingPrice(0)
      setUnitName('')
      setFile(null)
      setCategoryId('')
      setMenuId('')
      setInactive(false)
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='text-white mr-3'>Thêm sản phẩm</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogDescription>Điền thông tin để thêm sản phẩm. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            {/* Cột 1: Tên, Mã, Giá, Giá bán */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='grid gap-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-left'>
                    Tên
                  </Label>
                  <Input id='name' value={name} onChange={(e) => setName(e.target.value)} className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='code' className='text-left'>
                    Mã
                  </Label>
                  <Input id='code' value={code} onChange={(e) => setCode(e.target.value)} className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='price' className='text-left'>
                    Giá
                  </Label>
                  <Input
                    id='price'
                    value={price}
                    type='number'
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='sellingPrice' className='text-left'>
                    Giá bán
                  </Label>
                  <Input
                    id='sellingPrice'
                    value={sellingPrice}
                    type='number'
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
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
                    value={unitName}
                    onChange={(e) => setUnitName(e.target.value)}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Danh mục</Label>
                  <Select onValueChange={(e) => setCategoryId(e)}>
                    <SelectTrigger className='w-full col-span-3'>
                      <SelectValue placeholder='Select Category' />
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
                  <Select onValueChange={(e) => setMenuId(e)}>
                    <SelectTrigger className='w-full col-span-3'>
                      <SelectValue placeholder='Select Menu' />
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
                    onChange={handleFileChange}
                    ref={fileInputRef}
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
                value={description}
                onChange={(e) => setDescription(e)}
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
              <Switch id='inactive' checked={inactive} onCheckedChange={setInactive} />
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
            {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProduct
