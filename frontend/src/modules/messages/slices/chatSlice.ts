import { createSlice } from '@reduxjs/toolkit'

export interface ChatInterface {
  invoiceId: number | null
}

export const manageChatSlice = createSlice({
  name: 'chat',
  initialState: {
    invoiceId: null,
  } as ChatInterface,
  reducers: {
    setInvoiceId: (state, action) => {
      state.invoiceId = action.payload
    },
  },
})

export const { setInvoiceId } = manageChatSlice.actions
