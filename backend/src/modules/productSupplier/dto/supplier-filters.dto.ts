import { PaginationDto } from '@/common/dto/pagination.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class SupplierFiltersDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtra proveedores por (nombre, email, teléfono)' })
  @IsOptional()
  @IsString()
  searchValue?: string
}
