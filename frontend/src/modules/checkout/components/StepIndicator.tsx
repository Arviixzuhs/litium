import { Check } from 'lucide-react'
import { cn } from '@heroui/theme'
import { ReactNode } from 'react'

interface StepIndicatorProps {
  currentStep: number
  steps: { number: number; title: string; icon: ReactNode }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className='flex items-center justify-center gap-2 md:gap-4'>
      {steps.map((step, index) => (
        <div key={step.number} className='flex items-center'>
          <div className='flex flex-col items-center'>
            <div
              className={cn(
                'flex h-6 w-6  items-center justify-center rounded-full border-1 text-sm font-semibold transition-all',
                currentStep > step.number
                  ? 'border-primary bg-primary text-primary-foreground'
                  : currentStep === step.number
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 bg-card text-muted-foreground',
              )}
            >
              {currentStep > step.number ? <Check size={14} /> : step.icon}
            </div>
            <span
              className={cn(
                'mt-2 text-xs font-medium hidden md:block',
                currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'mx-2 h-0.5 w-8 md:w-16 transition-colors',
                currentStep > step.number ? 'bg-primary' : 'bg-muted-foreground/30',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
