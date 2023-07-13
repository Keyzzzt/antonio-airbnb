'use client'
import React from 'react'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { ListingHead } from '@/app/components/Listings/ListingHead'
import { ListingInfo } from '@/app/components/Listings/ListingInfo'
import { Container } from '@/app/components/MultiPurpose/Container'
import { categories } from '@/app/components/Navbar/Categories'
import { useLoginModal } from '@/app/helpers/hooks/useLoginModal'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ListingReservation } from '@/app/components/Listings/ListingReservation'
import { Range } from 'react-date-range'

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

type ListingClientProps = {
  reservations?: SafeReservation[]
  listing: SafeListing & { user: SafeUser }
  currentUser: SafeUser | null
}

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [totalPrice, setTotalPrice] = React.useState(listing.price)
  const [dateRange, setDateRange] = React.useState(initialDateRange)

  const loginModal = useLoginModal()
  const router = useRouter()

  const handleCreateReservation = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)
    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Reservation success')
        setDateRange(initialDateRange)
        router.push('/trips')
      })
      .catch(() => {
        toast('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    totalPrice,
    router,
    loginModal,
  ])

  React.useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate,
      )

      if (dayCount && listing.price) {
        setTotalPrice(Math.abs(dayCount) * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange.startDate, dateRange.endDate, listing.price])

  const disabledDates = React.useMemo(() => {
    let dates: Date[] = []
    reservations.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      })
      dates = [...dates, ...range]
    })
    return dates
  }, [reservations])

  const category = React.useMemo(
    () => categories.find((c) => c.label === listing.category),
    [listing.category],
  )
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onDateChange={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
