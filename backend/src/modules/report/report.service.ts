import { jsPDF } from 'jspdf'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { SalesReportDto } from './dto/sales-report.dto'
import { InvoiceSpecificationBuilder } from '../invoice/repositories/invoice.specificationBuilder'

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async generateSalesReport(dto: SalesReportDto): Promise<Buffer> {
    const query = new InvoiceSpecificationBuilder()
      .withCreatedAtBetween(dto.fromDate, dto.toDate)
      .withInclude({
        shoppingCart: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
            user: true,
          },
        },
        seller: true,
      })
      .build()

    // 🔹 Traemos las ventas y productos asociados
    const invoices = await this.prisma.invoice.findMany({
      where: query.where,
      include: query.include,
    })

    // 🔹 Cálculos del reporte
    const totalSales = invoices.length
    const totalAmount = invoices.reduce((acc, i) => acc + (i.total ?? 0), 0)

    // 🔹 Crear PDF
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Reporte de Ventas', 15, 20)
    doc.setFontSize(12)
    doc.text(`Período: ${dto.fromDate || 'Inicio'} - ${dto.toDate || 'Actual'}`, 15, 30)
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 15, 40)

    doc.text(`Total de ventas: ${totalSales}`, 15, 55)
    doc.text(`Total recaudado: $${totalAmount.toFixed(2)}`, 15, 65)

    // 🔹 Detalle de ventas
    let y = 90
    doc.setFontSize(10)
    for (const invoice of invoices) {
      if (y > 270) {
        doc.addPage()
        y = 20
      }

      doc.text(
        `#${invoice.id} | ${invoice.name} | ${invoice.seller.name} | $${invoice.total?.toFixed(2)}`,
        15,
        y,
      )
      y += 6
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
    return pdfBuffer
  }
}
