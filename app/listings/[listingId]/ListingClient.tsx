'use client'
import { ListingHead } from '@/app/components/Listings/ListingHead'
import { ListingInfo } from '@/app/components/Listings/ListingInfo'
import { Container } from '@/app/components/MultiPurpose/Container'
import { categories } from '@/app/components/Navbar/Categories'
import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import React from 'react'

type ListingClientProps = {
  reservations?: Reservation[]
  listing: SafeListing & { user: SafeUser }
  currentUser: SafeUser | null
}

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations,
  currentUser,
}) => {
  const category = React.useMemo(
    () => categories.find(c => c.label === listing.category),
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
          </div>
        </div>
      </div>
    </Container>
  )
}