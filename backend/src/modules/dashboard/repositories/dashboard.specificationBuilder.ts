import { Prisma } from '@prisma/client'

export interface DashboardSpecificationBuild {
  productWhere: Prisma.ProductWhereInput
  supplierWhere: Prisma.SupplierWhereInput
  invoiceWhere: Prisma.InvoiceWhereInput
  categoryWhere: Prisma.CategoryWhereInput
  catalogWhere: Prisma.CatalogWhereInput
  year?: number
  month?: number
}

export class DashboardSpecificationBuilder {
  private productWhere: Prisma.ProductWhereInput = { isDeleted: false }
  private supplierWhere: Prisma.SupplierWhereInput = { isDeleted: false }
  private invoiceWhere: Prisma.InvoiceWhereInput = { isDeleted: false }
  private categoryWhere: Prisma.CategoryWhereInput = { isDeleted: false }
  private catalogWhere: Prisma.CatalogWhereInput = { isDeleted: false }

  private year?: number
  private month?: number

  withYear(year?: number) {
    if (year) {
      this.year = year
      this.invoiceWhere.createdAt = {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31, 23, 59, 59, 999),
      }
    }
    return this
  }

  withMonth(month?: number) {
    if (month && this.year) {
      this.month = month
      this.invoiceWhere.createdAt = {
        gte: new Date(this.year, month - 1, 1),
        lt: new Date(this.year, month, 1),
      }
    }
    return this
  }

  build(): DashboardSpecificationBuild {
    return {
      productWhere: this.productWhere,
      supplierWhere: this.supplierWhere,
      invoiceWhere: this.invoiceWhere,
      categoryWhere: this.categoryWhere,
      catalogWhere: this.catalogWhere,
      year: this.year,
      month: this.month,
    }
  }
}