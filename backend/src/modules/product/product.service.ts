import { Page } from '@/types/Page'
import { FileService } from '@/modules/file/file.service'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductMapper } from './mapper/product.mapper'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductFilterDto } from './dto/product-filters.dto'
import { ShoppingCartStatus } from '@prisma/client'
import { ProductResponseDto } from './dto/product-response.dto'
import { ProductCommentService } from '../productComment/productComment.service'
import { ProductSpecificationDto } from './dto/product-specification.dto'
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  ProductSpecificationBuild,
  ProductSpecificationBuilder,
} from './repositories/product.specificationBuilder'

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    @Inject(forwardRef(() => ProductCommentService))
    private readonly productCommentService: ProductCommentService,
  ) {}

  private productMapper = new ProductMapper()

  async create(dto: CreateProductDto, images?: Express.Multer.File[]) {
    const { categoryIds, supplierIds, specifications, ...data } = dto

    const savedProduct = await this.prisma.product.create({
      data,
    })

    if (categoryIds && categoryIds.length > 0) {
      await this.assignCategoriesToProduct(savedProduct.id, categoryIds)
    }

    if (supplierIds && supplierIds.length > 0) {
      await this.assignSuppliersToProduct(savedProduct.id, supplierIds)
    }

    if (specifications && specifications.length > 0) {
      await this.asignSpecificationsToProduct(savedProduct.id, specifications)
    }

    if (images && images.length > 0) {
      await this.asignProductImages(savedProduct.id, images)
    }

    return this.productMapper.modelToDto(savedProduct)
  }

  async findUnreviewedProductsCount(userId: number) {
    return this.prisma.product.count({
      where: {
        shoppingCarts: {
          some: {
            shoppingCart: {
              userId,
              status: ShoppingCartStatus.PAID,
            },
          },
        },
        comments: {
          none: {
            userId,
          },
        },
      },
    })
  }

  async findAll(filters: ProductFilterDto): Promise<Page<ProductResponseDto>> {
    const query = new ProductSpecificationBuilder()
      .withName(filters.name)
      .withCatalogId(filters.catalogId)
      .withIsDeleted(false)
      .withNotInCatalogId(filters.excludeCatalogId)
      .withOrderBy({ createdAt: 'desc' })
      .withCategoryIds(filters.categoryIds)
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

    return this.page(query)
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
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
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

  async update(id: number, dto: UpdateProductDto, images?: Express.Multer.File[]) {
    await this.existsById(id)
    const { categoryIds, supplierIds, specifications, existingImageURLs, ...newData } = dto

    await this.updateProductCategories(id, categoryIds || [])
    await this.updateProductSuppliers(id, supplierIds || [])
    await this.updateProductSpecifications(id, specifications || [])
    await this.updateProductImages(id, existingImageURLs, images)

    const updated = await this.prisma.product.update({
      where: { id },
      data: { ...newData, updatedAt: new Date() },
    })

    return this.productMapper.modelToDto(updated)
  }

  private async updateProductImages(
    productId: number,
    existingImageURLs: string[],
    images?: Express.Multer.File[],
  ) {
    await this.prisma.imageProduct.deleteMany({ where: { productId } })
    if (images && images.length > 0) {
      await this.asignProductImages(productId, images)
    }
    if (existingImageURLs && existingImageURLs.length > 0) {
      await this.prisma.imageProduct.createMany({
        data: existingImageURLs.map((url) => ({
          productId,
          imageURL: url,
        })),
      })
    }
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

  private async asignProductImages(productId: number, images: Express.Multer.File[]) {
    const imageData = images.map((file) => {
      this.fileService.validateFileType(file, ['image/jpeg', 'image/png', 'image/webp'])
      const url = this.fileService.generateFileUrl(file.filename) // ya existe en disco
      return {
        productId,
        imageURL: url,
      }
    })

    await this.prisma.imageProduct.createMany({
      data: imageData,
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

  private async page(query: ProductSpecificationBuild): Promise<Page<ProductResponseDto>> {
    const [products, totalItems] = await this.prisma.$transaction([
      this.prisma.product.findMany(query),
      this.prisma.product.count({
        where: query.where,
      }),
    ])

    const page = query.skip !== undefined ? Math.floor(query.skip / (query.take ?? 10)) : 0
    const size = query.take ?? 10
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
