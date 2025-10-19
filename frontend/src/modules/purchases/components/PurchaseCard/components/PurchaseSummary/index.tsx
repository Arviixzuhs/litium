interface PurchaseSummaryProps {
  total: number
}

export const PurchaseSummary = ({ total }: PurchaseSummaryProps) => {
  return (
    <div className='mt-2 border-t border-divider pt-3 text-right'>
      <p className='text-base font-semibold text-default-700'>Total: ${total.toLocaleString()}</p>
    </div>
  )
}
