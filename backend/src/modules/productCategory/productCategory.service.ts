import { CategoryDto } from './dto/category.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { AssignProductToCategoryDto } from './dto/assign-product.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
  ) {}

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
    await this.productService.findOne(dto.productId)
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
      },
    })
  }
}
