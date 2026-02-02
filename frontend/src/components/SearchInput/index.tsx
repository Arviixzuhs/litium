import { Input } from '@heroui/input'
import { Search } from 'lucide-react'

interface SearchInputProps {
  onChange: (value: string) => void
  searchValue: string
  placeholder?: string
}

export const SearchInput = ({ onChange, searchValue, placeholder }: SearchInputProps) => {
  return (
    <Input
      type='search'
      variant='flat'
      value={searchValue}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Buscar...'}
      endContent={<Search />}
      className='shadow-none'
      classNames={{
        input: 'bg-card shadow-none',
        inputWrapper: 'bg-card shadow-none',
      }}
    />
  )
}
