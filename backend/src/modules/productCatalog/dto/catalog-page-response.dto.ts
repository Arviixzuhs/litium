import { ApiProperty } from '@nestjs/swagger'
import { PageResponseDto } from '@/common/dto/pageResponse.dto'
import { CatalogResponseDto } from './catalog-response.dto'

export class CatalogPageResponseDto extends PageResponseDto<CatalogResponseDto> {
  @ApiProperty({ type: [CatalogResponseDto] })
  content: CatalogResponseDto[]
}
