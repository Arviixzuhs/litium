import { Login } from '@/modules/auth/pages/Login'
import { Layout } from '@/layout'
import { Register } from '@/modules/auth/pages/Register'
import { HomePage } from '@/modules/home'
import { Messages } from '@/modules/messages'
import { ProductPage } from '@/modules/product'
import { AdminLayout } from '@/modules/admin/layout'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/modules/admin/pages/dashboard'
import { PurchasesPage } from '@/modules/purchases'
import { AdminProductPage } from '@/modules/admin/pages/product'
import { AdminCatalogPage } from '@/modules/admin/pages/catalog'
import { AdminSupplierPage } from '@/modules/admin/pages/supplier'
import { AdminCategoryPage } from '@/modules/admin/pages/category'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRouteSession />}>
        <Route element={<Layout />}>
          <Route element={<HomePage />} path='/' />
          <Route element={<ProductPage />} path='/product/:productId' />
          <Route element={<PurchasesPage />} path='/purchases' />
          <Route element={<Messages />} path='/messages/:cartId' />
        </Route>
        <Route element={<AdminLayout />}>
          <Route element={<DashboardPage />} path='/dashboard' />
          <Route element={<AdminProductPage />} path='/productos' />
          <Route element={<AdminSupplierPage />} path='/proveedores' />
          <Route element={<AdminCategoryPage />} path='/categorias' />
          <Route element={<AdminCatalogPage />} path='/catalogos' />
          <Route element={<AdminProductPage />} path='/ventas' />
        </Route>
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
      </Route>
    </Routes>
  )
}
