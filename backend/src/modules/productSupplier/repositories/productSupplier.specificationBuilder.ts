import { Prisma } from '@prisma/client'

export interface ProductSupplierSpecificationBuild {
  where: Prisma.SupplierWhereInput
  skip?: number
  take?: number
  include?: Prisma.SupplierInclude
  orderBy?: Prisma.SupplierOrderByWithRelationInput
}

export class ProductSupplierSpecificationBuilder {
  private where: Prisma.SupplierWhereInput = {}
  private skip?: number
  private take?: number
  private include?: Prisma.SupplierInclude
  private orderBy?: Prisma.SupplierOrderByWithRelationInput

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
  
    withOrderBy(orderBy?: Prisma.SupplierOrderByWithRelationInput) {
      if (orderBy) {
        this.orderBy = orderBy
      }
      return this
    }
  
    withInclude(include?: Prisma.SupplierInclude) {
      if (include) {
        this.include = include
      }
      return this
    }
  
    build(): ProductSupplierSpecificationBuild {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      include: this.include,
      orderBy: this.orderBy,
    }
  }


}
