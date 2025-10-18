import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { IsInt, IsNotEmpty } from 'class-validator'

export class CommentFiltersDto extends PaginationDto {
  @ApiProperty({ description: 'ID del producto (obligatorio)' })
  @Type(() => Number)
  @IsInt({ message: 'El productId debe ser un número entero' })
  @IsNotEmpty({ message: 'El productId es obligatorio' })
  productId: number
}
