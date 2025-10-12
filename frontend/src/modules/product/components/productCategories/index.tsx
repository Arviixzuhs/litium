import { Button } from '@heroui/button'

export const categories = [
  'Todos',
  'Laptops',
  'Smartphones',
  'Audio',
  'Tablets',
  'Wearables',
  'TVs',
]

export const ProductCategories = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      {categories.map((category) => (
        <Button key={category} className='rounded-full' size='sm' color='primary' variant='flat'>
          {category}
        </Button>
      ))}
    </div>
  )
}
