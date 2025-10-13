import { Prisma } from '@prisma/client'

export interface CategorySpecificationBuild {
  where: Prisma.CategoryWhereInput
  skip?: number
  take?: number
  include?: Prisma.CategoryInclude
  orderBy?: Prisma.CategoryOrderByWithRelationInput
}

export class CategorySpecificationBuilder {
  private where: Prisma.CategoryWhereInput = {}
  private skip?: number
  private take?: number
  private include?: Prisma.CategoryInclude
  private orderBy?: Prisma.CategoryOrderByWithRelationInput

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

  withOrderBy(orderBy?: Prisma.CategoryOrderByWithRelationInput) {
    if (orderBy) {
      this.orderBy = orderBy
    }
    return this
  }

  withInclude(include?: Prisma.CategoryInclude) {
    if (include) {
      this.include = include
    }
    return this
  }

  build(): CategorySpecificationBuild {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      include: this.include,
      orderBy: this.orderBy,
    }
  }
}
