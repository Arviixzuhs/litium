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
      value={searchValue}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Buscar...'}
      startContent={<Search />}
    />
  )
}
