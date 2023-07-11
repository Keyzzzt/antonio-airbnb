import React from 'react'
import { ClientOnly } from '../components/ClientOnly'
import { getReservations } from '../actions/getReservations'
import getCurrentUser from '../actions/getCurrentUser'
import { EmptyState } from '../components/EmptyState'
import { ClientTrips } from './ClientTrips'

export default async function TripsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    )
  }
  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found.'
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ClientTrips reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}
