import { Star } from 'lucide-react'

export const PendingReviewNotice = () => {
  return (
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
  )
}
