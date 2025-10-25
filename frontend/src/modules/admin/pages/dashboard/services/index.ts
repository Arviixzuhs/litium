import { api } from '@/api/axios'
import { DashboardModel } from '@/types/dashboardModel'

export const reqGetDashboardData = async (): Promise<DashboardModel> => {
  const [metricsRes, totalRes, currentRes, byDateRes] = await Promise.all([
    api.get('/dashboard/metrics'),
    api.get('/dashboard/sales/total'),
    api.get('/dashboard/sales/current'),
    api.get('/dashboard/sales', {
      params: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
      },
    }),
  ])

  return {
    metrics: metricsRes.data,
    salesTotal: totalRes.data,
    salesCurrent: currentRes.data,
    salesByDate: byDateRes.data,
  }
}
