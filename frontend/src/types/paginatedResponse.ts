export interface PaginatedResponse<T> {
  content: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  rowsPerPage: number
}
