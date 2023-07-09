'use client'
import { useCountries } from '@/app/helpers/hooks/useCountries'
import { SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { HeartButton } from '../HeartButton'
import { Button } from '../MultiPurpose/Button/Button'

type ListingCardProps = {
  data: Listing
  reservation?: Reservation
  currentUser: SafeUser | null
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}
export const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()
  const handleCancel = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      if (!disabled) {
        onAction?.(actionId)
      }
    },
    [onAction, actionId, disabled],
  )

  const location = getByValue(data.locationValue)
  const price = React.useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [reservation, data.price])
  const reservationDate = React.useMemo(() => {
    if (!reservation) {
      return null
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square relative w-full overflow-hidden rounded-xl'>
          <Image
            fill
            alt='listing'
            src={data.imageSrc}
            className='object-cover h-full w-full group-hover:scale-110 transition'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='font-semibold text-lg '>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            small
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
