import { jsPDF } from 'jspdf'
import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { PrismaService } from '@/prisma/prisma.service'
import { SalesReportDto } from './dto/sales-report.dto'
import { InvoiceSpecificationBuilder } from '../invoice/repositories/invoice.specificationBuilder'
const logoBase64 = readFileSync('src/common/assets/logo.png').toString('base64')

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  private drawHeader(doc: jsPDF, title: string, companyName = 'Litium C.A.') {
    // Logo
    doc.addImage(logoBase64, 'ICO', 15, 10, 25, 25)

    // Nombre empresa
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(companyName, 45, 20)

    // Título del reporte
    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text(title, 15, 45)

    // Línea separadora
    doc.setDrawColor(200, 200, 200)
    doc.line(15, 50, 195, 50)
  }

  private drawTableHeader(doc: jsPDF, headers: string[], startY: number) {
    const margin = 15
    const pageWidth = doc.internal.pageSize.getWidth()
    const colWidth = (pageWidth - 2 * margin) / headers.length
    const cellHeight = 10

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)

    // texto de la columna
    doc.setTextColor(117, 117, 126)

    let x = margin
    headers.forEach((header) => {
      // Establecer color de fondo por celda
      doc.setFillColor(244, 244, 245)

      // Dibujar celda con fondo y borde
      doc.rect(x, startY, colWidth, cellHeight, 'FD')

      // Centrar texto
      const textWidth = doc.getTextWidth(header)
      const textX = x + (colWidth - textWidth) / 2
      const textY = startY + cellHeight / 2 + 3
      doc.text(header, textX, textY)

      x += colWidth
    })
  }

  private drawTableRow(doc: jsPDF, values: string[], y: number, alternate = false) {
    const margin = 15
    const pageWidth = doc.internal.pageSize.getWidth()
    const colWidth = (pageWidth - 2 * margin) / values.length
    const cellHeight = 10
    let x = margin

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)

    values.forEach((value) => {
      // Fondo por celda
      doc.setFillColor(alternate ? 245 : 255, alternate ? 247 : 255, alternate ? 250 : 255)
      doc.rect(x, y, colWidth, cellHeight, 'FD')

      // Texto centrado
      const textWidth = doc.getTextWidth(value)
      const textX = x + (colWidth - textWidth) / 2
      const textY = y + cellHeight / 2
      doc.text(value, textX, textY)

      x += colWidth
    })
  }

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

    const invoices = await this.prisma.invoice.findMany({
      where: query.where,
      include: query.include,
    })

    const totalSales = invoices.length

    const totalAmount = invoices.reduce((acc, i) => acc + (i.total ?? 0), 0)

    const doc = new jsPDF()
    this.drawHeader(doc, 'Reporte de Ventas')

    doc.setFontSize(12)
    doc.text(`Período: ${dto.fromDate || 'Inicio'} - ${dto.toDate || 'Actual'}`, 15, 60)
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 15, 68)
    doc.text(`Total de ventas: ${totalSales}`, 15, 76)
    doc.text(`Total recaudado: $${totalAmount.toFixed(2)}`, 15, 84)

    // Tabla
    let y = 100
    this.drawTableHeader(doc, ['Código', 'Cliente', 'Vendedor', 'Total'], y)
    y += 10
    let alternate = false

    for (const invoice of invoices) {
      if (y > 270) {
        doc.addPage()
        y = 20
        this.drawTableHeader(doc, ['Código', 'Cliente', 'Vendedor', 'Total'], y)
        y += 10
      }

      const cart = invoice.shoppingCart[0] as (typeof invoice.shoppingCart)[number] & {
        user?: { name: string; lastName: string }
      }

      this.drawTableRow(
        doc,
        [
          `#${invoice.invoiceCode}`,
          cart.user.name + ' ' + cart.user.lastName || '--',
          invoice.seller?.name || '--',
          `$${invoice.total?.toFixed(2)}`,
        ],
        y,
        alternate,
      )
      y += 8
      alternate = !alternate
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
    return pdfBuffer
  }

  async generateSingleSaleReport(invoiceId: number): Promise<Buffer> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        shoppingCart: {
          include: {
            products: { include: { product: true } },
            user: true,
          },
        },
        seller: true,
      },
    })

    if (!invoice) throw new Error(`La factura con ID ${invoiceId} no existe`)
    const cart = Array.isArray(invoice.shoppingCart)
      ? invoice.shoppingCart[0]
      : invoice.shoppingCart

    const doc = new jsPDF()
    this.drawHeader(doc, `Código de factura: ${invoice.invoiceCode}`)

    doc.setFontSize(12)
    doc.text(`Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}`, 15, 60)
    doc.text(`Cliente: ${cart?.user?.name} ${cart?.user?.lastName}`, 15, 68)
    doc.text(`Vendedor: ${invoice.seller?.name || 'No asignado'}`, 15, 76)
    doc.text(`Total: $${invoice.total?.toFixed(2)}`, 15, 84)

    let y = 100
    this.drawTableHeader(doc, ['Producto', 'Cantidad', 'Precio', 'Subtotal'], y)
    y += 10
    let alternate = false

    for (const item of cart.products) {
      if (y > 270) {
        doc.addPage()
        y = 20
        this.drawTableHeader(doc, ['Producto', 'Cantidad', 'Precio', 'Subtotal'], y)
        y += 10
      }
      const subtotal = item.product.price * item.quantity
      this.drawTableRow(
        doc,
        [
          item.product.name,
          String(item.quantity),
          `$${item.product.price.toFixed(2)}`,
          `$${subtotal.toFixed(2)}`,
        ],
        y,
        alternate,
      )
      y += 8
      alternate = !alternate
    }

    y += 10
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(`Total Final: $${invoice.total?.toFixed(2)}`, 150, y)

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
    return pdfBuffer
  }
}
