import { Image } from '@heroui/react'
import HeroProduct1 from '@/assets/img/hero_product_1.png'
import HeroProduct2 from '@/assets/img/hero_product_2.png'
import { ArrowRightIcon } from 'lucide-react'

export const HeroSection = () => {
  return (
    <div className='flex max-xl:flex-col gap-5'>
      <div className='relative flex-1 flex flex-col bg-card rounded-3xl xl:min-h-100 group'>
        <div className='p-5 sm:p-16'>
          <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-xs sm:max-w-lg'>
            Tecnología que te apasiona a tu alcance.
          </h2>
          <p className='flex items-center gap-1 mt-4 text-slate-600'>
            Explora y encuentra los productos que deseas.
          </p>
          <button className='bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition'>
            Explorar productos
          </button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
        <div className='flex-1 flex items-center justify-between w-full bg-card rounded-3xl p-6 px-8 group'>
          <div>
            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40'>
              Buenos productos
            </p>
            <p className='flex items-center gap-1 mt-4'>
              Ver más <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />{' '}
            </p>
          </div>
          <Image className='w-35' src={HeroProduct1} alt='' />
        </div>
        <div className='flex-1 flex items-center justify-between w-full bg-card rounded-3xl p-6 px-8 group'>
          <div>
            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40'>
              Mejores precios
            </p>
            <p className='flex items-center gap-1 mt-4'>
              Ver más <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />{' '}
            </p>
          </div>
          <Image className='w-35' src={HeroProduct2} alt='' />
        </div>
      </div>
    </div>
  )
}
