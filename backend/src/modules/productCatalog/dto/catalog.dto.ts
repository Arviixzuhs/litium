import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CatalogDto {
  @ApiProperty({ example: 'Electrodomesticos', description: 'Nombre del catálogo' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(50)
  name: string

  @ApiProperty({
    example: 'Electrodomesticos de color azul',
    description: 'Descripción del catálogo',
  })
  @IsString()
  @MaxLength(50)
  description: string
}
