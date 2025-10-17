import React from 'react'
import { logOut } from '@/utils/logOut'
import { setMyUser } from '@/features/userSlice'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { reqAuthLoadProfileByToken } from '@/api/requests'

export const ProtectedRouteSession = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const token = localStorage.getItem('token')

  const publicRoutes = ['/', '/product/*']

  const isPublic = publicRoutes.some((route) => {
    if (route.endsWith('/*')) {
      const base = route.replace('/*', '')
      return location.pathname.startsWith(base)
    }
    return location.pathname === route
  })

  if (!token && !isPublic) return <Navigate to='/login' />

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
