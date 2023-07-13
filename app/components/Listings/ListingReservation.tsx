'use client'
import React from 'react'
import { Range } from 'react-date-range'
import { Calendar } from '../MultiPurpose/Inputs/Calendar'
import { Button } from '../MultiPurpose/Button'

type ListingReservationProps = {
  price: number
  totalPrice: number
  dateRange: Range
  disabled?: boolean
  disabledDates: Date[]
  onDateChange: (value: Range) => void
  onSubmit: () => void
}

export const ListingReservation: React.FC<ListingReservationProps> = ({
  dateRange,
  disabled,
  disabledDates,
  onDateChange,
  onSubmit,
  price,
  totalPrice,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='text-neutral-600 font-light'>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onDateChange(value.selection)}
      />

      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <hr />
      <div className='p-4 '>
        <Button label='Reserve' onClick={onSubmit} disabled={disabled} />
      </div>
    </div>
  )
}
