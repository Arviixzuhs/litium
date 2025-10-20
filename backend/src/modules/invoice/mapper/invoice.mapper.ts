import { Invoice, Prisma } from '@prisma/client'
import { BaseMapper } from '@/common/utils/base.mapper'
import { ProductMapper } from '@/modules/product/mapper/product.mapper'
import { InvoiceResponseDto } from '../dto/invoice-reponse.dto'

export type InvoicetWithRelations = Prisma.InvoiceGetPayload<{
  include: {
    products: {
      include: {
        product: true
      }
    }
    seller: true
  }
}>

export class InvoiceMapper extends BaseMapper<Invoice | InvoicetWithRelations, InvoiceResponseDto> {
  private productMapper = new ProductMapper()
  modelToDto(model: Invoice | InvoicetWithRelations): InvoiceResponseDto {
    return {
      id: model.id,
      rif: model.rif ?? null,
      name: model.name,
      phone: model.phone ?? null,
      total: model.total ?? 0,
      seller: 'seller' in model ? model.seller : null,
      address: model.address ?? null,
      sellerId: model.sellerId,
      products:
        'products' in model
          ? this.productMapper.modelsToDtos(model.products.map((item) => item.product))
          : [],
      createdAt: model.createdAt,
    }
  }
}
