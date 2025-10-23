import { RootState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

export const selectModalsState = (state: RootState) => state.modal
export const isModalOpen = (modalName: string) =>
  createSelector(selectModalsState, (state) => state.currentModals.includes(modalName))

export interface initialStateInterface {
  currentModals: string[]
}

export const manageModalsSlice = createSlice({
  name: 'currentModal',
  initialState: {
    currentModals: [],
  } as initialStateInterface,
  reducers: {
    handleShowModal: (state, action) => {
      const modalName = action.payload
      const isOpen = state.currentModals.includes(modalName)
      if (!isOpen) {
        state.currentModals.push(modalName)
      } else {
        state.currentModals = state.currentModals.filter((name) => name !== modalName)
      }
    },
  },
})

export const { handleShowModal } = manageModalsSlice.actions
