import { Toaster } from 'react-hot-toast'

export const NotificationToast: React.FC = () => {
  return (
    <Toaster
      toastOptions={{
        className: '',
        position: 'bottom-right',
        success: {
          iconTheme: {
            primary: 'rgb(73, 158, 73)',
            secondary: 'white',
          },
        },
      }}
    />
  )
}
