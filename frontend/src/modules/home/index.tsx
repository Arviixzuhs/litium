import { Products } from './components/Products'
import { ProductCatalogs } from './components/ProductCatalogs'

export const HomePage = () => {
  return (
    <div className='flex flex-col gap-12'>
      <ProductCatalogs />
      <Products />
    </div>
  )
}
