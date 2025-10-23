import React from 'react'
import { RootState } from '@/store'
import { useLocation } from 'react-router-dom'
import { setDateFilter } from '@/features/appTableSlice'
import { Calendar, Trash } from 'lucide-react'
import { parseDate, CalendarDate } from '@internationalized/date'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Badge,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
  type DateValue,
  type RangeValue,
  DateRangePicker,
} from '@heroui/react'

export const FilterByDatePicker = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.appTable)
  const location = useLocation()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  React.useEffect(() => {
    clearFilter()
  }, [location])

  const handleChangeDate = (e: RangeValue<DateValue> | null) => {
    if (!e) return
    dispatch(
      setDateFilter({
        start: e.start?.toString() || '',
        end: e.end?.toString() || '',
      }),
    )
  }

  const clearFilter = () => {
    dispatch(
      setDateFilter({
        end: '',
        start: '',
      }),
    )
  }

  const isFilterActive = table.dateFilter.start !== '' && table.dateFilter.end !== ''

  const getDateValue = (): RangeValue<CalendarDate> | null => {
    if (table.dateFilter.start && table.dateFilter.end) {
      return {
        start: parseDate(table.dateFilter.start),
        end: parseDate(table.dateFilter.end),
      }
    }
    return null
  }

  return (
    <>
      <Badge
        content=''
        color='primary'
        shape='circle'
        placement='bottom-right'
        isInvisible={!isFilterActive}
      >
        <Button onPress={onOpen} isIconOnly color='primary' variant='flat'>
          <Calendar size={18} className='text-xl pointer-events-none flex-shrink-0' />
        </Button>
      </Badge>
      <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1 default-text-color'>
            Filtrar por fecha
          </ModalHeader>
          <ModalBody>
            <div className='flex gap-2'>
              <div className='w-full'>
                <DateRangePicker
                  value={getDateValue()}
                  onChange={handleChangeDate}
                  aria-label='Fecha'
                />
              </div>
              <Button onPress={clearFilter} isIconOnly variant='flat'>
                <Trash
                  size={18}
                  className='text-xl text-default-500 pointer-events-none flex-shrink-0'
                />
              </Button>
            </div>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
