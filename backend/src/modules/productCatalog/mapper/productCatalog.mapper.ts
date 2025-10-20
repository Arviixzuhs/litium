import { Catalog } from '@prisma/client'
import { BaseMapper } from '@/common/utils/base.mapper'
import { CatalogResponseDto } from '../dto/catalog-response.dto'

export class CatalogMapper extends BaseMapper<Catalog, CatalogResponseDto> {
  modelToDto(model: Catalog): CatalogResponseDto {
    return {
      id: model.id,
      name: model.name,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
      description: model.description,
    }
  }
}
