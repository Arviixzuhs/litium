import React from 'react'
import { Search } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'
import { ProductModel } from '@/types/productModel'
import { reqGetProducts } from '@/modules/admin/pages/product/services'
import { Autocomplete, AutocompleteItem } from '@heroui/react'

export const ProductSearchInput = () => {
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debounceValue] = useDebounce(searchQuery, 100)
  const navigate = useNavigate()

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetProducts({
          name: debounceValue,
          page: 0,
          size: 10,
        })
        setProducts(response.data.content)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [debounceValue])

  return (
    <div className='shadow- flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Autocomplete
        radius='sm'
        items={products}
        selectorIcon
        selectorButtonProps={{
          hidden: true,
        }}
        onInputChange={setSearchQuery}
        placeholder='Buscar productos por nombre...'
        endContent={
          <div className='pr-2'>
            <Search />
          </div>
        }
        className='shadow-none'
        inputProps={{
          classNames: {
            input: 'bg-card shadow-none',
            inputWrapper: 'bg-card shadow-none',
          },
        }}
      >
        {(item) => (
          <AutocompleteItem
            key={item.id}
            onPress={() => navigate(`/product/${item.id}`)}
            hideSelectedIcon
          >
            <div className='flex gap-4'>
              {item.images?.[0] && (
                <div className='h-12 w-12 bg-muted rounded-md flex justify-center items-center'>
                  <img
                    className='h-12 w-12 p-2 object-contain'
                    src={item.images[0].imageURL}
                    alt=''
                  />
                </div>
              )}
              <div>
                <span>{item.name}</span>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  )
}
