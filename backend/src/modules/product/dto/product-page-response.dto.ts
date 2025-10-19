import { ApiProperty } from '@nestjs/swagger'
import { PageResponseDto } from '@/common/dto/pageResponse.dto'
import { ProductResponseDto } from './product-response.dto'

export class ProductPageResponseDto extends PageResponseDto<ProductResponseDto> {
  @ApiProperty({ type: [ProductResponseDto] })
  content: ProductResponseDto[]
}
