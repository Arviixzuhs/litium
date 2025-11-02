import { Response } from 'express'
import { ReportService } from './report.service'
import { SalesReportDto } from './dto/sales-report.dto'
import { ApiTags, ApiQuery, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { Controller, Get, Query, Res, Param, NotFoundException } from '@nestjs/common'

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportController {
  constructor(private readonly reportsService: ReportService) {}

  @Get('sales')
  @ApiQuery({ name: 'fromDate', required: false })
  @ApiQuery({ name: 'toDate', required: false })
  async getSalesReport(@Query() query: SalesReportDto, @Res() res: Response) {
    const pdfBuffer = await this.reportsService.generateSalesReport(query)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="sales-report.pdf"',
      'Content-Length': pdfBuffer.length,
    })

    res.end(pdfBuffer)
  }

  @Get('sale/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la factura' })
  async getSingleSaleReport(@Param('id') id: number, @Res() res: Response) {
    try {
      const pdfBuffer = await this.reportsService.generateSingleSaleReport(Number(id))

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="invoice-${id}.pdf"`,
        'Content-Length': pdfBuffer.length,
      })

      res.end(pdfBuffer)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
