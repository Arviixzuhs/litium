import App from '@/App.tsx'
import React from 'react'
import store from '@/store/index.ts'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MyHeroUIProvider } from '@/provider.tsx'
import { NotificationToast } from '@/components/NotificationToast'
import { ImageUploadProvider } from '@/components/ImageUploader/providers/ImageUploaderProvider.tsx'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ImageUploadProvider>
          <MyHeroUIProvider>
            <App />
            <NotificationToast />
          </MyHeroUIProvider>
        </ImageUploadProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
