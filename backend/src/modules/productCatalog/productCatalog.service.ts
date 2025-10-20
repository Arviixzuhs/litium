import { Page } from '@/types/Page'
import { PrismaService } from '@/prisma/prisma.service'
import { CatalogMapper } from './mapper/productCatalog.mapper'
import { CreateCatalogDto } from './dto/create-catalog.dto'
import { UpdateCatalogDto } from './dto/update-catalog.dto'
import { CatalogFiltersDto } from './dto/catalog-filters.dto'
import { CatalogResponseDto } from './dto/catalog-response.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ProductCatalogSpecificationBuild,
  ProductCatalogSpecificationBuilder,
} from './repositories/productCatalog.specificationBuilder'

@Injectable()
export class ProductCatalogService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly catalogMapper = new CatalogMapper()

  async findAll(filters: CatalogFiltersDto): Promise<Page<CatalogResponseDto>> {
    const query = new ProductCatalogSpecificationBuilder()
      .withName(filters.name)
      .withIsDeleted(false)
      .withPagination(filters.page, filters.size)
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query, filters)
  }

  async create(newCatalog: CreateCatalogDto): Promise<CatalogResponseDto> {
    const { productIds, ...data } = newCatalog

    const saved = await this.prisma.catalog.create({
      data,
    })

    await this.assignProductsToCatalog(saved.id, productIds)

    return this.catalogMapper.modelToDto(saved)
  }

  async findBy(id: number): Promise<CatalogResponseDto> {
    const catalog = await this.prisma.catalog.findFirst({
      where: {
        id,
      },
    })

    if (!catalog) throw new NotFoundException('Catálogo no encontrado')
    return this.catalogMapper.modelToDto(catalog)
  }

  async update(catalogId: number, dto: UpdateCatalogDto): Promise<CatalogResponseDto> {
    await this.findBy(catalogId)
    const { productIds, ...data } = dto

    await this.updateProductCatalogs(catalogId, productIds)

    const edited = await this.prisma.catalog.update({
      where: {
        id: catalogId,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.catalogMapper.modelToDto(edited)
  }

  async delete(catalogId: number): Promise<CatalogResponseDto> {
    await this.findBy(catalogId)

    const deleted = await this.prisma.catalog.update({
      where: {
        id: catalogId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })

    return this.catalogMapper.modelToDto(deleted)
  }

  private async updateProductCatalogs(catalogId: number, productIds: number[]) {
    await this.findBy(catalogId)
    await this.removeAllProductsFromCatalog(catalogId)
    await this.assignProductsToCatalog(catalogId, productIds)
  }

  private removeAllProductsFromCatalog(catalogId: number) {
    return this.prisma.product_x_Catalog.deleteMany({
      where: {
        catalogId,
      },
    })
  }

  private assignProductsToCatalog(catalogId: number, productIds: number[]) {
    return this.prisma.product_x_Catalog.createMany({
      data: productIds.map((productId) => ({
        catalogId,
        productId,
      })),
    })
  }

  private async page(
    query: ProductCatalogSpecificationBuild,
    filters: CatalogFiltersDto,
  ): Promise<Page<CatalogResponseDto>> {
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
      content: this.catalogMapper.modelsToDtos(catalogs),
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
