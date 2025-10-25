import { Page } from '@/types/Page'
import { PrismaService } from '@/prisma/prisma.service'
import { InvoiceService } from '../invoice/invoice.service'
import { ProductsService } from '@/modules/product/product.service'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartFiltersDto } from './dto/shoppingcart-filters.dto'
import { ShoppingCartProductDto } from './dto/shoppingcart-product.dto'
import { ShoppingCart, ShoppingCartStatus } from '@prisma/client'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import {
  ShoppingCartSpecificationBuild,
  ShoppingCartSpecificationBuilder,
} from './repositories/shoppingCart.specificationBuilder'

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
    private readonly invoiceService: InvoiceService,
  ) {}

  findAll(filters: ShoppingCartFiltersDto) {
    const query = new ShoppingCartSpecificationBuilder()
      .withIsDeleted(false)
      .withProductName(filters.productName)
      .withPagination(filters.page, filters.size)
      .withInclude({
        products: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      })
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query)
  }

  async existsById(id: number) {
    const choppingCart = await this.prisma.shoppingCart.findFirst({
      where: { id },
    })
    if (!choppingCart) throw new NotFoundException('Carrito no encontrado')
  }

  async findBy(id: number) {
    const shoppingCart = await this.prisma.shoppingCart.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    })

    if (!shoppingCart) throw new NotFoundException('Carrito de compras no encontrado')
    return shoppingCart
  }

  async confirmPay(shoppingCartId: number, sellerId: number) {
    const shoppingCart = await this.findBy(shoppingCartId)

    const updated = await this.updateShoppingCartStatus(shoppingCartId, ShoppingCartStatus.PAID)
    const total = await this.calcTotal(shoppingCartId)

    await this.invoiceService.create({
      name: shoppingCart.name,
      total,
      sellerId,
      shoppingCartId,
    })

    return updated
  }

  async updateShoppingCartStatus(shoppingCartId: number, newStatus: ShoppingCartStatus) {
    const shoppingCart = await this.findBy(shoppingCartId)
    if (shoppingCart.status === newStatus) {
      throw new ConflictException('El carrito de compras ya tiene ese status')
    }

    return this.prisma.shoppingCart.update({
      where: {
        id: shoppingCartId,
      },
      data: {
        status: newStatus,
      },
    })
  }

  async create(dto: CreateShoppingCartDto, userId: number) {
    const shoppingCart = await this.prisma.shoppingCart.create({
      data: {
        name: dto.name,
        userId,
      },
    })

    if (dto.products.length > 0) {
      await this.createShoppingCartProducts(dto.products, shoppingCart.id)
    }

    return shoppingCart
  }

  async delete(shoppingCartId: number) {
    await this.findBy(shoppingCartId)

    return this.prisma.shoppingCart.update({
      where: {
        id: shoppingCartId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }

  private async calcTotal(shoppingCartId: number): Promise<number> {
    const shoppingCart = await this.prisma.shoppingCart.findUnique({
      where: { id: shoppingCartId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!shoppingCart) throw new NotFoundException('Carrito no encontrado')

    const total = shoppingCart.products.reduce(
      (sum, item) => sum + item.quantity * (item.product.price ?? 0),
      0,
    )

    return total
  }

  private async createShoppingCartProducts(
    products: ShoppingCartProductDto[],
    shoppingCartId: number,
  ) {
    await this.findBy(shoppingCartId)

    await Promise.all(products.map((item) => this.productService.findBy(item.productId)))

    const data = products.map((item) => ({
      ...item,
      shoppingCartId,
    }))

    return this.prisma.shoppingCartProduct.createMany({ data })
  }

  private async page(query: ShoppingCartSpecificationBuild): Promise<Page<ShoppingCart>> {
    const [categories, totalItems] = await this.prisma.$transaction([
      this.prisma.shoppingCart.findMany(query),
      this.prisma.shoppingCart.count({
        where: query.where,
      }),
    ])

    const page = query.skip !== undefined ? Math.floor(query.skip / (query.take ?? 10)) : 0
    const size = query.take ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: categories,
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
