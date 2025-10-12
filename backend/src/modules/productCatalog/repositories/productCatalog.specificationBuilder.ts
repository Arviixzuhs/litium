import { Prisma } from '@prisma/client'

export class ProductCatalogSpecificationBuilder {
  private where: Prisma.CatalogWhereInput = {}
  private skip?: number
  private take?: number
  private orderBy?: Prisma.CatalogOrderByWithRelationInput

  withName(name?: string) {
    if (name !== undefined) {
      this.where = {
        name: {
          contains: name,
        },
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

  withPagination(page?: number, pageSize: number = 10) {
    if (page !== undefined && page >= 0) {
      this.skip = page * pageSize
      this.take = pageSize
    }
    return this
  }

  withOrderBy(orderBy?: Prisma.CatalogOrderByWithRelationInput) {
    if (orderBy) {
      this.orderBy = orderBy
    }
    return this
  }

  build(): {
    where: Prisma.CatalogWhereInput
    skip?: number
    take?: number
    orderBy?: Prisma.CatalogOrderByWithRelationInput
  } {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      orderBy: this.orderBy,
    }
  }
}
