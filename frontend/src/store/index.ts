import { manageUserSlice } from '@/features/userSlice'
import { shoppingCartSlice } from '@/features/shoppingCartSlice'
import { manageAppTableSlice } from '@/features/appTableSlice'
import { managePurchaseSlice } from '@/modules/purchases/slices/purchaseSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const appReducer = combineReducers({
  user: manageUserSlice.reducer,
  appTable: manageAppTableSlice.reducer,
  purchase: managePurchaseSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
})

const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
