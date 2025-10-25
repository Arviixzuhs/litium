import React from 'react'
import { Back } from '@/components/Back'
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
    <div className='mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8'>
      <div className='mb-6'>
        <Back />
        <h1 className='text-3xl font-semibold tracking-tight'>Compras</h1>
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
    </div>
  )
}
