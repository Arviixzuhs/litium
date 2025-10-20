import { Page } from '@/types/Page'
import { ShoppingCart } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartFiltersDto } from './dto/shoppingcart-filters.dto'
import { ShoppingCartProductDto } from './dto/shoppingcart-product.dto'
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import {
  ShoppingCartSpecificationBuild,
  ShoppingCartSpecificationBuilder,
} from './repositories/shoppingCart.specificationBuilder'

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  findAll(filters: ShoppingCartFiltersDto) {
    const query = new ShoppingCartSpecificationBuilder()
      .withIsDeleted(false)
      .withProductName(filters.productName)
      .withPagination(filters.page, filters.size)
      .withInclude({
        products: {
          include: {
            product: true,
          },
        },
      })
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query)
  }

  async findBy(id: number, userId: number) {
    const shoppingCart = await this.prisma.shoppingCart.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    if (shoppingCart.userId !== userId) {
      throw new HttpException('Solo el autor del carrito lo puede ver', HttpStatus.UNAUTHORIZED)
    }

    if (!shoppingCart) throw new NotFoundException('Carrito de compras no encontrado')
    return shoppingCart
  }

  async create(dto: CreateShoppingCartDto, userId: number) {
    const shoppingCart = await this.prisma.shoppingCart.create({
      data: {
        name: dto.name,
        userId,
      },
    })

    if (dto.products.length > 0) {
      await this.createShoppingCartProducts(userId, dto.products, shoppingCart.id)
    }

    return shoppingCart
  }

  async delete(shoppingCartId: number, userId: number) {
    await this.findBy(shoppingCartId, userId)

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

  private async createShoppingCartProducts(
    userId: number,
    products: ShoppingCartProductDto[],
    shoppingCartId: number,
  ) {
    await this.findBy(shoppingCartId, userId)

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
