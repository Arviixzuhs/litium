import React from 'react'
import { cn } from '@heroui/theme'
import { Shopping } from './components/Shopping'
import { Avatar, Button, Textarea } from '@heroui/react'

export const Messages = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: 'Hola, ¿cómo estás?', sender: 'other', timestamp: '17:00' },
    { id: 2, text: 'Todo bien, ¿y tú?', sender: 'me', timestamp: '17:01' },
  ])
  const [input, setInput] = React.useState('')
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMessage = {
      id: messages.length + 1,
      text: input.trim(),
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages([...messages, newMessage])
    setInput('')
  }

  return (
    <div className='flex h-screen gap-4 p-4'>
      <div className='w-full h-full flex flex-col p-4'>
        <div ref={scrollRef} className='flex-1 overflow-y-auto space-y-4 px-2'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                msg.sender === 'me' ? 'justify-end' : 'justify-start',
              )}
            >
              {msg.sender === 'other' && <Avatar src='/other.png' size='sm' />}
              <div
                className={cn(
                  'rounded-xl px-4 py-2 text-sm max-w-[70%]',
                  msg.sender === 'me' ? 'bg-primary text-white' : 'bg-default-200 text-black',
                )}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-xs  block mt-1 text-right
                ${msg.sender === 'me' ? ' text-white' : ' text-black'}
                `}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4 flex gap-2'>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Escribe un mensaje...'
            className='flex-1'
            size='sm'
          />
          <Button onPress={handleSend} color='primary' size='sm'>
            Enviar
          </Button>
        </div>
      </div>
      <Shopping />
    </div>
  )
}
