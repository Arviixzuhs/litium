import { Category } from '@prisma/client'
import { BaseMapper } from '@/common/utils/base.mapper'
import { CategoryResponseDto } from '../dto/category-response.dto'

export class CategoryMapper extends BaseMapper<Category, CategoryResponseDto> {
  modelToDto(model: Category): CategoryResponseDto {
    return {
      id: model.id,
      name: model.name,
      createdAt: model.createdAt.toISOString(),
    }
  }
}
