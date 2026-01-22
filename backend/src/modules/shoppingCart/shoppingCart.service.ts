import { Page } from '@/types/Page'
import { PrismaService } from '@/prisma/prisma.service'
import { InvoiceMapper } from '@/modules/invoice/mapper/invoice.mapper'
import { InvoiceService } from '../invoice/invoice.service'
import { ProductsService } from '@/modules/product/product.service'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartFiltersDto } from './dto/shoppingcart-filters.dto'
import { ShoppingCartProductDto } from './dto/shoppingcart-product.dto'
import { ShoppingCart, ShoppingCartStatus } from '@prisma/client'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  ShoppingCartSpecificationBuild,
  ShoppingCartSpecificationBuilder,
} from './repositories/shoppingCart.specificationBuilder'
import { CheckoutDto } from './dto/checkout.dto'
import { FileService } from '../file/file.service'

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly productService: ProductsService,
    private readonly invoiceService: InvoiceService,
  ) {}

  private invoiceMapper = new InvoiceMapper()

  findAll(filters: ShoppingCartFiltersDto, userId: number) {
    const query = new ShoppingCartSpecificationBuilder()
      .withIsDeleted(false)
      .withProductName(filters.productName)
      .withSearchValue(filters.searchValue)
      .withPagination(filters.page, filters.size)
      .withUserId(filters.mine && userId)
      .withInclude({
        user: true,
        invoice: true,
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
        invoice: true,
        payment: true,
        delivery: {
          include: {
            address: true,
            recipient: true,
          },
        },
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

    await this.updateShoppingCartStatus(shoppingCartId, ShoppingCartStatus.PAID)
    const total = await this.calcTotal(shoppingCartId)

    const invoice = await this.invoiceService.create({
      name: shoppingCart.name,
      total,
      sellerId,
      shoppingCartId,
    })

    return this.invoiceMapper.modelToDto(invoice)
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

  async checkoutCart(shoppingCartId: number, dto: CheckoutDto, image?: Express.Multer.File) {
    const cart = await this.prisma.shoppingCart.findFirst({
      where: {
        id: shoppingCartId,
        isDeleted: false,
      },
    })

    if (!cart) {
      throw new NotFoundException('Carrito no encontrado')
    }

    let imageUrl = ''
    if (image) {
      this.fileService.validateFileType(image, ['image/jpeg', 'image/png', 'image/webp'])
      imageUrl = this.fileService.generateFileUrl(image.filename)
    }

    return this.prisma.$transaction(async (tx) => {
      const recipient = await tx.recipient.create({
        data: dto.recipient,
      })

      const address = await tx.deliveryAddress.create({
        data: dto.delivery.address,
      })

      const delivery = await tx.delivery.create({
        data: {
          method: dto.delivery.method,
          agency: dto.delivery.agency,
          recipientId: recipient.id,
          addressId: address.id,
        },
      })

      const payment = await tx.payment.create({
        data: {
          method: dto.payment.method,
          amount: dto.payment.amount,
          imageUrl,
          reference: dto.payment.reference,
          paymentDate: new Date(dto.payment.paymentDate),
        },
      })

      return tx.shoppingCart.update({
        where: { id: shoppingCartId },
        data: {
          deliveryId: delivery.id,
          paymentId: payment.id,
        },
      })
    })
  }

  async create(dto: CreateShoppingCartDto, userId: number) {
    if (dto.products.length === 0)
      throw new BadRequestException('Debes agregar productos al carrito')

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
    const [shoppingCarts, totalItems] = await this.prisma.$transaction([
      this.prisma.shoppingCart.findMany(query),
      this.prisma.shoppingCart.count({
        where: query.where,
      }),
    ])

    const page = query.skip !== undefined ? Math.floor(query.skip / (query.take ?? 10)) : 0
    const size = query.take ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: shoppingCarts,
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
