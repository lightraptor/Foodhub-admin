import { useEffect, useState } from 'react'
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
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError('Hãy chọn một hình ảnh!')
      return
    }
    const newCategory = { name, code, description, price, sellingPrice, unitName, file, categoryId, menuId, inactive }

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
        <Button className='text-white bg-black'>Add</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm mới Category</DialogTitle>
          <DialogDescription>Điền thông tin để thêm mới Product. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Tên
              </Label>
              <Input id='name' value={name} onChange={(e) => setName(e.target.value)} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='code' className='text-right'>
                Mã
              </Label>
              <Input id='code' value={code} onChange={(e) => setCode(e.target.value)} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='price' className='text-right'>
                Giá
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
              <Label htmlFor='sellingPrice' className='text-right'>
                Giá bán
              </Label>
              <Input
                id='sellingPrice'
                value={sellingPrice}
                type='number'
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='unitName' className='text-right'>
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
              <Select onValueChange={(e) => setCategoryId(e)}>
                <SelectTrigger className='w-[180px]'>
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
              <Select onValueChange={(e) => setMenuId(e)}>
                <SelectTrigger className='w-[180px]'>
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
              <Label htmlFor='file' className='text-right'>
                Thumnail
              </Label>
              <Input id='file' type='file' accept='image/*' onChange={handleFileChange} className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Mô tả
              </Label>
              <Input
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='flex items-center space-x-2'>
              <Switch id='inactive' checked={inactive} onCheckedChange={setInactive} />
              <Label htmlFor='inactive'>Inactive</Label>
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
