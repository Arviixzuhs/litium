import { Prisma } from '@prisma/client'

export interface InvoiceSpecificationBuild {
  where: Prisma.InvoiceWhereInput
  skip?: number
  take?: number
  include?: Prisma.InvoiceInclude
  orderBy?: Prisma.InvoiceOrderByWithRelationInput
}

export class InvoiceSpecificationBuilder {
  private where: Prisma.InvoiceWhereInput = {}
  private skip?: number
  private take?: number
  private include?: Prisma.InvoiceInclude
  private orderBy?: Prisma.InvoiceOrderByWithRelationInput

  withSearchValue(search?: string) {
    if (search && search.trim() !== '') {
      this.where.OR = [
        {
          invoiceCode: { equals: search }
        },
        {
          seller: {
            name: { contains: search },
          },
        },
        {
          seller: {
            lastName: { contains: search },
          },
        },
        {
          seller: {
            email: { contains: search },
          },
        },
        {
          shoppingCart: {
            some: {
              user: {
                name: { contains: search },
              },
            },
          },
        },
        {
          shoppingCart: {
            some: {
              user: {
                lastName: { contains: search },
              },
            },
          },
        },
        {
          shoppingCart: {
            some: {
              user: {
                email: { contains: search },
              },
            },
          },
        },
      ]
    }
    return this
  }

  withInvoiceCode(invoiceCode?: string) {
    if (invoiceCode !== undefined && invoiceCode.trim() !== "") {
      this.where.invoiceCode = invoiceCode
    }
    return this
  }

  withId(id?: number) {
    if (id !== undefined) {
      this.where.id = id
    }
    return this
  }

  withRif(rif?: string) {
    if (rif) {
      this.where.rif = { contains: rif }
    }
    return this
  }

  withName(name?: string) {
    if (name) {
      this.where.name = { contains: name }
    }
    return this
  }

  withPhone(phone?: string) {
    if (phone) {
      this.where.phone = { contains: phone }
    }
    return this
  }

  withTotalBetween(min?: number, max?: number) {
    if (min !== undefined || max !== undefined) {
      this.where.total = {
        ...(min !== undefined && { gte: min }),
        ...(max !== undefined && { lte: max }),
      }
    }
    return this
  }

  withSellerId(sellerId?: number) {
    if (sellerId !== undefined) {
      this.where.sellerId = sellerId
    }
    return this
  }

  withCreatedAtBetween(fromDate?: string, toDate?: string) {
    if (fromDate || toDate) {
      this.where.createdAt = {
        ...(fromDate && { gte: new Date(fromDate) }),
        ...(toDate && { lte: new Date(toDate) }),
      }
    }
    return this
  }

  withIsDeleted(isDeleted?: boolean) {
    if (isDeleted !== undefined) {
      this.where.isDeleted = isDeleted
    }
    return this
  }

  withInclude(include?: Prisma.InvoiceInclude) {
    if (include) {
      this.include = include
    }
    return this
  }

  withOrderBy(orderBy?: Prisma.InvoiceOrderByWithRelationInput) {
    if (orderBy) {
      this.orderBy = orderBy
    }
    return this
  }

  withPagination(page?: number, size: number = 10) {
    if (page !== undefined && page >= 0) {
      this.skip = page * size
      this.take = size
    }
    return this
  }

  build(): InvoiceSpecificationBuild {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      include: this.include,
      orderBy: this.orderBy,
    }
  }
}
