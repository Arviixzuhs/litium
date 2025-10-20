import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: number
}

export const StarRating = ({ rating, maxStars = 5, size = 20 }: StarRatingProps) => {
  return (
    <div className='flex items-center gap-1'>
      {[...Array(maxStars)].map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100

        return (
          <div key={index} className='relative' style={{ width: size, height: size }}>
            {/* Background star (empty) */}
            <Star
              className='absolute inset-0 text-muted fill-muted'
              style={{ width: size, height: size }}
            />
            {/* Foreground star (filled) with clip */}
            <div
              className='absolute inset-0 overflow-hidden'
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className='text-accent fill-accent' style={{ width: size, height: size }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
