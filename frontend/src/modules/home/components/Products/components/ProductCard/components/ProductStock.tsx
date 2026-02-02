interface IProductStock {
  stock: number
}

export const ProductStock = ({ stock }: IProductStock) => {
  return (
    <div>
      {stock > 0 ? (
        <p className='mb-6 flex items-center gap-2 text-sm font-medium text-green-600'>
          <span className='h-2 w-2 rounded-full bg-green-600' />
          En stock
        </p>
      ) : (
        <p className='mb-6 flex items-center gap-2 text-sm font-medium text-red-500'>
          <span className='h-2 w-2 rounded-full bg-red-500' />
          Agotado
        </p>
      )}
    </div>
  )
}
