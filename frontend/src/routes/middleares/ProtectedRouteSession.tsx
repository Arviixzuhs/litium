import React from 'react'
import { logOut } from '@/utils/logOut'
import { setMyUser } from '@/features/userSlice'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { reqAuthLoadProfileByToken } from '@/api/requests'

export const ProtectedRouteSession = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to='/login' />

  React.useEffect(() => {
    const loadProfile = () => {
      if (token) {
        reqAuthLoadProfileByToken(token)
          .then((response) => {
            dispatch(setMyUser(response.data))
          })
          .catch(() => {
            logOut()
          })
      }
    }

    loadProfile()
  }, [token])

  return <Outlet />
}
