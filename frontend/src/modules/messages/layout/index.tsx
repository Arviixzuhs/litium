import { Outlet } from 'react-router-dom'

export const MessagesLayout = () => {
  return (
    <div className='w-full [height:calc(100vh-164px)] overflow-auto hoverScrollbar'>
      <Outlet />
    </div>
  )
}
