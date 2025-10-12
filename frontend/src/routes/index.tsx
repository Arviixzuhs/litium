import { Login } from '@/modules/auth/pages/Login'
import { Layout } from '@/layout'
import { Register } from '@/modules/auth/pages/Register'
import { HomePage } from '@/modules/home'
import { ProductPage } from '@/modules/product'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRouteAuth } from './middleares/ProtectedRouteAuth'
import { ProtectedRouteSession } from './middleares/ProtectedRouteSession'
import { Messages } from '@/modules/messages'

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRouteSession />}>
        <Route element={<Layout />}>
          <Route element={<HomePage />} path='/' />
          <Route element={<ProductPage />} path='/product/:productId' />
        </Route>
        <Route element={<Messages />} path='/messages' />
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
      </Route>
    </Routes>
  )
}
