import { shoppingCartSlice } from '@/features/shoppingCartSlice'
import { manageUserSlice } from '@/features/userSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const appReducer = combineReducers({
  user: manageUserSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
})

const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
