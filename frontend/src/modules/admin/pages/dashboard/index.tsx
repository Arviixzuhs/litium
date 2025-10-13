import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  Package,
  Truck,
  FolderTree,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

export const DashboardPage = () => {
  const stats = [
    {
      title: 'Ventas Totales',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Productos',
      value: '234',
      change: '+12',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Proveedores',
      value: '18',
      change: '+2',
      trend: 'up',
      icon: Truck,
    },
    {
      title: 'Categorías',
      value: '12',
      change: '0',
      trend: 'neutral',
      icon: FolderTree,
    },
  ]

  const recentActivity = [
    {
      title: 'Catálogos Activos',
      value: '8',
      description: 'Catálogos publicados',
      icon: BookOpen,
    },
    {
      title: 'Ventas del Mes',
      value: '156',
      description: 'Transacciones completadas',
      icon: ShoppingCart,
    },
    {
      title: 'Crecimiento',
      value: '+18%',
      description: 'Comparado con el mes anterior',
      icon: TrendingUp,
    },
    {
      title: 'Clientes Activos',
      value: '89',
      description: 'Clientes con compras recientes',
      icon: Users,
    },
  ]

  return (
    <div className='flex h-screen'>
      <main className='flex-1 overflow-auto bg-background p-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div>
            <h1 className='mb-2 text-3xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-muted-foreground'>
              Vista general de tu negocio y métricas principales
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <h3 className='text-sm font-medium'>{stat.title}</h3>
                    <Icon className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardBody>
                    <div className='text-2xl font-bold'>{stat.value}</div>
                    <div className='flex items-center text-xs text-muted-foreground'>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className='mr-1 h-4 w-4 text-green-500' />
                      ) : stat.trend === 'down' ? (
                        <ArrowDownRight className='mr-1 h-4 w-4 text-red-500' />
                      ) : null}
                      <span
                        className={
                          stat.trend === 'up'
                            ? 'text-green-500'
                            : stat.trend === 'down'
                              ? 'text-red-500'
                              : ''
                        }
                      >
                        {stat.change}
                      </span>
                      <span className='ml-1'>desde el último mes</span>
                    </div>
                  </CardBody>
                </Card>
              )
            })}
          </div>

          <div>
            <h2 className='mb-4 text-xl font-semibold'>Actividad Reciente</h2>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {recentActivity.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title}>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <h3 className='text-sm font-medium'>{item.title}</h3>
                      <Icon className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardBody>
                      <div className='text-2xl font-bold'>{item.value}</div>
                      <p className='text-xs text-muted-foreground'>{item.description}</p>
                    </CardBody>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className='mb-4 text-xl font-semibold'>Acceso Rápido</h2>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <Card className='cursor-pointer transition-colors hover:bg-accent'>
                <CardHeader>
                  <h3 className='flex items-center gap-2'>
                    <Package className='h-5 w-5' />
                    Gestionar Productos
                  </h3>
                </CardHeader>
                <CardBody>
                  <p className='text-sm text-muted-foreground'>
                    Añade, edita o elimina productos de tu inventario
                  </p>
                </CardBody>
              </Card>

              <Card className='cursor-pointer transition-colors hover:bg-accent'>
                <CardHeader>
                  <h3 className='flex items-center gap-2'>
                    <ShoppingCart className='h-5 w-5' />
                    Nueva Venta
                  </h3>
                </CardHeader>
                <CardBody>
                  <p className='text-sm text-muted-foreground'>
                    Registra una nueva transacción de venta
                  </p>
                </CardBody>
              </Card>

              <Card className='cursor-pointer transition-colors hover:bg-accent'>
                <CardHeader>
                  <h3 className='flex items-center gap-2'>
                    <BookOpen className='h-5 w-5' />
                    Ver Catálogos
                  </h3>
                </CardHeader>
                <CardBody>
                  <p className='text-sm text-muted-foreground'>
                    Consulta y administra tus catálogos activos
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
