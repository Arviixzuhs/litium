import React from 'react'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/react'
import { RootState } from '@/store'
import { CategoryModel } from '@/types/categoryModel'
import { toggleCategory } from '@/features/homeSlice'
import { reqGetCategories } from '@/modules/admin/pages/category/services'
import { useDispatch, useSelector } from 'react-redux'

export const ProductCategories = () => {
  const [categories, setCategories] = React.useState<CategoryModel[] | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const dispatch = useDispatch()
  const selectedCategories = useSelector((state: RootState) => state.home.selectedCategories)

  React.useEffect(() => {
    setIsLoading(true)
    reqGetCategories()
      .then((res) => setCategories(res.data.content))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  const handleToggle = (id: number) => {
    dispatch(toggleCategory(id))
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-2'>
        {isLoading && <Spinner />}
        {!isLoading &&
          categories?.map((item) => {
            const isSelected = selectedCategories.includes(item.id)
            return (
              <Button
                key={item.id}
                size='sm'
                color={isSelected ? 'primary' : 'default'}
                radius='full'
                variant={'flat'}
                onPress={() => handleToggle(item.id)}
              >
                {item.name}
              </Button>
            )
          })}
      </div>
    </div>
  )
}
