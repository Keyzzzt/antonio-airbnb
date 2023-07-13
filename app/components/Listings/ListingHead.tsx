'use client'
import { useCountries } from '@/app/helpers/hooks/useCountries'
import { SafeUser } from '@/app/types'
import React from 'react'
import { Heading } from '../MultiPurpose/Heading'
import Image from 'next/image'
import { HeartButton } from '../HeartButton'

type ListingHeadProps = {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser: SafeUser | null
}
export const ListingHead: React.FC<ListingHeadProps> = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)
  return (
    <>
      <Heading
        title='Title'
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          alt='image'
          src={imageSrc}
          className='object-cover w-full'
          fill
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
