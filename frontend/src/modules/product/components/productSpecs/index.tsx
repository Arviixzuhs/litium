import { ProductSpecificationModel } from '@/types/productModel'

interface ProductSpecsProps {
  specs: ProductSpecificationModel[]
}

export const ProductSpecs = ({ specs }: ProductSpecsProps) => {
  return (
    <div className='rounded-lg border border-gray-300 p-6'>
      <h3 className='mb-4 text-lg font-semibold'>Especificaciones Técnicas</h3>
      <dl className='space-y-3'>
        {specs.length === 0 && (
          <div>
            <span>Sin especificaciones</span>
          </div>
        )}
        {specs.length !== 0 &&
          specs.map((spec, index) => (
            <div
              key={index}
              className='flex justify-between border-gray-300 border-b pb-3 last:border-b-0 last:pb-0'
            >
              <dt className='font-medium text-muted-foreground'>{spec.title}</dt>
              <dd className='font-semibold'>{spec.value}</dd>
            </div>
          ))}
      </dl>
    </div>
  )
}
