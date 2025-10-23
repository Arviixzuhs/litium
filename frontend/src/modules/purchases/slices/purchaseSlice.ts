import { ShoppingCartModel, ShoppingCartStatus } from '@/types/shoppingCartModel'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PurchaseState {
  data: ShoppingCartModel[]
}

const initialState: PurchaseState = {
  data: [],
}

export const managePurchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setPurchases(state, action: PayloadAction<ShoppingCartModel[]>) {
      state.data = action.payload
    },
    updateStatus(state, action: PayloadAction<{ id: number; status: ShoppingCartStatus }>) {
      const { id, status } = action.payload
      const purchase = state.data.find((item) => item.id === id)
      if (!purchase) return
      purchase.status = status
    },
  },
})

export const { setPurchases, updateStatus } = managePurchaseSlice.actions
