import { Login } from '@/modules/auth/pages/Login'
import { Layout } from '@/layout'
import { Register } from '@/modules/auth/pages/Register'
import { HomePage } from '@/modules/home'
import { Messages } from '@/modules/messages'
import { ProductPage } from '@/modules/product'
import { AdminLayout } from '@/modules/admin/layout'
import { ScrollToTop } from '@/components/ScrollTop'
import { CatalogPage } from '@/modules/catalog'
import { CheckoutPage } from '@/modules/checkout'
import { NotFoundPage } from '@/modules/404'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/modules/admin/pages/dashboard'
import { PurchasesPage } from '@/modules/purchases'
import { MessagesLayout } from '@/modules/messages/layout'
import { AdminProductPage } from '@/modules/admin/pages/product'
import { AdminCatalogPage } from '@/modules/admin/pages/catalog'
import { AdminInvoicePage } from '@/modules/admin/pages/sales'
import { AdminSupplierPage } from '@/modules/admin/pages/supplier'
import { AdminCategoryPage } from '@/modules/admin/pages/category'
import { MessagesAdminPage } from '@/modules/admin/pages/messages'
import { ProtectedRouteAuth } from './middlewares/ProtectedRouteAuth'
import { ProtectedRouteSession } from './middlewares/ProtectedRouteSession'
import { CheckPermissionByComponent } from '@/components/CheckPermissionByComponent'
import { ValidateCheckoutMiddleware } from '@/modules/checkout/middlewares/ValidateCheckoutMiddleware'

export const Router = () => {
  return (
    <Routes>
      <Route element={<ScrollToTop />}>
        <Route element={<ProtectedRouteSession />}>
          <Route element={<ValidateCheckoutMiddleware />}>
            <Route element={<CheckoutPage />} path='/checkout/:cartId' />
          </Route>
          <Route element={<Layout />}>
            <Route element={<HomePage />} path='/' />
            <Route element={<CatalogPage />} path='/catalog/:catalogId' />
            <Route element={<NotFoundPage />} path='*' />
            <Route element={<MessagesLayout />}>
              <Route element={<Messages />} path='/messages/:cartId' />
            </Route>
            <Route element={<ProductPage />} path='/product/:productId' />
            <Route element={<PurchasesPage />} path='/purchases' />
          </Route>
          <Route
            element={
              <CheckPermissionByComponent permission={'*'} mode='remove'>
                <AdminLayout />
              </CheckPermissionByComponent>
            }
          >
            <Route element={<DashboardPage />} path='/dashboard' />
            <Route element={<AdminCatalogPage />} path='/catalogos' />
            <Route element={<AdminInvoicePage />} path='/ventas' />
            <Route element={<AdminProductPage />} path='/productos' />
            <Route element={<MessagesAdminPage />} path='/messages/cart/:cartId?' />
            <Route element={<AdminSupplierPage />} path='/proveedores' />
            <Route element={<AdminCategoryPage />} path='/categorias' />
          </Route>
        </Route>
        <Route element={<ProtectedRouteAuth />}>
          <Route element={<Login />} path='/login' />
          <Route element={<Register />} path='/register' />
        </Route>
      </Route>
    </Routes>
  )
}
