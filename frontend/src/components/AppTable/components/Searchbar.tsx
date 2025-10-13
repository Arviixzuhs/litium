import { Input } from '@heroui/input'
import { Search } from 'lucide-react'
import { RootState } from '@/store'
import { setFilterValue } from '@/features/appTableSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Searchbar = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setFilterValue(e.target.value))

  return (
    <Input
      type='search'
      value={table.filterValue}
      onChange={handleChange}
      placeholder='Buscar productos...'
      startContent={<Search />}
      className='w-full'
    />
  )
}
