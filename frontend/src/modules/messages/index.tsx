import React from 'react'
import { cn } from '@heroui/theme'
import { io } from 'socket.io-client'
import { Shopping } from './components/Shopping'
import { RootState } from '@/store'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MessageModel } from '@/types/messageModal'
import { EllipsisVertical } from 'lucide-react'
import { reqGetMessagesByCartId } from './services'
import {
  Avatar,
  Button,
  Textarea,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@heroui/react'

const socket = io(import.meta.env.VITE_SERVER_API, { transports: ['websocket'] })

export const Messages = () => {
  const params = useParams<{ cartId: string }>()
  const user = useSelector((state: RootState) => state.user)
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState<MessageModel[]>([])
  const [editingId, setEditingId] = React.useState<number | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!params.cartId) return
    const fetchMessages = async () => {
      try {
        const { data } = await reqGetMessagesByCartId(Number(params.cartId))
        setMessages(data)
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
      }
    }

    fetchMessages()
  }, [params.cartId])

  React.useEffect(() => {
    socket.emit('joinCart', params.cartId)

    socket.on('newMessage', (message) => setMessages((prev) => [...prev, message]))
    socket.on('messageEdited', (updated) =>
      setMessages((prev) => prev.map((msg) => (msg.id === updated.id ? updated : msg))),
    )
    socket.on('messageDeleted', ({ id }) =>
      setMessages((prev) => prev.filter((msg) => msg.id !== id)),
    )

    return () => {
      socket.emit('leaveCart', params.cartId)
      socket.off('newMessage')
      socket.off('messageEdited')
      socket.off('messageDeleted')
    }
  }, [params.cartId])

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    if (editingId) {
      socket.emit('editMessage', { messageId: editingId, newContent: input.trim() })
      setEditingId(null)
      setInput('')
      return
    }

    const messageData = {
      message: input.trim(),
      shoppingCartId: params.cartId,
      userId: user?.id,
      senderId: user?.id,
    }

    socket.emit('sendMessage', messageData)
    setInput('')
  }

  const handleDelete = (id: number) => {
    socket.emit('deleteMessage', id)
  }

  const handleEdit = (msg: MessageModel) => {
    setEditingId(msg.id)
    setInput(msg.message)
  }

  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh_-_64px)] gap-4 p-4 bg-card'>
      <div className='flex-1 flex flex-col h-full p-2'>
        <div ref={scrollRef} className='flex-1 overflow-y-auto space-y-4 px-2 hoverScrollbar'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2 relative group flex-wrap',
                msg.senderId === user?.id ? 'justify-end' : 'justify-start',
              )}
            >
              {msg.senderId !== user?.id && <Avatar src='/other.png' size='sm' />}
              <div
                className={cn(
                  'rounded-xl px-4 py-2 text-sm max-w-full md:max-w-[70%] relative break-words',
                  msg.senderId === user?.id ? 'bg-primary text-white' : 'bg-default-200 text-black',
                )}
              >
                <p>{msg.message}</p>
                <div
                  className={`flex justify-between gap-3 text-xs mt-1 ${
                    msg.senderId === user?.id ? 'text-white' : 'text-black'
                  }`}
                >
                  {msg.isEdited && (
                    <span
                      className={cn(
                        'text-xs italic ml-1 opacity-80',
                        msg.senderId === user?.id ? 'text-white' : 'text-gray-600',
                      )}
                    >
                      (editado)
                    </span>
                  )}
                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              {msg.senderId === user?.id && (
                <div className='absolute top-0 right-0'>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        className='opacity-0 group-hover:opacity-100 transition-opacity text-white'
                      >
                        <EllipsisVertical size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Acciones de mensaje'>
                      <DropdownItem key='edit' onPress={() => handleEdit(msg)}>
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        key='delete'
                        color='danger'
                        className='text-danger'
                        onPress={() => handleDelete(msg.id)}
                      >
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={editingId ? 'Edita tu mensaje...' : 'Escribe un mensaje...'}
            className='flex-1 min-w-[150px]'
            size='sm'
          />
          <Button onPress={handleSend} color='primary' size='sm' isDisabled={input.trim() === ''}>
            {editingId ? 'Guardar' : 'Enviar'}
          </Button>
          {editingId && (
            <Button
              onPress={() => {
                setEditingId(null)
                setInput('')
              }}
              color='default'
              size='sm'
            >
              Cancelar
            </Button>
          )}
        </div>
      </div>
      <div className='w-full md:w-[500px] mt-4 md:mt-0'>
        <Shopping />
      </div>
    </div>
  )
}
