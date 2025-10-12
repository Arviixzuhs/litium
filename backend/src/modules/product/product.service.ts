import { PrismaService } from '@/prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductFilterDto } from './dto/productfilters.dto'
import { ProductSpecificationBuilder } from './repositories/product.specificationBuilder'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly productSpecificationBuilder: ProductSpecificationBuilder

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: dto,
    })
  }

  findAll(filters: ProductFilterDto) {
    const query = this.productSpecificationBuilder
      .withName(filters.name)
      .withCatalogId(filters.catalogId)
      .withIsDeleted(false)
      .withPagination(filters.page, filters.size)
      .withPriceBetween(filters.minPrice, filters.maxPrice)
      .withCategoryName(filters.category)
      .withCreatedAtBetween(filters.fromDate, filters.toDate)
      .build()

    return this.prisma.product.findMany(query)
  }

  async findBy(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    })

    if (!product) throw new NotFoundException('Producto no encontrado')
    return product
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findBy(id)

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    })
  }

  async remove(id: number) {
    await this.findBy(id)
    return this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }
}
