import { Back } from '@/components/Back'
import { SearchInput } from '@/components/SearchInput'
import { PurchaseCard } from './components/PurchaseCard'
import { usePurchasesSearch } from './hooks/usePurchasesSearch'
import { PendingReviewNotice } from './components/PendingReviewNotice'
import { Card, CardBody, Spinner } from '@heroui/react'

export const PurchasesPage = () => {
  const { purchases, searchQuery, isLoading, setSearchQuery } = usePurchasesSearch()

  return (
    <div className='mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8'>
      <div className='mb-6'>
        <Back />
        <h1 className='text-3xl font-semibold tracking-tight'>Compras</h1>
      </div>
      <div className='mb-6 md:items-center md:justify-between'>
        <SearchInput onChange={setSearchQuery} searchValue={searchQuery} />
      </div>
      <Card className='mb-6' shadow='none'>
        <CardBody>
          <PendingReviewNotice />
        </CardBody>
      </Card>
      <div className='space-y-6'>
        {isLoading && <Spinner />}
        {!isLoading &&
          purchases?.map((purchase, index) => <PurchaseCard key={index} purchase={purchase} />)}
      </div>
    </div>
  )
}
