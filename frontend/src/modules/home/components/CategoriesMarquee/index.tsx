import React from 'react'
import { Spinner } from '@heroui/react'
import { CategoryModel } from '@/types/categoryModel'
import { reqGetCategories } from '@/modules/admin/pages/category/services'

export const CategoriesMarquee = () => {
  const [categories, setCategories] = React.useState<CategoryModel[] | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(true)
    reqGetCategories({
      page: 0,
      size: 6,
    })
      .then((res) => setCategories(res.data.content))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  if (categories?.length === 0 || categories === null) {
    return
  }

  return (
    <div className='overflow-hidden w-full relative max-w-7xl mx-auto select-none group'>
      {isLoading && <Spinner />}
      <div className='absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent' />
      <div className='flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4'>
        {[...categories, ...categories, ...categories, ...categories]?.map((item, index) => (
          <button
            key={index}
            className='px-5 py-2 bg-card rounded-lg text-slate-500 text-xs sm:text-sm hover:bg-primary hover:text-white active:scale-95 transition-all duration-300'
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className='absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent' />
    </div>
  )
}
