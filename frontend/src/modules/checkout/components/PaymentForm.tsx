import React from 'react'
import { cn } from '@heroui/theme'
import { Input } from '@heroui/input'
import { ImageUploader } from '@/components/ImageUploader'
import { Building, Smartphone } from 'lucide-react'
import type { PaymentInfo, PaymentMethod } from '@/types/checkoutModel'
import { PaymentData } from '../constants'

interface PaymentFormProps {
  data: PaymentInfo
  onChange: (data: PaymentInfo) => void
}

const paymentMethods: {
  value: PaymentMethod
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: 'TRANSFER',
    label: 'Transferencia Bancaria',
    description: 'Paga mediante transferencia desde tu banco',
    icon: <Building className='h-5 w-5' />,
  },
  {
    value: 'MOBILE_PAYMENT',
    label: 'Pago Móvil',
    description: 'Paga rápidamente con pago móvil',
    icon: <Smartphone className='h-5 w-5' />,
  },
]

export function PaymentForm({ data, onChange }: PaymentFormProps) {
  const handleMethodChange = (method: PaymentMethod) => {
    onChange({ ...data, method })
  }

  const handleChange = (field: keyof PaymentInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold text-foreground'>Método de Pago</h2>
        <p className='text-sm text-muted-foreground'>
          Selecciona tu método de pago y adjunta el comprobante
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <span className='text-sm font-semibold'>Método de Pago</span>
        <div className='grid gap-3 md:grid-cols-2'>
          {paymentMethods.map((method) => (
            <button
              key={method.value}
              type='button'
              onClick={() => handleMethodChange(method.value)}
              className={cn(
                'flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all',
                data.method === method.value
                  ? 'border-primary bg-primary/10'
                  : 'border-foreground/20 bg-card hover:border-primary/50',
              )}
            >
              <div
                className={cn(
                  'rounded-full p-3',
                  data.method === method.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {method.icon}
              </div>
              <div>
                <span className='font-semibold block'>{method.label}</span>
                <span className='text-xs text-muted-foreground'>{method.description}</span>
              </div>
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-2 rounded-md border p-4'>
          <h3 className='text-lg font-semibold'>Datos para el pago</h3>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
            <div>
              <span className='text-sm text-gray-500'>Tipo de cuenta</span>
              <p className='font-medium'>{PaymentData.accountType}</p>
            </div>

            <div>
              <span className='text-sm text-gray-500'>Documento</span>
              <p className='font-medium'>{PaymentData.documentId}</p>
            </div>

            <div>
              <span className='text-sm text-gray-500'>Teléfono</span>
              <p className='font-medium'>{PaymentData.phone}</p>
            </div>

            {data.method === 'TRANSFER' && (
              <>
                <div>
                  <span className='text-sm text-gray-500'>Número de cuenta</span>
                  <p className='font-mono'>{PaymentData.accountNumber}</p>
                </div>

                <div className='sm:col-span-2'>
                  <span className='text-sm text-gray-500'>Titular de la cuenta</span>
                  <p className='font-medium'>{PaymentData.accountHolder}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 rounded-lg border-1 border-foreground/10 bg-card p-4'>
        <h3 className='font-semibold text-foreground'>Comprobante</h3>
        <div className='grid gap-4 md:grid-cols-2'>
          <Input
            id='reference'
            label='Número de Referencia'
            value={data.reference}
            radius='sm'
            placeholder='123456789'
            onChange={(e) => handleChange('reference', e.target.value)}
            labelPlacement='outside'
          />
          <Input
            id='amount'
            type='number'
            step='0.01'
            label='Monto (Bs.)'
            value={data.amount}
            radius='sm'
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder='150.00'
            labelPlacement='outside'
          />
        </div>
        <Input
          id='paymentDate'
          type='date'
          label='Fecha de Pago'
          radius='sm'
          value={data.paymentDate}
          onChange={(e) => handleChange('paymentDate', e.target.value)}
          labelPlacement='outside'
        />
        <div className='flex flex-col gap-2'>
          <span className='text-sm'>Comprobante de Pago</span>
          <ImageUploader />
        </div>
      </div>
    </div>
  )
}
