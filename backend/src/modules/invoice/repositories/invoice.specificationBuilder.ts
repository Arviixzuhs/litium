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

  withProductId(productId?: number) {
    if (productId !== undefined) {
      this.where.products = {
        some: { productId },
      }
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
