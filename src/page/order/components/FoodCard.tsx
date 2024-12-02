import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatToVND } from '@/constants/common'
import { ProductItem } from '@/page/product'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

interface FoodCardProps {
  item: ProductItem
  onAddToCart: (quantity: number) => void
}

export default function FoodCard({ item, onAddToCart }: FoodCardProps) {
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))

  return (
    <Card className='overflow-hidden flex flex-col justify-between'>
      <div className='flex flex-col'>
        <img src={item.thumbnail} alt={item.name} width={400} height={200} className='w-full h-48 object-cover' />
        <CardContent className='p-4'>
          <h3 className='text-lg font-semibold'>{item.name}</h3>
          <p className='text-sm text-gray-500'>{formatToVND(item.price)}</p>
        </CardContent>
      </div>
      <CardFooter className='p-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='icon' onClick={decrementQuantity}>
            <Minus className='h-4 w-4' />
          </Button>
          <span className='font-semibold'>{quantity}</span>
          <Button variant='outline' size='icon' onClick={incrementQuantity}>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
        <Button
          className='bg-[#0765ff] hover:bg-[#0765ff]/90'
          onClick={() => onAddToCart(quantity)}
          disabled={quantity === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
