import { ApiProperty } from '@nestjs/swagger'
import { PageResponseDto } from '@/common/dto/pageResponse.dto'
import { SupplierResponseDto } from './supplier-response.dto'

export class SupplierPageResponseDto extends PageResponseDto<SupplierResponseDto> {
  @ApiProperty({ type: [SupplierResponseDto] })
  content: SupplierResponseDto[]
}
