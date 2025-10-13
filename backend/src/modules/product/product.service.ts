import { Page } from '@/types/Page'
import { Product } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductFilterDto } from './dto/productfilters.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ProductSpecificationBuild,
  ProductSpecificationBuilder,
} from './repositories/product.specificationBuilder'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: dto,
    })
  }

  async findAll(filters: ProductFilterDto): Promise<Page<Product>> {
    const query = new ProductSpecificationBuilder()
      .withName(filters.name)
      .withCatalogId(filters.catalogId)
      .withIsDeleted(false)
      .withOrderBy({ createdAt: 'desc' })
      .withInclude({ images: true })
      .withPagination(filters.page, filters.size)
      .withPriceBetween(filters.minPrice, filters.maxPrice)
      .withCategoryName(filters.category)
      .withCreatedAtBetween(filters.fromDate, filters.toDate)
      .build()

    return this.page(query, filters)
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

  private async page(
    query: ProductSpecificationBuild,
    filters: ProductFilterDto,
  ): Promise<Page<Product>> {
    const [products, totalItems] = await this.prisma.$transaction([
      this.prisma.product.findMany(query),
      this.prisma.product.count({
        where: query.where,
      }),
    ])

    const page = filters.page ?? 1
    const size = filters.size ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: products,
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
