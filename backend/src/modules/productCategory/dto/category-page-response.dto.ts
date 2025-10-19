import { ApiProperty } from '@nestjs/swagger'
import { PageResponseDto } from '@/common/dto/pageResponse.dto'
import { CategoryResponseDto } from './category-response.dto'

export class CategoryPageResponseDto extends PageResponseDto<CategoryResponseDto> {
  @ApiProperty({ type: [CategoryResponseDto] })
  content: CategoryResponseDto[]
}
