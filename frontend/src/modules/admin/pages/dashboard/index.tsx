import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ShoppingCart,
  ArrowDownRight,
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

const mockSalesData = [
  { month: 'Ene', ventas: 45000, objetivo: 40000 },
  { month: 'Feb', ventas: 52000, objetivo: 45000 },
  { month: 'Mar', ventas: 48000, objetivo: 50000 },
  { month: 'Abr', ventas: 61000, objetivo: 55000 },
  { month: 'May', ventas: 55000, objetivo: 58000 },
  { month: 'Jun', ventas: 67000, objetivo: 62000 },
]

const mockCategoryData = [
  { name: 'Electrónica', value: 35 },
  { name: 'Hogar', value: 28 },
  { name: 'Ropa', value: 22 },
  { name: 'Deportes', value: 15 },
]

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
          change: '+0%',
          trend: 'up',
          icon: DollarSign,
          description: 'hasta la fecha',
        },
        {
          title: 'Ventas del Mes',
          value: `$${dashboardData.salesCurrent.totalRevenue.toLocaleString()}`,
          change: `${dashboardData.salesCurrent.variationPercentage?.toFixed(2)}%`,
          trend: dashboardData.salesCurrent.variationPercentage! >= 0 ? 'up' : 'down',
          icon: DollarSign,
          description: 'vs. mes anterior',
        },
        {
          title: 'Facturas Activas',
          value: dashboardData.metrics.totalInvoices.toString(),
          change: '+0%',
          trend: 'up',
          icon: ShoppingCart,
          description: 'registradas este mes',
        },
        {
          title: 'Proveedores',
          value: dashboardData.metrics.totalSuppliers.toString(),
          change: '+0%',
          trend: 'up',
          icon: Users,
          description: 'activos en el sistema',
        },
        {
          title: 'Productos',
          value: dashboardData.metrics.totalProducts.toString(),
          change: '+0%',
          trend: 'up',
          icon: TrendingUp,
          description: 'disponibles',
        },
        {
          title: 'Categorías',
          value: dashboardData.metrics.totalCategories.toString(),
          change: '+0%',
          trend: 'up',
          icon: TrendingUp,
          description: 'definidas',
        },
        {
          title: 'Catálogos',
          value: dashboardData.metrics.totalCatalogs.toString(),
          change: '+0%',
          trend: 'up',
          icon: TrendingUp,
          description: 'disponibles',
        },
      ]
    : []

  return (
    <div className='flex gap-4 flex-col'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} shadow='none' className='bg-white'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
                <h3 className='text-sm font-medium text-muted-foreground'>{stat.title}</h3>
                <div className='rounded-lg bg-primary/10 p-2'>
                  <Icon className='h-5 w-5 text-primary' />
                </div>
              </CardHeader>
              <CardBody>
                <div className='text-3xl font-bold text-foreground'>{stat.value}</div>
                <div className='mt-2 flex items-center gap-2 text-sm'>
                  {stat.trend === 'up' ? (
                    <div className='flex items-center gap-1 text-emerald-600'>
                      <ArrowUpRight className='h-4 w-4' />
                      <span className='font-medium'>{stat.change}</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-1 text-rose-600'>
                      <ArrowDownRight className='h-4 w-4' />
                      <span className='font-medium'>{stat.change}</span>
                    </div>
                  )}
                  <span className='text-muted-foreground'>{stat.description}</span>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card shadow='none'>
          <CardHeader className='font-bold'>Ventas Mensuales</CardHeader>
          <CardBody>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={mockSalesData}>
                  <defs>
                    <linearGradient id='colorVentas' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='rgb(59, 130, 246)' stopOpacity={0.4} />
                      <stop offset='95%' stopColor='rgb(59, 130, 246)' stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id='colorObjetivo' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='rgb(147, 197, 253)' stopOpacity={0.4} />
                      <stop offset='95%' stopColor='rgb(147, 197, 253)' stopOpacity={0.05} />
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
                    dataKey='ventas'
                    stroke='var(--primary)'
                    strokeWidth={3}
                    fillOpacity={1}
                    fill='url(#colorVentas)'
                  />
                  <Area
                    type='monotone'
                    dataKey='objetivo'
                    stroke='rgb(147, 197, 253)'
                    strokeWidth={2}
                    strokeDasharray='5 5'
                    fillOpacity={1}
                    fill='url(#colorObjetivo)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card shadow='none'>
          <CardHeader className='font-bold'>Ventas por Categoría</CardHeader>
          <CardBody>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={mockCategoryData}>
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
