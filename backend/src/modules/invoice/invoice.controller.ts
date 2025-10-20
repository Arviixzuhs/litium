import { Page } from '@/types/Page'
import { InvoiceService } from './invoice.service'
import { InvoiceFilterDto } from './dto/invoice-filters.dto'
import { InvoiceResponseDto } from './dto/invoice-reponse.dto'
import { Controller, Get, Query } from '@nestjs/common'
import { InvoicePageResponseDto } from './dto/invoice-page-response.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Invoices')
@Controller('invoices')
@ApiBearerAuth()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all invoices with optional filters' })
  @ApiResponse({ status: 200, description: 'List of invoices', type: [InvoicePageResponseDto] })
  async findAll(@Query() filters: InvoiceFilterDto): Promise<Page<InvoiceResponseDto>> {
    return this.invoiceService.findAll(filters)
  }
}
