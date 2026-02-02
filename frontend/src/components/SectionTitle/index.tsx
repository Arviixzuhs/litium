import { cn } from '@heroui/theme'
import React from 'react'

interface ISectionTitle {
  title: React.ReactNode
  className?: string
  description: React.ReactNode
}

export const SectionTitle = ({ title, description, className }: ISectionTitle) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h2 className='text-3xl md:text-4xl font-bold text-foreground'>{title}</h2>
      <p className='text-muted-foreground max-w-2xl'>{description}</p>
    </div>
  )
}
