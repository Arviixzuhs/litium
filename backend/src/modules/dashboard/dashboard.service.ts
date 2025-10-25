import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ShoppingCartStatus } from '@prisma/client'
import { DashboardMetricsDto } from './dto/dashboard-metrics.dto'
import { DashboardSalesTotalDto } from './dto/dashboard-sales-total.dto'
import { DashboardSalesByDateDto } from './dto/dashboard-sales-by-date.dto'
import { DashboardSalesCurrentDto } from './dto/dashboard-sales-current.dto'
import { DashboardSpecificationBuilder } from './repositories/dashboard.specificationBuilder'

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics(): Promise<DashboardMetricsDto> {
    const spec = new DashboardSpecificationBuilder().build()

    const [
      totalProducts,
      totalSuppliers,
      totalInvoices,
      totalCategories,
      totalCatalogs,
      totalPendingOrders,
      monthlySales,
      topProducts,
    ] = await Promise.all([
      this.prisma.product.count({ where: spec.productWhere }),
      this.prisma.supplier.count({ where: spec.supplierWhere }),
      this.prisma.invoice.count({ where: spec.invoiceWhere }),
      this.prisma.category.count({ where: spec.categoryWhere }),
      this.prisma.catalog.count({ where: spec.catalogWhere }),
      this.prisma.shoppingCart.count({
        where: { status: ShoppingCartStatus.PENDING, isDeleted: false },
      }),
      this.getMonthlySales(),
      this.getTopSellingProducts(),
    ])

    return {
      totalProducts,
      totalSuppliers,
      totalInvoices,
      totalCategories,
      totalCatalogs,
      totalPendingOrders,
      monthlySales,
      topProducts,
    }
  }

  async getSalesTotal(): Promise<DashboardSalesTotalDto> {
    const result = await this.prisma.invoice.aggregate({
      _sum: { total: true },
      where: { isDeleted: false },
    })

    return { totalRevenue: result._sum.total ?? 0 }
  }

  async getSalesCurrent(): Promise<DashboardSalesCurrentDto> {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    const current = await this.prisma.invoice.aggregate({
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
        isDeleted: false,
      },
    })
    const currentRevenue = current._sum.total ?? 0

    const prevYear = month === 1 ? year - 1 : year
    const prevMonth = month === 1 ? 12 : month - 1

    const previous = await this.prisma.invoice.aggregate({
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(prevYear, prevMonth - 1, 1),
          lt: new Date(prevYear, prevMonth, 1),
        },
        isDeleted: false,
      },
    })
    const previousRevenue = previous._sum.total ?? 0

    const variationPercentage =
      previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : null

    return {
      year,
      month,
      totalRevenue: currentRevenue,
      previousRevenue,
      variationPercentage,
    }
  }

  async getSalesByDate(year?: number, month?: number): Promise<DashboardSalesByDateDto> {
    const builder = new DashboardSpecificationBuilder()
      .withYear(year ?? new Date().getFullYear())
      .withMonth(month)
      .build()

    const result = await this.prisma.invoice.aggregate({
      _sum: { total: true },
      where: builder.invoiceWhere,
    })

    const totalRevenue = result._sum.total ?? 0

    return {
      year: builder.year!,
      month: builder.month,
      mode: builder.month ? 'month' : 'year',
      totalRevenue,
    }
  }

  async getMonthlySales(year?: number) {
    const currentYear = year ?? new Date().getFullYear()

    const invoices = await this.prisma.invoice.findMany({
      where: {
        isDeleted: false,
        createdAt: {
          gte: new Date(currentYear, 0, 1),
          lt: new Date(currentYear + 1, 0, 1),
        },
      },
      select: {
        total: true,
        createdAt: true,
      },
    })

    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ]

    const salesData = months.map((month, index) => {
      const total = invoices
        .filter((inv) => inv.createdAt.getMonth() === index)
        .reduce((sum, inv) => sum + (inv.total ?? 0), 0)

      return { month, sales: total }
    })

    return salesData
  }

  async getTopSellingProducts(limit = 5) {
    const topProducts = await this.prisma.shoppingCartProduct.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: limit,
    })

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: topProducts.map((p) => p.productId) },
      },
      select: {
        id: true,
        name: true,
      },
    })

    return topProducts.map((p) => {
      const product = products.find((prod) => prod.id === p.productId)!
      return {
        name: product.name,
        value: p._sum.quantity ?? 0,
      }
    })
  }
}
