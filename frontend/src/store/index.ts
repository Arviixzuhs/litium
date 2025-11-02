import { manageHomeSlice } from '@/features/homeSlice'
import { manageUserSlice } from '@/features/userSlice'
import { manageChatSlice } from '@/modules/messages/slices/chatSlice'
import { shoppingCartSlice } from '@/features/shoppingCartSlice'
import { manageModalsSlice } from '@/features/currentModalSlice'
import { manageAppTableSlice } from '@/features/appTableSlice'
import { managePurchaseSlice } from '@/modules/purchases/slices/purchaseSlice'
import { manageDashboardSlice } from '@/features/dashboardSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const appReducer = combineReducers({
  user: manageUserSlice.reducer,
  home: manageHomeSlice.reducer,
  chat: manageChatSlice.reducer,
  modal: manageModalsSlice.reducer,
  appTable: manageAppTableSlice.reducer,
  purchase: managePurchaseSlice.reducer,
  dashboard: manageDashboardSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
})

const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
