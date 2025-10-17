import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRouteAuth = () => {
  const token = localStorage.getItem('token')
  if (token) return <Navigate to='/' />

  return <Outlet />
}
