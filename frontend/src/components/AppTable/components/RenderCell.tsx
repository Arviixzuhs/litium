import { Key } from 'react'
import { DropdownAction } from './DropdownAction'
import { getFormattedDateTime } from '@/utils/getFormattedDateTime'

export interface RenderCellProps {
  column: Key
  value: string
  itemId: number
}

export const RenderCell = (props: RenderCellProps) => {
  switch (props.column) {
    case 'createdAt':
      return (
        <>
          {getFormattedDateTime({
            value: props.value,
            format: {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            },
          })}
        </>
      )

    case 'actions':
      return <DropdownAction itemId={props.itemId} />

    default:
      return <>{props.value}</>
  }
}
