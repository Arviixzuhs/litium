import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class CategoryDto {
  @ApiProperty({ example: 'Electrodomesticos', description: 'Nombre de la categoría' })
  @IsString()
  @MaxLength(50)
  name: string
}
