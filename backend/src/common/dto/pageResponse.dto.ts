import { ApiProperty } from '@nestjs/swagger'

export class PageResponseDto<T> {
  @ApiProperty({ isArray: true })
  content: T[]

  @ApiProperty()
  totalItems: number

  @ApiProperty()
  totalPages: number

  @ApiProperty()
  currentPage: number

  @ApiProperty()
  rowsPerPage: number
}
