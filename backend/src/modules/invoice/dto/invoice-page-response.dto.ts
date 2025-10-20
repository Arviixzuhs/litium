import { ApiProperty } from '@nestjs/swagger'
import { PageResponseDto } from '@/common/dto/pageResponse.dto'
import { InvoiceResponseDto } from './invoice-reponse.dto'

export class InvoicePageResponseDto extends PageResponseDto<InvoiceResponseDto> {
  @ApiProperty({ type: [InvoiceResponseDto] })
  content: InvoiceResponseDto[]
}
