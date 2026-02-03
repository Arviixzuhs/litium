import { SectionTitle } from '@/components/SectionTitle'
import { ClockFadingIcon, HeadsetIcon, SendIcon } from 'lucide-react'

const ourSpecsData = [
  {
    title: 'Compra sin moverte',
    description:
      'Encuentra lo que necesitas, y coordina el pago y la entrega con el vendedor. Es fácil y rápido. ¡Todos podemos hacerlo!',
    icon: SendIcon,
    accent: '#05DF72',
  },
  {
    title: 'Recibe tu producto',
    description:
      'Acuerda la entrega de tu compra con el vendedor. Puedes recibirlo en tu casa, en la oficina o retirarlo. ¡Tú decides qué prefieres!',
    icon: ClockFadingIcon,
    accent: '#FF8904',
  },
  {
    title: 'Soporte 24/7',
    description:
      'Estamos para ayudarte con cualquier duda. Escribenos y responderemos lo mas pronto posible.',
    icon: HeadsetIcon,
    accent: '#A684FF',
  },
]

export const OurSpecs = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <SectionTitle
        className='flex flex-col gap-2 justify-center items-center'
        title={
          <>
            Acerca de <span className='text-primary'>Nosotros</span>
          </>
        }
        description={'Ofrecemos una experiencia agradable para asegurar tu comodidad y seguridad'}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-26'>
        {ourSpecsData.map((spec, index) => {
          return (
            <div
              className='bg-card relative h-44 px-8 flex flex-col items-center justify-center w-full text-center rounded-3xl group'
              key={index}
            >
              <h3 className='text-slate-800 font-medium'>{spec.title}</h3>
              <p className='text-sm text-slate-600 mt-3'>{spec.description}</p>
              <div className='bg-primary absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition'>
                <spec.icon size={20} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
