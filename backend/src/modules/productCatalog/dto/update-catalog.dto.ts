import { PartialType } from '@nestjs/swagger'
import { CatalogDto } from './catalog.dto'

export class UpdateCatalogDto extends PartialType(CatalogDto) {}
