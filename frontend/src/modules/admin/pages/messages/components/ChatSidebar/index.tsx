import React from 'react'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'
import { setPurchases } from '@/modules/purchases/slices/purchaseSlice'
import { reqGetShoppingCart } from '@/modules/purchases/services'
import { getFormattedDateTime } from '@/utils/getFormattedDateTime'
import { MessageSquare, Search } from 'lucide-react'
import { ChoppingCartStatusChip } from '../ChoppingCartStatusChip'
import { cn, Input, ScrollShadow } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'

export const ChatSidebar = () => {
  const navigate = useNavigate()
  const [selectedChat, setSelectedChat] = React.useState<number>(-1)
  const dispatch = useDispatch()
  const purchases = useSelector((state: RootState) => state.purchase.data)

  const [_isLoading, setIsLoading] = React.useState<boolean>(true)
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [debounceValue] = useDebounce(searchQuery, 300)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await reqGetShoppingCart({
          page: 0,
          size: 50,
          searchValue: debounceValue,
        })
        dispatch(setPurchases(response.data.content))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [debounceValue])

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
              startContent={<Search />}
              placeholder='Buscar chats...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollShadow className='hoverScrollbar'>
            <div className='w-full flex flex-col gap-2 pr-2'>
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
                          {chat.user?.name} {chat.user?.lastName} •{' '}
                          {chat?.products?.[0].product.name}
                        </h3>
                        {/* {chat.unread && (
                          <span className='h-2 w-2 shrink-0 rounded-full bg-blue-500' />
                        )} */}
                      </div>
                      <p className='mt-1 flex gap-4 justify-between text-xs text-muted-foreground'>
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
                        <ChoppingCartStatusChip status={chat.status} />
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
