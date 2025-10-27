import { Transform } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsOptional } from 'class-validator'

export class SalesReportDto {
  @ApiPropertyOptional({ description: 'Filtra facturas creadas desde esta fecha (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  fromDate?: string

  @ApiPropertyOptional({ description: 'Filtra facturas creadas hasta esta fecha (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  toDate?: string
}
