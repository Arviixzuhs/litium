import { Page } from '@/types/Page'
import { EditType } from './dto/edit-product-quantity.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { FindShoppingCartDto } from './dto/find-shoppingcart.dto'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartProductDto } from './dto/shoppingcart-product.dto'
import { ShoppingCart, ShoppingCartStatus } from '@prisma/client'
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

  findAll(userId: number, filters: FindShoppingCartDto) {
    const query = new ShoppingCartSpecificationBuilder()
      .withUserId(userId)
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

    return this.page(query, filters)
  }

  async confirmShoppingCart(userId: number) {
    const currentShoppingCart = await this.findCurrentShoppingCart(userId)

    if (currentShoppingCart.status === ShoppingCartStatus.CONFIRMED) {
      throw new HttpException('El carrito ya está confirmado', HttpStatus.CONFLICT)
    }

    return this.prisma.shoppingCart.update({
      where: {
        id: currentShoppingCart.id,
      },
      data: {
        status: ShoppingCartStatus.CONFIRMED,
      },
    })
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

  async editProductQuantity(userId: number, productId: number, editType: EditType) {
    const currentShoppingCart = await this.findCurrentShoppingCart(userId)

    const cartProduct = await this.prisma.shoppingCartProduct.findFirst({
      where: {
        shoppingCartId: currentShoppingCart.id,
        productId,
      },
    })

    if (!cartProduct) {
      throw new NotFoundException('Producto no encontrado en el carrito')
    }

    let newQuantity = cartProduct.quantity

    if (editType === EditType.INCREMENT) {
      newQuantity += 1
    } else if (editType === EditType.DECREMENT) {
      newQuantity = Math.max(0, newQuantity - 1)
    }

    return this.prisma.shoppingCartProduct.update({
      where: { id: cartProduct.id },
      data: { quantity: newQuantity },
    })
  }

  async removeProduct(shoppingCartProductId: number) {
    const product = await this.prisma.shoppingCartProduct.findUnique({
      where: { id: shoppingCartProductId },
    })

    if (!product) {
      throw new NotFoundException('Producto no encontrado en el carrito')
    }

    return this.prisma.shoppingCartProduct.delete({
      where: { id: shoppingCartProductId },
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

  private async findCurrentShoppingCart(userId: number) {
    const query = new ShoppingCartSpecificationBuilder()
      .withIsDeleted(false)
      .withUserId(userId)
      .withInclude({
        products: true,
      })
      .withStatus(ShoppingCartStatus.EDITING)
      .withOrderBy({ createdAt: 'desc' })
      .build()

    const shoppingCart = await this.prisma.shoppingCart.findFirst(query)
    if (!shoppingCart) throw new NotFoundException('Carrito no encontrado')
    return shoppingCart
  }

  private async page(
    query: ShoppingCartSpecificationBuild,
    filters: FindShoppingCartDto,
  ): Promise<Page<ShoppingCart>> {
    const [categories, totalItems] = await this.prisma.$transaction([
      this.prisma.shoppingCart.findMany(query),
      this.prisma.shoppingCart.count({
        where: query.where,
      }),
    ])

    const page = filters.page ?? 1
    const size = filters.size ?? 10
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
