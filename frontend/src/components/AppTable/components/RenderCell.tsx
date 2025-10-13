import { Key } from 'react'
import { DropdownAction } from './DropdownAction'

export interface RenderCellProps {
  column: Key
  value: string
  itemId: number
}

export const RenderCell = (props: RenderCellProps) => {
  switch (props.column) {
    case 'actions':
      return <DropdownAction itemId={props.itemId} />

    default:
      return <>{props.value}</>
  }
}
