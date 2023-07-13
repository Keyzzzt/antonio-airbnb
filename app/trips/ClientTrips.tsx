'use client'
import React, { useCallback } from 'react'
import { SafeReservation, SafeUser } from '../types'
import { Container } from '../components/MultiPurpose/Container'
import { Heading } from '../components/MultiPurpose/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/Listings/ListingCard'

type ClientTripsProps = {
  reservations?: SafeReservation[]
  currentUser: SafeUser | null
}
export const ClientTrips: React.FC<ClientTripsProps> = ({
  currentUser,
  reservations,
}) => {
  const [deletingId, setDeletingId] = React.useState('')
  const router = useRouter()

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
          toast.error('Reservation cancelation error!')
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle='Where you have been and where you are going.'
      />
      <div className='gap-8 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations?.map((r) => (
          <ListingCard
            key={r.id}
            data={r.listing}
            reservation={r}
            actionId={r.id}
            onAction={handleCancelReservation}
            disabled={deletingId === r.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
