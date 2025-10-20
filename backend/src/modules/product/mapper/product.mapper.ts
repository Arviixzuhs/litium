import { BaseMapper } from '@/common/utils/base.mapper'
import { CategoryMapper } from '@/modules/productCategory/mapper/productCategory.mapper'
import { SupplierMapper } from '@/modules/productSupplier/mapper/productSupplier.mapper'
import { Prisma, Product } from '@prisma/client'
import { ProductResponseDto } from '../dto/product-response.dto'

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    product_x_supplier: {
      include: {
        supplier: true
      }
    }
    categories: {
      include: {
        category: true
      }
    }
    _count: {
      select: {
        comments: true
      }
    }
    specifications: true
  }
}>

export class ProductMapper extends BaseMapper<Product | ProductWithRelations, ProductResponseDto> {
  private supplierMapper = new SupplierMapper()
  private categoryMapper = new CategoryMapper()

  modelToDto(model: Product | ProductWithRelations, qualification?: number): ProductResponseDto {
    return {
      id: model.id,
      name: model.name,
      show: model.show,
      stock: model.stock,
      image: model.image,
      price: model.price,
      suppliers:
        'product_x_supplier' in model
          ? model.product_x_supplier.map((item) => this.supplierMapper.modelToDto(item.supplier))
          : [],
      categories:
        'categories' in model
          ? model.categories.map((item) => this.categoryMapper.modelToDto(item.category))
          : [],
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      description: model.description,
      qualification: qualification || 0,
      commentsCount: '_count' in model && model._count ? model._count.comments : 0,
      specifications: 'specifications' in model ? model.specifications : [],
    }
  }
}
