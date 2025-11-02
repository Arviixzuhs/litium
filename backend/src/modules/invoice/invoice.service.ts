import { Page } from '@/types/Page'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { InvoiceMapper } from './mapper/invoice.mapper'
import { InvoiceFilterDto } from './dto/invoice-filters.dto'
import { CreateInvoiceDto } from './dto/create-invoice.dto'
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
      .withSearchValue(filters.searchValue)
      .withPhone(filters.phone)
      .withInclude({
        shoppingCart: {
          include: {
            products: {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
              },
            },
            user: true,
          },
        },
        seller: true,
      })
      .withTotalBetween(filters.minTotal, filters.maxTotal)
      .withSellerId(filters.sellerId)
      .withCreatedAtBetween(filters.fromDate, filters.toDate)
      .withIsDeleted(filters.isDeleted)
      .withPagination(filters.page, filters.size)
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query)
  }

  create(dto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        name: dto.name ?? new Date().getTime().toString(),
        sellerId: dto.sellerId,
        total: dto.total ?? 0,
        rif: dto.rif ?? null,
        phone: dto.phone ?? null,
        address: dto.address ?? null,
        shoppingCart: { connect: { id: dto.shoppingCartId } },
      },
    })
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
