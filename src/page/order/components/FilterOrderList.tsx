import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchActiveMenu } from '@/apis/menuApi'
import { fetchActiveCategory } from '@/apis/categoryApi'
import { Category, Menu } from '@/types'

interface ProductFilterProps {
  onApplyFilter: (filters: {
    SearchText?: string
    PriceFrom?: number
    PriceTo?: number
    CategoryId?: string
    MenuId?: string
  }) => void
}

export const FilterOrderList: React.FC<ProductFilterProps> = ({ onApplyFilter }) => {
  const [listMenu, setListMenu] = useState<Menu[]>([])
  const [listCategory, setListCategory] = useState<Category[]>([])
  const [localFilters, setLocalFilters] = useState({
    SearchText: '',
    PriceFrom: 0,
    PriceTo: 0,
    CategoryId: '',
    MenuId: ''
  })

  const fetchMenu = async () => {
    try {
      const response = await fetchActiveMenu()
      if (!response) {
        return
      }
      const data = await response.data
      setListMenu(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await fetchActiveCategory()
      if (!response) {
        return
      }
      const data = await response.data
      setListCategory(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchMenu()
    fetchCategory()
  }, [])

  const handleChange = (field: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleApplyFilter = () => {
    onApplyFilter(localFilters)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center mb-8 py-4 px-2'>
      <Input
        placeholder='Search...'
        value={localFilters.SearchText}
        onChange={(e) => handleChange('SearchText', e.target.value)}
        className='w-full border-none shadow-lg'
      />
      <Input
        type='number'
        placeholder='Price From'
        value={localFilters.PriceFrom || ''}
        onChange={(e) => handleChange('PriceFrom', Number(e.target.value))}
        className='w-full border-none shadow-lg'
      />
      <Input
        type='number'
        placeholder='Price To'
        value={localFilters.PriceTo || ''}
        onChange={(e) => handleChange('PriceTo', Number(e.target.value))}
        className='w-full border-none shadow-lg'
      />
      <Select onValueChange={(value) => handleChange('CategoryId', value === 'reset' ? '' : value)}>
        <SelectTrigger className='w-full border-none shadow-lg bg-[#fff]'>
          <SelectValue placeholder='Select Category' />
        </SelectTrigger>
        <SelectContent className='bg-[#fff] border-none'>
          <SelectItem value='reset'>Reset</SelectItem>
          {listCategory.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleChange('MenuId', value === 'reset' ? '' : value)}>
        <SelectTrigger className='w-full border-none shadow-lg bg-[#fff]'>
          <SelectValue placeholder='Select Menu' />
        </SelectTrigger>
        <SelectContent className='bg-[#fff] border-none'>
          <SelectItem value='reset'>Reset</SelectItem>
          {listMenu.map((menu) => (
            <SelectItem key={menu.id} value={menu.id}>
              {menu.menuName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        className='bg-[#0765ff] text-[#fff] py-2 px-4 rounded hover:bg-[#076fff] h-[36px] flex items-center justify-center'
        onClick={handleApplyFilter}
      >
        Apply Filter
      </button>
    </div>
  )
}
