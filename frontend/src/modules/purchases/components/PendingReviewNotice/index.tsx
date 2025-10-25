import React from 'react'
import { Star } from 'lucide-react'
import { reqGindUnreviewedProductsCount } from './services'
import { Card, CardBody } from '@heroui/react'

export const PendingReviewNotice = () => {
  const [pendingCount, setPendingCount] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    reqGindUnreviewedProductsCount()
      .then((res) => setPendingCount(res.data.count))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  if (pendingCount === 0 && !isLoading) return

  return (
    <Card className='mb-6' shadow='none'>
      <CardBody>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-full bg-default-100'>
              <Star className='size-5 fill-primary text-primary' />
            </div>
            <p className='text-sm'>
              <span className='font-medium'>
                {pendingCount} {pendingCount === 1 ? 'producto' : 'productos'} esperan tu opinión
              </span>
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
