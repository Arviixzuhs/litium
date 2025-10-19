import { Type } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export const PageResponseDto = <TModel extends Type<unknown>>(model: TModel) => {
  class PageResponse {
    @ApiProperty({ type: [model] })
    content: TModel[]

    @ApiProperty()
    totalItems: number

    @ApiProperty()
    totalPages: number

    @ApiProperty()
    currentPage: number

    @ApiProperty()
    rowsPerPage: number
  }

  return PageResponse
}
