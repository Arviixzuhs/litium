import React from 'react'
import { useDebounce } from 'use-debounce'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { reqGetShoppingCart } from '../services'

export function usePurchasesSearch() {
  const [purchases, setPurchases] = React.useState<ShoppingCartModel[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [debounceValue] = useDebounce(searchQuery, 300)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await reqGetShoppingCart({
          page: 0,
          size: 50,
          productName: debounceValue,
        })
        setPurchases(response.data.content)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [debounceValue])

  return { purchases, searchQuery, isLoading, setSearchQuery }
}
