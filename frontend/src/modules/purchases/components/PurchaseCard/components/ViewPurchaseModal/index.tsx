import { PurchaseSummary } from '../PurchaseSummary'
import { PurchaseProductItem } from '../PurchaseProductItem'
import { modalTypes, useModal } from '@/hooks/useModal'
import { ShoppingCartProductModel } from '@/types/shoppingCartModel'
import { calcTotalByPurchaseProducts } from '@/modules/purchases/utils/calcTotalByPurchaseProducts'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader, ModalContent } from '@heroui/react'

interface ViewPurchaseModalProps {
  purchaseProducts: ShoppingCartProductModel[]
}

export const ViewPurchaseModal = ({ purchaseProducts }: ViewPurchaseModalProps) => {
  const [isOpen, toggleOpen] = useModal(modalTypes.viewPurchases)

  return (
    <Modal isOpen={isOpen} placement='center' onOpenChange={toggleOpen} scrollBehavior='inside'>
      <ModalContent>
        <ModalHeader>Productos de la compra</ModalHeader>
        <ModalBody className='flex flex-col gap-4'>
          {purchaseProducts?.map((item) => (
            <PurchaseProductItem
              id={item.product.id}
              name={item.product.name}
              image={item.product?.images?.[0]?.imageURL || ''}
              price={item.product.price}
              quantity={item.quantity}
            />
          ))}
          <PurchaseSummary total={calcTotalByPurchaseProducts(purchaseProducts)} />
        </ModalBody>
        <ModalFooter>
          <Button variant='light' onPress={toggleOpen} color='danger' radius='sm'>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
