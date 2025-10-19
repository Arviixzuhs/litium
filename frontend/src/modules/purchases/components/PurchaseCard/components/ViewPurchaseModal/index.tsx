import { PurchaseSummary } from '../PurchaseSummary'
import { PurchaseProductItem } from '../PurchaseProductItem'
import { ShoppingCartProductModel } from '@/types/shoppingCartModel'
import { calcTotalByPurchaseProducts } from '@/modules/purchases/utils/calcTotalByPurchaseProducts'
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@heroui/react'

interface ViewPurchaseModalProps {
  purchaseProducts: ShoppingCartProductModel[]
}

export const ViewPurchaseModal = ({ purchaseProducts }: ViewPurchaseModalProps) => {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button radius='sm' color='primary' onPress={onOpen}>
        Ver compra
      </Button>
      <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange} scrollBehavior='inside'>
        <ModalContent>
          <ModalHeader>Productos de la compra</ModalHeader>
          <ModalBody className='flex flex-col gap-4'>
            {purchaseProducts?.map((item) => (
              <PurchaseProductItem
                name={item.product.name}
                image={item.product?.images?.[0].imageURL || ''}
                price={item.product.price}
                quantity={item.quantity}
              />
            ))}
            <PurchaseSummary total={calcTotalByPurchaseProducts(purchaseProducts)} />
          </ModalBody>
          <ModalFooter>
            <Button variant='light' onPress={onClose} color='danger' radius='sm'>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
