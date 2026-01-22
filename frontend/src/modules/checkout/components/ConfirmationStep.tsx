import { CheckCircle2 } from 'lucide-react'

export function ConfirmationStep() {
  return (
    <div className='flex flex-col items-center justify-center py-8 text-center'>
      <div className='mb-6 rounded-full bg-primary/10 p-4'>
        <CheckCircle2 className='h-16 w-16 text-primary' />
      </div>

      <h2 className='mb-2 text-2xl font-bold text-foreground'>¡Pedido Enviado!</h2>

      <p className='mb-6 max-w-md text-muted-foreground'>
        Tu pedido ha sido recibido exitosamente. Nuestro equipo verificará los datos del pago y te
        contactará pronto.
      </p>
    </div>
  )
}
