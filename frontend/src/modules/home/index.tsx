import { Products } from './components/Products'

export const HomePage = () => {
  return (
    <>
      <section className='px-4 py-12 md:py-20'>
        <h1 className='mb-4 text-balance text-4xl font-bold md:text-6xl'>
          Tecnología Premium
          <br />
          <span className='text-primary'>a tu alcance</span>
        </h1>
        <p className='mb-8 max-w-2xl text-pretty text-lg text-muted-foreground'>
          Descubre los últimos productos tecnológicos con las mejores especificaciones y precios
          competitivos.
        </p>
        <Products />
      </section>
    </>
  )
}
