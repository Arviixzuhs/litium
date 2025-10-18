import { Page } from '@/types/Page'
import { Category } from '@prisma/client'
import { CategoryDto } from './dto/category.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { CategoryFiltersDto } from './dto/category-filters.dto'
import { AssignProductToCategoryDto } from './dto/assign-product.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CategorySpecificationBuild,
  CategorySpecificationBuilder,
} from './repositories/category.specificationBuilder'

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  async findAll(filters: CategoryFiltersDto): Promise<Page<Category>> {
    const query = new CategorySpecificationBuilder()
      .withName(filters.name)
      .withIsDeleted(false)
      .withOrderBy({ createdAt: 'desc' })
      .withPagination(filters.page, filters.size)
      .build()

    return this.page(query, filters)
  }

  async findBy(id: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
      },
    })

    if (!category) throw new NotFoundException('Categoría no encontrada')
    return category
  }

  create(dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
    })
  }

  async assignProductToCategory(dto: AssignProductToCategoryDto) {
    await this.productService.findBy(dto.productId)
    await this.findBy(dto.categoryId)

    return this.prisma.product_x_Category.create({
      data: {
        productId: dto.productId,
        categoryId: dto.categoryId,
      },
    })
  }

  async update(categoryId: number, data: CategoryDto) {
    await this.findBy(categoryId)

    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    })
  }

  async delete(categoryId: number) {
    await this.findBy(categoryId)
    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }

  private async page(
    query: CategorySpecificationBuild,
    filters: CategoryFiltersDto,
  ): Promise<Page<Category>> {
    const [categories, totalItems] = await this.prisma.$transaction([
      this.prisma.category.findMany(query),
      this.prisma.category.count({
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
