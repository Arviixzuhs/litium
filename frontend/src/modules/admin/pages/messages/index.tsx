import { Messages } from '@/modules/messages'
import { ChatSidebar } from './components/ChatSidebar'

export const MessagesAdminPage = () => {
  return (
    <div className='h-full flex w-full gap-4'>
      <ChatSidebar />
      <div className=' w-full hidden lg:block'>
        <Messages />
      </div>
    </div>
  )
}
