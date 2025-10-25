import { createSlice } from '@reduxjs/toolkit'
import { DashboardModel } from '@/types/dashboardModel'

export const manageDashboardSlice = createSlice({
  name: 'dashboard',
  initialState: null as DashboardModel | null,
  reducers: {
    setDashboardData: (_, action) => action.payload,
  },
})

export const { setDashboardData } = manageDashboardSlice.actions
