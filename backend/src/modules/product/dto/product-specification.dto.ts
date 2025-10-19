import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class ProductSpecificationDto {
  @ApiProperty({ example: 'Color', description: 'Título de la especificación' })
  @IsString()
  @MaxLength(100)
  title: string

  @ApiProperty({ example: 'Azul', description: 'Valor de la especificación' })
  @IsString()
  @MaxLength(180)
  value: string
}
