import React from 'react'
import { Spinner } from '@heroui/react'
import { SearchInput } from '@/components/SearchInput'
import { PurchaseCard } from './components/PurchaseCard'
import { ViewPurchaseModal } from './components/PurchaseCard/components/ViewPurchaseModal'
import { usePurchasesSearch } from './hooks/usePurchasesSearch'
import { PendingReviewNotice } from './components/PendingReviewNotice'

export const PurchasesPage = () => {
  const { purchases, searchQuery, isLoading, setSearchQuery } = usePurchasesSearch()
  const [currentIdToView, setCurrentIdToView] = React.useState(-1)
  const currentPurchase = purchases.find((item) => item.id === currentIdToView)

  return (
    <section className='flex gap-4 flex-col'>
      <div>
        <h1 className='text-3xl font-semibold tracking-tight'>Mis Compras</h1>
      </div>
      <div className='mb-6 md:items-center md:justify-between'>
        <SearchInput onChange={setSearchQuery} searchValue={searchQuery} />
      </div>
      <PendingReviewNotice />
      <div className='space-y-6'>
        {isLoading && <Spinner />}
        {!isLoading &&
          purchases?.map((purchase, index) => (
            <PurchaseCard key={index} purchase={purchase} setCurrentIdToView={setCurrentIdToView} />
          ))}
      </div>
      <ViewPurchaseModal purchaseProducts={currentPurchase?.products || []} />
    </section>
  )
}
