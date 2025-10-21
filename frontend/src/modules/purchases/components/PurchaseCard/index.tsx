import { useModal } from '@/hooks/useModal'
import { modalTypes } from '@/hooks/useModal'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { MessagesSquareIcon } from 'lucide-react'
import { getFormattedDateTime } from '@/utils/getFormattedDateTime'
import { Chip, Card, Image, Button, CardBody } from '@heroui/react'

interface PurchaseCardProps {
  purchase: ShoppingCartModel
  setCurrentIdToView: React.Dispatch<React.SetStateAction<number>>
}

export function PurchaseCard({ purchase, setCurrentIdToView }: PurchaseCardProps) {
  const navigate = useNavigate()
  const [_isOpen, toggleOpen] = useModal(modalTypes.viewPurchases)

  const handleOpen = () => {
    setCurrentIdToView(purchase.id)
    toggleOpen()
  }

  return (
    <div>
      <div className='mb-4 text-sm font-medium'>
        {getFormattedDateTime({ value: purchase.createdAt })}
      </div>
      <Card shadow='none'>
        <CardBody>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-1 gap-4'>
              <div className='relative size-20 shrink-0 overflow-hidden rounded-md border border-divider bg-default-100'>
                <Image src={'/placeholder.svg'} className='object-cover' />
              </div>
              <div className='flex flex-1 flex-col gap-2'>
                <Chip color='success' variant='flat' size='sm' className='w-fit'>
                  {purchase.status}
                </Chip>
                <h3 className='line-clamp-2 text-sm text-default-600 leading-relaxed'>
                  {purchase?.products?.[0]?.product?.name}
                </h3>
              </div>
            </div>
            <div className='flex flex-col items-start gap-3 md:items-end md:pl-4'>
              <div className='text-sm'>
                <Button
                  size='sm'
                  radius='sm'
                  variant='light'
                  onPress={() => navigate(`/messages/${purchase.id}`)}
                  className='text-xs text-primary'
                  startContent={<MessagesSquareIcon className='size-3' />}
                >
                  Ver mensajes
                </Button>
              </div>
              <div className='flex w-full flex-col gap-2 md:w-auto'>
                <Button radius='sm' color='primary' onPress={handleOpen}>
                  Ver compra
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
