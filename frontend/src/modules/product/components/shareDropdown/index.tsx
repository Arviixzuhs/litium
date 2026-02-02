import React from 'react'
import { BsEnvelopeFill, BsFacebook, BsTwitterX, BsWhatsapp, BsLink, BsShare } from 'react-icons/bs'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'

export const ShareDropdown = () => {
  const [copied, setCopied] = React.useState(false)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = (platform: string) => {
    const text = 'Mira esto producto: '
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedText = encodeURIComponent(text)

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
          '_blank',
        )
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodedText}&body=${encodedUrl}`
        break
      case 'copy':
        copyToClipboard()
        break
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size='lg'
          color='danger'
          radius='sm'
          className='w-full'
          startContent={<BsShare className='w-5 h-5' />}
        >
          Compartir
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Compartir en redes sociales'>
        <DropdownItem
          key='whatsapp'
          startContent={<BsWhatsapp className='w-5 h-5 text-green-600' />}
          onPress={() => handleShare('whatsapp')}
        >
          WhatsApp
        </DropdownItem>
        <DropdownItem
          key='facebook'
          startContent={<BsFacebook className='w-5 h-5 text-blue-600' />}
          onPress={() => handleShare('facebook')}
        >
          Facebook
        </DropdownItem>
        <DropdownItem
          key='twitter'
          startContent={<BsTwitterX className='w-5 h-5 text-gray-900' />}
          onPress={() => handleShare('twitter')}
        >
          Twitter (X)
        </DropdownItem>
        <DropdownItem
          key='email'
          startContent={<BsEnvelopeFill className='w-5 h-5 text-red-400' />}
          onPress={() => handleShare('email')}
        >
          Email
        </DropdownItem>
        <DropdownItem
          key='copy'
          startContent={<BsLink className='w-5 h-5 text-gray-600' />}
          onPress={() => handleShare('copy')}
        >
          {copied ? 'Copiado!' : 'Copiar link'}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
