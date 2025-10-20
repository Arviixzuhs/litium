import { Page } from '@/types/Page'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { InvoiceMapper } from './mapper/invoice.mapper'
import { InvoiceFilterDto } from './dto/invoice-filters.dto'
import { InvoiceResponseDto } from './dto/invoice-reponse.dto'
import {
  InvoiceSpecificationBuild,
  InvoiceSpecificationBuilder,
} from './repositories/invoice.specificationBuilder'

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  private invoiceMapper = new InvoiceMapper()

  findAll(filters: InvoiceFilterDto): Promise<Page<InvoiceResponseDto>> {
    const query = new InvoiceSpecificationBuilder()
      .withId(filters.id)
      .withRif(filters.rif)
      .withName(filters.name)
      .withPhone(filters.phone)
      .withTotalBetween(filters.minTotal, filters.maxTotal)
      .withSellerId(filters.sellerId)
      .withProductId(filters.productId)
      .withCreatedAtBetween(filters.fromDate, filters.toDate)
      .withIsDeleted(filters.isDeleted)
      .withPagination(filters.page, filters.size)
      .withInclude({
        products: {
          include: {
            product: true,
          },
        },
        seller: true,
      })
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query)
  }

  private async page(query: InvoiceSpecificationBuild): Promise<Page<InvoiceResponseDto>> {
    const [invoices, totalItems] = await this.prisma.$transaction([
      this.prisma.invoice.findMany(query),
      this.prisma.invoice.count({
        where: query.where,
      }),
    ])

    const page = query.skip !== undefined ? Math.floor(query.skip / (query.take ?? 10)) : 0
    const size = query.take ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: this.invoiceMapper.modelsToDtos(invoices),
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}
