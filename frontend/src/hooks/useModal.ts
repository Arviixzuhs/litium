import { useDispatch, useSelector } from 'react-redux'
import { isModalOpen, handleShowModal } from '@/features/currentModalSlice'

export const modalTypes = Object.freeze({
  viewPurchases: 'VIEW_PURCHASES',
} as const)

type ModalType = (typeof modalTypes)[keyof typeof modalTypes]

export const useModal = (modalType: ModalType): [boolean, () => void] => {
  const dispatch = useDispatch()
  const isOpen = useSelector(isModalOpen(modalType))

  const toggleModal = () => dispatch(handleShowModal(modalType))

  return [isOpen, toggleModal]
}
