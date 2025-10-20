import { Invoice, Prisma } from '@prisma/client'
import { BaseMapper } from '@/common/utils/base.mapper'
import { ProductMapper } from '@/modules/product/mapper/product.mapper'
import { InvoiceResponseDto } from '../dto/invoice-reponse.dto'

export type InvoiceWithRelations = Prisma.InvoiceGetPayload<{
  include: {
    shoppingCart: {
      include: {
        products: {
          include: {
            product: true
          }
        }
        user: true
      }
    }
    seller: true
  }
}>

export class InvoiceMapper extends BaseMapper<Invoice | InvoiceWithRelations, InvoiceResponseDto> {
  private productMapper = new ProductMapper()

  modelToDto(model: Invoice | InvoiceWithRelations): InvoiceResponseDto {
    const firstCart =
      'shoppingCart' in model && model.shoppingCart.length > 0 ? model.shoppingCart[0] : null

    const sellerName =
      'seller' in model && model.seller ? `${model.seller.name} ${model.seller.lastName}` : null

    const buyerName = firstCart?.user ? `${firstCart.user.name} ${firstCart.user.lastName}` : null

    return {
      id: model.id,
      rif: model.rif ?? null,
      name: model.name,
      phone: model.phone ?? null,
      total: model.total ?? 0,
      sellerId: model.sellerId,
      sellerName,
      buyerName,
      address: model.address ?? null,
      products: firstCart
        ? this.productMapper.modelsToDtos(firstCart.products.map((item) => item.product))
        : [],
      createdAt: model.createdAt,
    }
  }
}
