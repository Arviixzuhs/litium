import { Page } from '@/types/Page'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductMapper } from './mapper/product.mapper'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductFilterDto } from './dto/product-filters.dto'
import { ProductResponseDto } from './dto/product-response.dto'
import { ProductSpecificationDto } from './dto/product-specification.dto'
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  ProductSpecificationBuild,
  ProductSpecificationBuilder,
} from './repositories/product.specificationBuilder'
import { ProductCommentService } from '../productComment/productComment.service'

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ProductCommentService))
    private readonly productCommentService: ProductCommentService,
  ) {}

  private productMapper = new ProductMapper()

  async create(dto: CreateProductDto) {
    const { categoryIds, supplierIds, specifications, ...data } = dto

    const savedProduct = await this.prisma.product.create({
      data,
    })

    await this.assignCategoriesToProduct(savedProduct.id, categoryIds)
    await this.assignSuppliersToProduct(savedProduct.id, supplierIds)
    await this.asignSpecificationsToProduct(savedProduct.id, specifications)

    return this.productMapper.modelToDto(savedProduct)
  }

  async findAll(filters: ProductFilterDto): Promise<Page<ProductResponseDto>> {
    const query = new ProductSpecificationBuilder()
      .withName(filters.name)
      .withCatalogId(filters.catalogId)
      .withIsDeleted(false)
      .withOrderBy({ createdAt: 'desc' })
      .withInclude({
        images: true,
        product_x_supplier: {
          include: {
            supplier: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        specifications: true,
      })
      .withPagination(filters.page, filters.size)
      .withPriceBetween(filters.minPrice, filters.maxPrice)
      .withCategoryName(filters.category)
      .withCreatedAtBetween(filters.fromDate, filters.toDate)
      .build()

    return this.page(query, filters)
  }

  async existsById(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id },
    })
    if (!product) throw new NotFoundException('Producto no encontrado')
  }

  async findBy(id: number): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        specifications: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    const qualification = await this.productCommentService.calcQualification(id)

    if (!product) throw new NotFoundException('Producto no encontrado')
    return this.productMapper.modelToDto(product, qualification)
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.existsById(id)
    const { categoryIds, supplierIds, specifications, ...newData } = dto

    await this.updateProductCategories(id, categoryIds)
    await this.updateProductSuppliers(id, supplierIds)
    await this.updateProductSpecifications(id, specifications)

    const updated = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...newData,
        updatedAt: new Date(),
      },
    })

    return this.productMapper.modelToDto(updated)
  }

  private async updateProductSpecifications(
    productId: number,
    specifications: ProductSpecificationDto[],
  ) {
    await this.existsById(productId)
    await this.deleteAllSpecificationsFromProduct(productId)
    await this.asignSpecificationsToProduct(productId, specifications)
  }

  private async deleteAllSpecificationsFromProduct(productId: number) {
    return this.prisma.productSpecification.deleteMany({
      where: {
        productId,
      },
    })
  }

  private async asignSpecificationsToProduct(
    productId: number,
    specifications: ProductSpecificationDto[],
  ) {
    return this.prisma.productSpecification.createMany({
      data: specifications.map((specification) => ({
        productId,
        title: specification.title,
        value: specification.value,
      })),
    })
  }

  private async updateProductCategories(productId: number, categoryIds: number[]) {
    await this.existsById(productId)
    await this.deleteAllCategoriesFromProduct(productId)
    await this.assignCategoriesToProduct(productId, categoryIds)
  }

  private deleteAllCategoriesFromProduct(productId: number) {
    return this.prisma.product_x_Category.deleteMany({
      where: {
        productId,
      },
    })
  }

  private assignCategoriesToProduct(productId: number, categoryIds: number[]) {
    return this.prisma.product_x_Category.createMany({
      data: categoryIds.map((categoryId) => ({
        categoryId,
        productId,
      })),
    })
  }

  private async updateProductSuppliers(productId: number, supplierIds: number[]) {
    await this.existsById(productId)
    await this.deleteAllSuppliersFromProduct(productId)
    await this.assignSuppliersToProduct(productId, supplierIds)
  }

  private deleteAllSuppliersFromProduct(productId: number) {
    return this.prisma.product_x_Supplier.deleteMany({
      where: {
        productId,
      },
    })
  }

  private async assignSuppliersToProduct(productId: number, supplierIds: number[]) {
    return this.prisma.product_x_Supplier.createMany({
      data: supplierIds.map((supplierId) => ({
        supplierId,
        productId,
      })),
    })
  }

  async remove(id: number) {
    await this.existsById(id)
    const deleted = await this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })

    return this.productMapper.modelToDto(deleted)
  }

  private async page(
    query: ProductSpecificationBuild,
    filters: ProductFilterDto,
  ): Promise<Page<ProductResponseDto>> {
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
      content: this.productMapper.modelsToDtos(products),
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
