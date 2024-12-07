import { Card, CardContent } from '@/components/ui/card'
import { formatToVND } from '@/constants/common'
import { ProductItem } from '@/page/product'

interface FoodCardProps {
  item: ProductItem
  onAddToCart: () => void
}

export default function FoodCard({ item, onAddToCart }: FoodCardProps) {
  return (
    <Card
      className='overflow-hidden flex flex-col justify-between hover:scale-105 transition-transform duration-300 cursor-pointer'
      onClick={onAddToCart}
    >
      <div className='flex flex-col'>
        <img src={item.thumbnail} alt={item.name} width={400} height={200} className='w-full h-48 object-cover' />
        <CardContent className='p-2'>
          <h3 className='text-lg font-semibold'>{item.name}</h3>
          <p className='text-sm text-gray-500'>{formatToVND(item.price)}</p>
        </CardContent>
      </div>
    </Card>
  )
}
