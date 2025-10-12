import { createSlice } from '@reduxjs/toolkit'
import { UserModel } from '@/types/userModel'

export const manageUserSlice = createSlice({
  name: 'user',
  initialState: null as UserModel | null,
  reducers: {
    setMyUser: (_, action) => action.payload,
  },
})

export const { setMyUser } = manageUserSlice.actions
