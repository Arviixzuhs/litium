import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  Package,
  Truck,
  FolderTree,
  BookOpen,
  ShoppingCart,
  MessagesSquareIcon,
  DollarSign,
} from 'lucide-react'
import {
  Bar,
  Area,
  YAxis,
  XAxis,
  BarChart,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { reqGetDashboardData } from './services'
import { DashboardModel } from '@/types/dashboardModel'

export const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardModel | null>(null)

  useEffect(() => {
    reqGetDashboardData().then(setDashboardData)
  }, [])

  const stats = dashboardData
    ? [
        {
          title: 'Ingresos Totales',
          value: `$${dashboardData.salesTotal.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
        },
        {
          title: 'Ingresos del Mes',
          value: `$${dashboardData.salesCurrent.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
        },
        {
          title: 'Proveedores',
          value: dashboardData.metrics.totalSuppliers.toString(),
          icon: Truck,
        },
        {
          title: 'Productos',
          value: dashboardData.metrics.totalProducts.toString(),
          icon: Package,
        },
        {
          title: 'Categorías',
          value: dashboardData.metrics.totalCategories.toString(),
          icon: FolderTree,
        },
        {
          title: 'Catálogos',
          value: dashboardData.metrics.totalCatalogs.toString(),
          icon: BookOpen,
        },
        {
          title: 'Ventas',
          value: dashboardData.metrics.totalInvoices.toString(),
          icon: ShoppingCart,
        },
        {
          title: 'Órdenes Pendientes',
          value: dashboardData.metrics.totalPendingOrders.toString(),
          icon: MessagesSquareIcon,
        },
      ]
    : []

  return (
    <div className='flex gap-4 flex-col'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} shadow='none' className='bg-white'>
              <CardHeader className='flex flex-row items-center justify-between pb-3'>
                <h3 className='text-sm font-medium text-muted-foreground'>{stat.title}</h3>
                <div className='rounded-lg bg-primary/10 p-2'>
                  <Icon className='h-5 w-5 text-primary' />
                </div>
              </CardHeader>
              <CardBody>
                <div className='text-3xl font-bold text-foreground'>{stat.value}</div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <Card shadow='none'>
          <CardHeader className='font-bold'>Ventas Mensuales</CardHeader>
          <CardBody>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={dashboardData?.metrics.monthlySales}>
                  <defs>
                    <linearGradient id='colorVentas' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='rgb(59, 130, 246)' stopOpacity={0.4} />
                      <stop offset='95%' stopColor='rgb(59, 130, 246)' stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted' opacity={0.3} />
                  <XAxis
                    dataKey='month'
                    className='text-muted-foreground'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    className='text-muted-foreground'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Area
                    type='monotone'
                    dataKey='sales'
                    stroke='var(--primary)'
                    strokeWidth={3}
                    fillOpacity={1}
                    fill='url(#colorVentas)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card shadow='none'>
          <CardHeader className='font-bold'>Productos más Vendidos</CardHeader>
          <CardBody>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={dashboardData?.metrics.topProducts}>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted' opacity={0.3} />
                  <XAxis
                    dataKey='name'
                    className='text-muted-foreground'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    className='text-muted-foreground'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Bar dataKey='value' fill='rgb(96, 165, 250)' radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
