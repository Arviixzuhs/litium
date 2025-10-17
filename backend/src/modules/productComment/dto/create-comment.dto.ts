import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'Id del producto', required: true })
  @IsNumber()
  productId: number

  @ApiProperty({
    example: 1,
    description: 'Calificación del producto',
    required: true,
  })
  @IsNumber({}, { message: 'La calificación debe ser un número válido' })
  @Min(0, { message: 'La calificación mínima permitida es 0' })
  @Max(5, { message: 'La calificación máxima permitida es 5' })
  qualification: number

  @ApiProperty({
    example: 'Comentario de ejemplo',
    required: true,
    description: 'Comentario breve del producto',
  })
  @IsString()
  @MaxLength(250)
  comment: string
}
