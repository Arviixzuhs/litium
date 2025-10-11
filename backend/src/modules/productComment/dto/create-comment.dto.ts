import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, MaxLength } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'Id del producto', required: true })
  @IsNumber()
  productId: number

  @ApiProperty({
    example: 'Comentario de ejemplo',
    required: true,
    description: 'Comentario breve del producto',
  })
  @IsString()
  @MaxLength(250)
  comment: string
}
