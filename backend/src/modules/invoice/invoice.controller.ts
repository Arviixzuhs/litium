import { Page } from '@/types/Page'
import { InvoiceService } from './invoice.service'
import { PermissionGuard } from '@/guards/permission.guard'
import { InvoiceFilterDto } from './dto/invoice-filters.dto'
import { Permissions, perm } from '@/common/decorators/permissions.decorator'
import { InvoiceResponseDto } from './dto/invoice-reponse.dto'
import { InvoicePageResponseDto } from './dto/invoice-page-response.dto'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Invoices')
@Controller('invoice')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all invoices with optional filters' })
  @ApiResponse({ status: 200, description: 'List of invoices', type: [InvoicePageResponseDto] })
  @Permissions(perm.advanced.administrator)
  async findAll(@Query() filters: InvoiceFilterDto): Promise<Page<InvoiceResponseDto>> {
    return this.invoiceService.findAll(filters)
  }
}
