import { cn } from '@heroui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePurchasesSearch } from '@/modules/purchases/hooks/usePurchasesSearch'
import { Input, ScrollShadow } from '@heroui/react'
import { getFormattedDateTime } from '@/utils/getFormattedDateTime'
import { MessageSquare, Search } from 'lucide-react'

export const ChatSidebar = () => {
  const navigate = useNavigate()
  const [selectedChat, setSelectedChat] = useState<number>(-1)
  const { purchases, searchQuery, setSearchQuery } = usePurchasesSearch()

  const handleSelectChat = (cartId: number) => {
    setSelectedChat(cartId)
    navigate(`/messages/cart/${cartId}`)
  }

  return (
    <>
      <aside className={'min-w-full lg:min-w-90 bg-card p-4 rounded-2xl'}>
        <div className='flex h-full flex-col gap-2'>
          <div className='relative'>
            <Input
              type='search'
              startContent={<Search />}
              placeholder='Buscar chats...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollShadow>
            <div className='w-full flex flex-col  gap-2'>
              {purchases.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={cn(
                    'w-full cursor-pointer rounded-lg p-3 text-left transition-colors hover:bg-sidebar-accent',
                    selectedChat === chat.id && 'bg-sidebar-accent',
                  )}
                >
                  <div className='flex items-start gap-3'>
                    <div className='mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary'>
                      <MessageSquare className='h-4 w-4 text-sidebar-primary-foreground' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between gap-2'>
                        <h3 className='truncate text-sm font-medium text-sidebar-foreground'>
                          {chat?.products?.[0].product.name}
                        </h3>
                        {/* {chat.unread && (
                          <span className='h-2 w-2 shrink-0 rounded-full bg-blue-500' />
                        )} */}
                      </div>
                      <p className='mt-1 text-xs text-muted-foreground'>
                        {getFormattedDateTime({
                          value: chat.createdAt,
                          format: {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          },
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </aside>
    </>
  )
}
