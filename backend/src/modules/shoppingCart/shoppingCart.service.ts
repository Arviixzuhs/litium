import { EditType } from './dto/edit-product-quantity.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { ShoppingCartStatus } from '@prisma/client'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartProductDto } from './dto/shoppingcart-product.dto'
import { ShoppingCartSpecificationBuilder } from './repositories/shoppingCart.specificationBuilder'
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  findAll(userId: number, page: number, size: number) {
    const query = new ShoppingCartSpecificationBuilder()
      .withIsDeleted(false)
      .withPagination(page, size)
      .withUserId(userId)
      .withInclude({
        products: true,
      })
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.prisma.shoppingCart.findMany(query)
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

  async findBy(id: number) {
    const shoppingCart = await this.prisma.shoppingCart.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    })

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
      await this.createShoppingCartProducts(dto.products, shoppingCart.id)
    }
  }

  async delete(shoppingCartId: number, userId: number) {
    const shoppingCart = await this.findBy(shoppingCartId)

    if (shoppingCart.userId !== userId) {
      throw new HttpException(
        'Solo el autor del carrito lo puede eliminar',
        HttpStatus.UNAUTHORIZED,
      )
    }

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
}
