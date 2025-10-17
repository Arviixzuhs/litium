import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { MessagesSquareIcon } from 'lucide-react'
import {
  Chip,
  Card,
  Image,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@heroui/react'

interface PurchaseCardProps {
  purchase: ShoppingCartModel
}

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const total = () => {
    return (
      purchase.products?.reduce((acc, item) => {
        const price = item.product?.price || 0
        const quantity = item.quantity || 0
        return acc + price * quantity
      }, 0) || 0
    )
  }

  return (
    <>
      <Card shadow='sm'>
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
                <Button radius='sm' color='primary' onPress={() => setOpenModal(true)}>
                  Ver compra
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={openModal}
        placement='center'
        onOpenChange={setOpenModal}
        scrollBehavior='inside'
      >
        <ModalContent>
          <ModalHeader>Productos de la compra</ModalHeader>
          <ModalBody className='flex flex-col gap-4'>
            {purchase.products?.map((item) => (
              <div key={item.id} className='flex items-center gap-4'>
                <div className='relative w-16 h-16 overflow-hidden rounded-md border border-divider bg-default-100'>
                  <Image src={item.product?.image || '/placeholder.svg'} className='object-cover' />
                </div>
                <div className='flex flex-1 flex-col'>
                  <p className='font-medium'>{item.product?.name}</p>
                  <p className='text-sm text-default-500'>Cantidad: {item.quantity}</p>
                  {item.product?.price && (
                    <p className='text-sm text-default-500'>Precio: ${item.product.price}</p>
                  )}
                </div>
              </div>
            ))}

            <div className='mt-2 border-t border-divider pt-3 text-right'>
              <p className='text-base font-semibold text-default-700'>
                Total: ${total().toFixed(2)}
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant='light' onPress={() => setOpenModal(false)} color='danger' radius='sm'>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
