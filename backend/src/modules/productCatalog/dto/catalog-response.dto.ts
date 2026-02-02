import { ApiProperty } from '@nestjs/swagger'
import { CreateCatalogDto } from './create-catalog.dto'

export class CatalogResponseDto extends CreateCatalogDto {
  @ApiProperty({ description: 'ID del catalogo' })
  id: number

  @ApiProperty({ description: 'Fecha de creación', required: false })
  createdAt?: Date

  @ApiProperty({ description: 'Fecha de última actualización', required: false })
  updatedAt?: Date

  @ApiProperty({ description: 'Cantidad de productos en el catálogo', required: false })
  productCount: number
}
