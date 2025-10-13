export interface Page<T> {
  content: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  rowsPerPage: number
}
