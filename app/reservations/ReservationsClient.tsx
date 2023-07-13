'use client'
import React from 'react'
import { SafeReservation, SafeUser } from '../types'
import { Container } from '../components/MultiPurpose/Container'
import { Heading } from '../components/MultiPurpose/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/Listings/ListingCard'

type ReservationsClientProps = {
  reservations?: SafeReservation[]
  currentUser: SafeUser | null
}
export const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = React.useState('')

  const handleCancelReservation = React.useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled!')
          router.refresh()
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your property' />
      <div className='gap-8 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations &&
          reservations.map((r) => (
            <ListingCard
              reservation={r}
              data={r.listing}
              key={r.id}
              currentUser={currentUser}
              actionId={r.id}
              onAction={handleCancelReservation}
              disabled={deletingId === r.id}
              actionLabel='Cancel guest reservation'
            />
          ))}
      </div>
    </Container>
  )
}
