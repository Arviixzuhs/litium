import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
  selectedCategories: number[]
  loading: boolean
  error?: string | null
}

const initialState: DashboardState = {
  selectedCategories: [],
  loading: false,
  error: null,
}

export const manageHomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<number>) => {
      if (!state.selectedCategories.includes(action.payload)) {
        state.selectedCategories.push(action.payload)
      }
    },

    removeCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategories = state.selectedCategories.filter((id) => id !== action.payload)
    },

    toggleCategory: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (state.selectedCategories.includes(id)) {
        state.selectedCategories = state.selectedCategories.filter((cat) => cat !== id)
      } else {
        state.selectedCategories.push(id)
      }
    },

    clearCategories: (state) => {
      state.selectedCategories = []
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  addCategory,
  removeCategory,
  toggleCategory,
  clearCategories,
  setLoading,
  setError,
} = manageHomeSlice.actions

export default manageHomeSlice.reducer
