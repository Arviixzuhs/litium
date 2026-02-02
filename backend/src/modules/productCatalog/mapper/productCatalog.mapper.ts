import { Catalog, Prisma } from '@prisma/client'
import { BaseMapper } from '@/common/utils/base.mapper'
import { CatalogResponseDto } from '../dto/catalog-response.dto'

export type CatalogWithRelations = Prisma.CatalogGetPayload<{
  include: {
    _count: {
      select: {
        product_x_catalog: true
      }
    }
  }
}>

export class CatalogMapper extends BaseMapper<Catalog | CatalogWithRelations, CatalogResponseDto> {
  modelToDto(model: Catalog | CatalogWithRelations): CatalogResponseDto {
    return {
      id: model.id,
      name: model.name,
      updatedAt: model.updatedAt,
      createdAt: model.createdAt,
      description: model.description,
      productCount: '_count' in model && model._count ? model._count.product_x_catalog : 0,
    }
  }
}
