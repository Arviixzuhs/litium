import { Page } from '@/types/Page'
import { CategoryDto } from './dto/category.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { CategoryMapper } from './mapper/productCategory.mapper'
import { CategoryFiltersDto } from './dto/category-filters.dto'
import { CategoryResponseDto } from './dto/category-response.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CategorySpecificationBuild,
  CategorySpecificationBuilder,
} from './repositories/category.specificationBuilder'

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  private categoryMapper = new CategoryMapper()

  async findAll(filters: CategoryFiltersDto): Promise<Page<CategoryResponseDto>> {
    const query = new CategorySpecificationBuilder()
      .withName(filters.name)
      .withIsDeleted(false)
      .withOrderBy({ createdAt: 'desc' })
      .withPagination(filters.page, filters.size)
      .build()

    return this.page(query, filters)
  }

  async findBy(id: number): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
      },
    })

    if (!category) throw new NotFoundException('Categoría no encontrada')
    return this.categoryMapper.modelToDto(category)
  }

  async create(dto: CategoryDto): Promise<CategoryResponseDto> {
    const created = await this.prisma.category.create({
      data: {
        name: dto.name,
      },
    })

    return this.categoryMapper.modelToDto(created)
  }

  async update(categoryId: number, data: CategoryDto) {
    await this.findBy(categoryId)

    const updated = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    })

    return this.categoryMapper.modelToDto(updated)
  }

  async delete(categoryId: number) {
    await this.findBy(categoryId)

    const deleted = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })

    return this.categoryMapper.modelToDto(deleted)
  }

  private async page(
    query: CategorySpecificationBuild,
    filters: CategoryFiltersDto,
  ): Promise<Page<CategoryResponseDto>> {
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
      content: this.categoryMapper.modelsToDtos(categories),
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
