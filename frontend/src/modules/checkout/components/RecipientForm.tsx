import { Input } from '@heroui/input'
import { Recipient } from '@/types/checkoutModel'

interface RecipientFormProps {
  data: Recipient
  onChange: (data: Recipient) => void
}

export function RecipientForm({ data, onChange }: RecipientFormProps) {
  const handleChange = (field: keyof Recipient, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold text-foreground'>Datos del Destinatario</h2>
        <p className='text-sm text-muted-foreground'>
          Ingresa los datos de quien recibirá el pedido
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Input
          id='firstName'
          label='Nombre'
          labelPlacement='outside'
          radius='sm'
          isRequired
          placeholder='Juan'
          value={data.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />

        <Input
          id='lastName'
          label='Apellido'
          labelPlacement='outside'
          radius='sm'
          isRequired
          placeholder='Pérez'
          value={data.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Input
          id='phone'
          label='Teléfono'
          labelPlacement='outside'
          radius='sm'
          isRequired
          placeholder='0414-1234567'
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />

        <Input
          id='documentId'
          label='Cédula / RIF'
          labelPlacement='outside'
          radius='sm'
          isRequired
          placeholder='V-12345678'
          value={data.documentId}
          onChange={(e) => handleChange('documentId', e.target.value)}
        />
      </div>
    </div>
  )
}
