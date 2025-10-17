import React from 'react'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/react'
import { CategoryModel } from '@/types/categoryModel'
import { reqGetCategories } from '@/modules/admin/pages/category/services'

export const ProductCategories = () => {
  const [categories, setCategories] = React.useState<CategoryModel[] | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(true)
    reqGetCategories()
      .then((res) => setCategories(res.data.content))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className='flex flex-wrap gap-2'>
      {isLoading && <Spinner />}
      {!isLoading &&
        categories?.map((item, index) => (
          <Button key={index} className='rounded-full' size='sm' color='primary' variant='flat'>
            {item.name}
          </Button>
        ))}
    </div>
  )
}
