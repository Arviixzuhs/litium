import { cn } from '@heroui/theme'
import React from 'react'
import MRWIcon from '@/assets/img/mrw.png'
import ZoomIcon from '@/assets/img/zoom.png'
import { Input, Textarea } from '@heroui/input'
import { Building2, Home, Store } from 'lucide-react'
import type { DeliveryInfo, DeliveryMethod, DeliveryAgency } from '@/types/checkoutModel'

interface DeliveryFormProps {
  data: DeliveryInfo
  onChange: (data: DeliveryInfo) => void
}

const deliveryMethods: {
  value: DeliveryMethod
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: 'AGENCY_PICKUP',
    label: 'Retiro en Agencia',
    description: 'Retira tu pedido en la agencia de envíos',
    icon: <Building2 className='h-5 w-5' />,
  },
  {
    value: 'HOME_DELIVERY',
    label: 'Envío a Domicilio',
    description: 'Recibe tu pedido en la puerta de tu casa',
    icon: <Home className='h-5 w-5' />,
  },
  {
    value: 'STORE_PICKUP',
    label: 'Retiro en Tienda',
    description: 'Retira directamente en nuestra tienda',
    icon: <Store className='h-5 w-5' />,
  },
]

const deliveryAgencies: { value: DeliveryAgency; label: string; icon: string }[] = [
  { value: 'MRW', label: 'MRW', icon: MRWIcon },
  { value: 'ZOOM', label: 'ZOOM', icon: ZoomIcon },
]

export function DeliveryForm({ data, onChange }: DeliveryFormProps) {
  const handleMethodChange = (method: DeliveryMethod) => {
    onChange({
      ...data,
      method,
      agency: method === 'STORE_PICKUP' ? null : data.agency,
    })
  }

  const handleAgencyChange = (agency: DeliveryAgency) => {
    onChange({ ...data, agency })
  }

  const handleAddressChange = (field: keyof typeof data.address, value: string) => {
    onChange({
      ...data,
      address: { ...data.address, [field]: value },
    })
  }

  const showAgencySelector = data.method && data.method !== 'STORE_PICKUP'
  const showAddressForm = data.method && data.method !== 'STORE_PICKUP'

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold text-foreground'>Método de Envío</h2>
        <p className='text-sm text-muted-foreground'>Selecciona cómo deseas recibir tu pedido</p>
      </div>

      <div className='flex flex-col gap-3'>
        <span className='text-sm font-semibold'>Tipo de Envío</span>
        <div className='grid gap-3 md:grid-cols-3'>
          {deliveryMethods.map((method) => (
            <button
              key={method.value}
              type='button'
              onClick={() => handleMethodChange(method.value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all cursor-pointer',
                data.method === method.value
                  ? 'border-primary bg-primary/10'
                  : 'border-foreground/20 bg-card hover:border-primary/50',
              )}
            >
              <div
                className={cn(
                  'rounded-full p-2',
                  data.method === method.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {method.icon}
              </div>
              <span className='font-semibold text-sm'>{method.label}</span>
              <span className='text-xs text-muted-foreground'>{method.description}</span>
            </button>
          ))}
        </div>
      </div>

      {showAgencySelector && (
        <div className='flex flex-col gap-3'>
          <span className='text-sm font-semibold'>Agencia de Envío</span>
          <div className='flex gap-3'>
            {deliveryAgencies.map((agency) => (
              <button
                key={agency.value}
                type='button'
                onClick={() => handleAgencyChange(agency.value)}
                className={cn(
                  'flex items-center gap-2 rounded-lg border-1 px-6 py-3 font-semibold transition-all cursor-pointer',
                  data.agency === agency.value
                    ? 'border-primary text-primary-foreground'
                    : 'border-foreground/20 bg-card hover:border-primary/50',
                )}
              >
                <img
                  src={agency.icon}
                  alt={agency.label}
                  className='max-w-15 max-h-15 object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {showAddressForm && (
        <div className='flex gap-4 flex-col rounded-lg border-1 border-foreground/10 bg-card p-4'>
          <h3 className='font-semibold text-foreground'>Dirección de Envío</h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <Input
              id='state'
              label='Estado'
              value={data.address.state}
              radius='sm'
              isRequired
              onChange={(e) => handleAddressChange('state', e.target.value)}
              placeholder='Carabobo'
              labelPlacement='outside'
            />
            <Input
              id='city'
              label='Ciudad'
              value={data.address.city}
              radius='sm'
              isRequired
              onChange={(e) => handleAddressChange('city', e.target.value)}
              labelPlacement='outside'
              placeholder='Valencia'
            />
          </div>
          <Textarea
            id='addressLine'
            label='Dirección'
            value={data.address.addressLine}
            radius='sm'
            isRequired
            onChange={(e) => handleAddressChange('addressLine', e.target.value)}
            placeholder='Av. Principal, Edificio ABC, Piso 2, Apto 21'
            labelPlacement='outside'
          />
          <Input
            id='referencePoint'
            label='Punto de Referencia'
            value={data.address.referencePoint}
            radius='sm'
            isRequired
            placeholder='Frente al Centro Comercial, cerca de la farmacia'
            onChange={(e) => handleAddressChange('referencePoint', e.target.value)}
            labelPlacement='outside'
          />
        </div>
      )}
    </div>
  )
}
