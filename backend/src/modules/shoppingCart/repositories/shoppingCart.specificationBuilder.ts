import { Prisma, ShoppingCartStatus } from '@prisma/client'

export class ShoppingCartSpecificationBuilder {
  private where: Prisma.ShoppingCartWhereInput = {}
  private skip?: number
  private take?: number
  private include?: Prisma.ShoppingCartInclude
  private orderBy?: Prisma.ShoppingCartOrderByWithRelationInput

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

  withUserId(userId?: number) {
    if (userId !== undefined) {
      this.where.user.id === userId
    }

    return this
  }

  withStatus(status?: ShoppingCartStatus) {
    if (status !== undefined) {
      this.where.status = status
    }

    return this
  }

  withOrderBy(orderBy?: Prisma.ShoppingCartOrderByWithRelationInput) {
    if (orderBy) {
      this.orderBy = orderBy
    }
    return this
  }

  withInclude(include?: Prisma.ShoppingCartInclude) {
    if (include) {
      this.include = include
    }
    return this
  }

  build(): {
    where: Prisma.ShoppingCartWhereInput
    skip?: number
    take?: number
    include?: Prisma.ShoppingCartInclude
    orderBy?: Prisma.ShoppingCartOrderByWithRelationInput
  } {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      include: this.include,
      orderBy: this.orderBy,
    }
  }
}
