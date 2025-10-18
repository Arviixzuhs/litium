import { Page } from '@/types/Page'
import { Catalog } from '@prisma/client'
import { CatalogDto } from './dto/catalog.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { UpdateCatalogDto } from './dto/update-catalog.dto'
import { CatalogFiltersDto } from './dto/catalog-filters.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ProductCatalogSpecificationBuild,
  ProductCatalogSpecificationBuilder,
} from './repositories/productCatalog.specificationBuilder'

@Injectable()
export class ProductCatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  async findAll(filters: CatalogFiltersDto): Promise<Page<Catalog>> {
    const query = new ProductCatalogSpecificationBuilder()
      .withName(filters.name)
      .withIsDeleted(false)
      .withPagination(filters.page, filters.size)
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query, filters)
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
    const catalog = await this.prisma.catalog.findFirst({
      where: {
        id,
      },
    })

    if (!catalog) throw new NotFoundException('Catálogo no encontrado')
    return catalog
  }

  async update(catalogId: number, dto: UpdateCatalogDto) {
    await this.findBy(catalogId)

    return this.prisma.catalog.update({
      where: {
        id: catalogId,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
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

  private async page(
    query: ProductCatalogSpecificationBuild,
    filters: CatalogFiltersDto,
  ): Promise<Page<Catalog>> {
    const [catalogs, totalItems] = await this.prisma.$transaction([
      this.prisma.catalog.findMany(query),
      this.prisma.catalog.count({
        where: query.where,
      }),
    ])

    const page = filters.page ?? 1
    const size = filters.size ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: catalogs,
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
