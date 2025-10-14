import { Prisma } from '@prisma/client'

export interface ProductCatalogSpecificationBuild {
  where: Prisma.CatalogWhereInput
  skip?: number
  take?: number
  include?: Prisma.CatalogInclude
  orderBy?: Prisma.CatalogOrderByWithRelationInput
}

export class ProductCatalogSpecificationBuilder {
  private where: Prisma.CatalogWhereInput = {}
  private skip?: number
  private take?: number
  private include?: Prisma.CatalogInclude
  private orderBy?: Prisma.CatalogOrderByWithRelationInput

  withName(name?: string) {
    if (name !== undefined) {
      this.where.name = { contains: name }
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

  withInclude(include?: Prisma.CatalogInclude) {
    if (include) {
      this.include = include
    }
    return this
  }

  build(): ProductCatalogSpecificationBuild {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      include: this.include,
      orderBy: this.orderBy,
    }
  }
}
