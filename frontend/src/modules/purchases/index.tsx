import React from 'react'
import { useDebounce } from 'use-debounce'
import { Search, Star } from 'lucide-react'
import { PurchaseCard } from './components/PurchaseCard'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { reqGetShoppingCart } from './services'
import { getFormattedDateTime } from '@/utils/getFormattedDateTime'
import { Card, CardBody, Input, Spinner } from '@heroui/react'
import { Back } from '@/components/Back'

export const PurchasesPage = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [shoppingCarts, setShoppingCarts] = React.useState<ShoppingCartModel[] | null>(null)
  const [debounceSearchQuery] = useDebounce(searchQuery, 300)

  const loadData = () => {
    setIsLoading(true)
    reqGetShoppingCart({
      page: 0,
      size: 10,
      productName: debounceSearchQuery,
    })
      .then((res) => setShoppingCarts(res.data.content))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  React.useEffect(() => {
    loadData()
  }, [debounceSearchQuery])

  return (
    <div className='mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8'>
      <div className='mb-6'>
        <Back />
        <h1 className='text-3xl font-semibold tracking-tight'>Compras</h1>
      </div>
      <div className='mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div className='flex-1'>
          <Input
            type='text'
            placeholder='Buscar'
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Search className='size-4 text-default-400' />}
            classNames={{
              input: 'text-sm',
              inputWrapper: 'h-10',
            }}
          />
        </div>
      </div>
      <Card className='mb-6' shadow='none'>
        <CardBody>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-full bg-default-100'>
                <Star className='size-5 fill-primary text-primary' />
              </div>
              <p className='text-sm'>
                <span className='font-medium'>4 productos esperan tu opinión</span>
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className='space-y-6'>
        {isLoading && <Spinner />}
        {!isLoading &&
          shoppingCarts?.map((purchase, index) => (
            <div key={index}>
              <div className='mb-4 text-sm font-medium'>
                {getFormattedDateTime({ value: purchase.createdAt })}
              </div>
              <PurchaseCard purchase={purchase} />
            </div>
          ))}
      </div>
    </div>
  )
}
