import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from '@heroui/react'
import { ChevronRight } from 'lucide-react'
import { CatalogModel } from '@/types/catalogModel'
import { reqGetCatalogs } from '@/modules/admin/pages/catalog/services'
import { SectionTitle } from '@/components/SectionTitle'

export const ProductCatalogs = () => {
  const [catalogs, setCatalogs] = React.useState<CatalogModel[]>([])

  const loadData = async () => {
    const response = await reqGetCatalogs({
      page: 0,
      size: 4,
    })
    console.log(response.data)
    setCatalogs(response.data.content)
  }

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <section className='bg-background'>
      <div className='flex flex-col gap-12'>
        <SectionTitle
          className='flex flex-col gap-2 justify-center items-center'
          title={
            <>
              Cátalogos de <span className='text-primary'>Productos</span>
            </>
          }
          description={
            'Explora nuestros catálogos principales y encuentra exactamente lo que buscas'
          }
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          {catalogs.map((item) => (
            <Link key={item.id} to={`/catalog/${item.id}`} className='group'>
              <div
                className={`bg-card rounded-xl p-8 flex flex-col justify-between text-card-foreground relative overflow-hidden`}
              >
                <div className='relative z-10'>
                  <h3 className='text-2xl font-bold mb-2'>{item.name}</h3>
                  <p className='text-sm text-muted-foreground'>{item.description}</p>
                </div>

                <div className='flex flex-col relative z-10 gap-4 justify-between pt-4'>
                  <Divider></Divider>
                  <div className='text-primary flex justify-between'>
                    <span className='text-sm font-semibold text-c-text'>
                      {item.productCount} productos
                    </span>
                    <ChevronRight className='h-6 w-6' />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
