import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ShoppingCartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  totalPrice: number
}

export interface ShoppingCartState {
  cartItems: ShoppingCartItem[]
  totalQuantity: number
  totalPrice: number
  isOpen: boolean
}

const initialState: ShoppingCartState = {
  isOpen: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
}

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    resetShoppingCart: (_state, _action: PayloadAction<null>) => initialState,
    addItemToCart: (state, action: PayloadAction<ShoppingCartItem>) => {
      const newItem = action.payload
      const existingItem = state.cartItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        })
      }

      state.totalQuantity++
      state.totalPrice += newItem.price
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existingItem = state.cartItems.find((item) => item.id === id)

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id)
        state.totalQuantity -= existingItem.quantity
        state.totalPrice -= existingItem.totalPrice
      }
    },
    incrementItemQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existingItem = state.cartItems.find((item) => item.id === id)

      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice += existingItem.price
        state.totalQuantity++
        state.totalPrice += existingItem.price
      }
    },
    decrementItemQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existingItem = state.cartItems.find((item) => item.id === id)

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
        state.totalQuantity--
        state.totalPrice -= existingItem.price
      } else if (existingItem && existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id)
        state.totalQuantity--
        state.totalPrice -= existingItem.price
      }
    },
    handleOpenCart: (state, _) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const {
  addItemToCart,
  handleOpenCart,
  resetShoppingCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} = shoppingCartSlice.actions
