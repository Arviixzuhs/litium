import { Outlet } from 'react-router-dom'

export const MessagesLayout = () => {
  return (
    <div className='w-full [height:calc(100vh-64px)] p-4 overflow-auto hoverScrollbar'>
      <Outlet />
    </div>
  )
}
