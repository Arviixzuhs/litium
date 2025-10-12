import { CatalogDto } from './dto/catalog.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '../product/product.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductCatalogSpecificationBuilder } from './repositories/productCatalog.specificationBuilder'

@Injectable()
export class ProductCatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  private readonly productCatalogSpecificationBuilder: ProductCatalogSpecificationBuilder

  async findAll(name: string, page: number, size: number) {
    const query = this.productCatalogSpecificationBuilder
      .withName(name)
      .withIsDeleted(false)
      .withPagination(page, size)
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.prisma.catalog.findMany(query)
  }

  create(data: CatalogDto) {
    return this.prisma.catalog.create({
      data,
    })
  }

  async assignProductToCatalog(catalogId: number, productId: number) {
    await this.productsService.findBy(productId)
    await this.findBy(catalogId)

    return this.prisma.product_x_Catalog.create({
      data: {
        productId,
        catalogId,
      },
    })
  }

  async findBy(id: number) {
    const comment = await this.prisma.catalog.findFirst({
      where: {
        id,
      },
    })

    if (!comment) throw new NotFoundException('Catálogo no encontrado')
    return comment
  }

  async update(catalogId: number, data: CatalogDto) {
    await this.findBy(catalogId)

    return this.prisma.catalog.update({
      where: {
        id: catalogId,
      },
      data,
    })
  }

  async delete(catalogId: number) {
    await this.findBy(catalogId)

    return this.prisma.catalog.update({
      where: {
        id: catalogId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }
}
